'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/libs/prisma';

import { PayPalOrderStatusResponse } from '@/interfaces';

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();

  if (authToken) {
    const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

    if (resp) {
      const { status, purchase_units } = resp;
      const { invoice_id: orderId } = purchase_units[0];

      const completed = 'COMPLETED';
      if (status !== completed) {
        const message = 'Aún no se ha pagado en PayPal';
        return { ok: false, message };
      }

      try {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            isPaid: true,
            paidAt: new Date(),
          },
        });

        const path = `/orders/${orderId}`;
        revalidatePath(path);

        return { ok: true };
      } catch (error) {
        console.log(error);

        const message = '500 - El pago no se pudo realizar';
        return { ok: false, message };
      }
    }

    const message = 'Error al verificar el pago';
    return { ok: false, message };
  }

  const message = 'No se pudo obtener token de verificación';
  return { ok: false, message };
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Authorization', `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: 'no-store',
    }).then((r) => r.json());

    return result.access_token;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${bearerToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  try {
    const resp = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: 'no-store',
    }).then((r) => r.json());

    return resp;
  } catch (error) {
    console.log(error);

    return null;
  }
};
