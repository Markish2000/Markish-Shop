'use server';

import prisma from '@/libs/prisma';

import { Address } from '@/interfaces';

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo grabar la dirección.',
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      userId,
    };

    if (storedAddress) {
      const updatedAddress = await prisma.userAddress.update({
        where: { userId },
        data: addressToSave,
      });

      return updatedAddress;
    }

    const newAddress = await prisma.userAddress.create({
      data: addressToSave,
    });

    return newAddress;
  } catch (error) {
    console.log(error);

    throw new Error('No se pudo grabar la dirección.');
  }
};
