import React from 'react'
import accImg from '../../assets/ban2.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Orders from '@/components/shopping-view/Orders'
import Admin from '@/components/admin-view/Admin'
import Address from '@/components/shopping-view/Address'

const Account = () => {
  return (
    <div className='flex flex-col'>
    <div className='relative h-[300px] w-full overflow-hidden'>
      <img className='h-full w-full object-cover object-center'
        src={accImg}
      />
    </div>
    <div className='container mx-auto grid grid-col-1 gap-8 py-8'>
      <div className="flex flex-col rounded-lg border bg-background p-6 shadow">
        <Tabs defaultValue="Orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Orders/>
          </TabsContent>
          <TabsContent value="address">
            <Address/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
      
    </div>
  )
}

export default Account
