import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'

const AdminOrder = () => {
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
                <Button>View Details</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrder
