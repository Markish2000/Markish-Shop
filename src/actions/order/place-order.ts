'use server';

import prisma from '@/libs/prisma';

import { auth } from '@/auth.config';

import type { Address, Size } from '@/interfaces';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();

  const userId = session?.user.id;

  if (userId) {
    const products = await prisma.product.findMany({
      where: { id: { in: productIds.map((product) => product.productId) } },
    });

    const itemsInOrder = productIds.reduce(
      (count, product) => count + product.quantity,
      0
    );

    const { subTotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(
          (product) => product.id === item.productId
        );

        if (product) {
          const subTotal = product.price * productQuantity;

          totals.subTotal += subTotal;
          totals.tax += subTotal * 0.15;
          totals.total += subTotal * 1.15;

          return totals;
        }

        throw new Error(`${item.productId} no existe - 500`);
      },
      { subTotal: 0, tax: 0, total: 0 }
    );

    try {
      const prismaTx = await prisma.$transaction(async (tx) => {
        const updatedProductsPromises = products.map((product) => {
          const productQuantity = productIds
            .filter((p) => p.productId === product.id)
            .reduce((acc, item) => item.quantity + acc, 0);

          if (productQuantity === 0) {
            throw new Error(`${product.id} no tiene cantidad definida.`);
          }

          return tx.product.update({
            where: { id: product.id },
            data: { inStock: { decrement: productQuantity } },
          });
        });

        const updatedProducts = await Promise.all(updatedProductsPromises);

        updatedProducts.forEach((product) => {
          if (product.inStock < 0) {
            throw new Error(`${product.title} no tiene inventario suficiente.`);
          }
        });

        const order = await tx.order.create({
          data: {
            userId,
            itemsInOrder,
            subTotal,
            tax,
            total,
            OrderItem: {
              createMany: {
                data: productIds.map((p) => ({
                  quantity: p.quantity,
                  size: p.size,
                  productId: p.productId,
                  price:
                    products.find((product) => product.id === p.productId)
                      ?.price ?? 0,
                })),
              },
            },
          },
        });

        const { country, ...restAddress } = address;

        const orderAddress = await tx.orderAddress.create({
          data: { ...restAddress, countryId: country, orderId: order.id },
        });

        return {
          order,
          orderAddress,
          updatedProducts,
        };
      });

      return {
        ok: true,
        order: prismaTx.order,
        prismaTx,
      };
    } catch (error: any) {
      console.log(error);

      return {
        ok: false,
        message: error?.message,
      };
    }
  }

  return { ok: false, message: 'No hay una sesión de usuario.' };
};
