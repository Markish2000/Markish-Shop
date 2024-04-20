'use client';

import {
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const routedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className='animate-pulse mb-16'>
        <div className='h-11 bg-gray-300 rounded' />
        <div className='h-11 bg-gray-300 rounded mt-2' />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: any
  ): Promise<string> => {
    const value = `${routedAmount}`;

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: { value },
        },
      ],
    });

    const { ok } = await setTransactionId(orderId, transactionId);

    if (ok) return transactionId;

    const messageError = 'No se pudo actualizar la orden.';
    throw new Error(messageError);
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const details = await actions.order?.capture();

    if (details) {
      await paypalCheckPayment(details.id as string);
    }
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
