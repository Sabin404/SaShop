import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-md w-full text-center p-6">
        <CardHeader>
          <CardTitle>🎉 Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="mb-6">Thank you for your order. Your payment has been processed successfully.</p>
          <Button onClick={() => navigate('/shop/home')} className="w-full">
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
