import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import OrderDetails from './OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearOrderDetails,
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin
} from '@/store/admin/order-slice'
import { Badge } from '../ui/badge'

const AdminOrder = () => {
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const { orderList, orderDetails } = useSelector(state => state.adminOrder)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailDialog(true)
  }, [orderDetails])

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId))
  }

  // console.log(orderList);
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <Card className="bg-white shadow-lg rounded-xl">
    <CardHeader className="border-b px-6 py-4">
      <CardTitle className="text-2xl font-semibold text-gray-800">
        All Orders
      </CardTitle>
    </CardHeader>

    <CardContent className="overflow-x-auto px-6 py-4">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b text-gray-600">
            <TableHead className="px-4 py-3 text-left">Order ID</TableHead>
            <TableHead className="px-4 py-3 text-left">Order Date</TableHead>
            <TableHead className="px-4 py-3 text-left">Order Status</TableHead>
            <TableHead className="px-4 py-3 text-left">Order Price</TableHead>
            <TableHead className="px-4 py-3">
              <span className="sr-only">Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orderList && orderList.length > 0 ? (
            orderList.map(orderItem => (
              <TableRow
                key={orderItem._id}
                className="hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                <TableCell className="px-4 py-3 font-medium text-gray-800 truncate max-w-[120px]">
                  {orderItem._id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700">
                  {orderItem.orderDate.split('T')[0]}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge
                    className={`py-1 px-3 text-white capitalize rounded-full ${
                      orderItem.orderStatus === 'confirmed'
                        ? 'bg-green-500'
                        : orderItem.orderStatus === 'rejected'
                        ? 'bg-red-600'
                        : 'bg-gray-700'
                    }`}
                  >
                    {orderItem.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700 font-medium">
                  ${orderItem.totalAmount}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Button
                    className="text-sm bg-gray-100 hover:bg-gray-200 transition rounded-lg"
                    onClick={() => handleFetchOrderDetails(orderItem._id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-gray-500 font-medium"
              >
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>

  {/* Order Detail Dialog */}
  <Dialog
    open={openDetailDialog}
    onOpenChange={(open) => {
      if (!open){
      dispatch(clearOrderDetails());
        
      } 
      setOpenDetailDialog(open);
    }}
  >
    <DialogContent className="bg-white p-6 rounded-xl shadow-xl max-w-3xl mx-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-gray-800">
          Order Details
        </DialogTitle>
      </DialogHeader>
      {orderDetails ? (
        <OrderDetails order={orderDetails} />
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </DialogContent>
  </Dialog>
</div>

  )
}

export default AdminOrder
