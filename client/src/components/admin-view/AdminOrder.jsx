import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import OrderDetails from './OrderDetails'

const AdminOrder = () => {
  const[openDetailDialog,setOpenDetailDialog]=useState(false)
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="px-4 py-2 text-left">Order ID</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Date</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Status</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Price</TableHead>
              <TableHead className="px-4 py-2"><span className="sr-only">Details</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b">
              <TableCell className="px-4 py-2">123</TableCell>
              <TableCell className="px-4 py-2">2082-04-02</TableCell>
              <TableCell className="px-4 py-2">Pending</TableCell>
              <TableCell className="px-4 py-2">$222</TableCell>
              <TableCell className="px-4 py-2">
              <Dialog open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
                <Button onClick={()=>setOpenDetailDialog(true)}>View Details</Button>
                <OrderDetails/>
              </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrder
