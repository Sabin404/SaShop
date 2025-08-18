import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShopOrderDetails from './ShopOrderDetails'

const Orders = () => {
    const[openDetailDialog,setOpenDetailDialog]=useState(false)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead><span className='sr-only'>Details</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>123</TableCell>
              <TableCell>2082-04-02</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>$222</TableCell>
              <TableCell>
              <Dialog open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
                <Button onClick={()=>setOpenDetailDialog(true)}>View Details</Button> 
                <ShopOrderDetails/>
              </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Orders
