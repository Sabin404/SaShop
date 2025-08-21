import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { clearCart } from '@/store/shop/cart-slice';
import { capturePayment } from '@/store/shop/order-slice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const StripeSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id');

  useEffect(() => {
    if (sessionId) {
      let currentOrderId = sessionStorage.getItem('currentOrderId');

      if (currentOrderId) {
        // Clean extra quotes if stored with JSON.stringify
        currentOrderId = currentOrderId.replace(/"/g, '');

        dispatch(
          capturePayment({
            orderId: currentOrderId,
            paymentId: sessionId,
            payerId:null
          })
        ).then((data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem('currentOrderId');
            dispatch(clearCart())
            navigate('/shop/order-success'); // redirect to success page
          } else {
            console.error('Payment capture failed:', data);
          }
        });
      } else {
        console.error('No orderId found in sessionStorage');
      }
    }
  }, [dispatch, sessionId, navigate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please Wait</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default StripeSuccess;
