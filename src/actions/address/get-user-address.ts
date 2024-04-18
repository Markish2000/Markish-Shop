'use server';

import prisma from '@/libs/prisma';

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({ where: { userId } });

    if (address) {
      const { countryId, address2, ...rest } = address;

      return {
        ...rest,
        country: countryId,
        address2: address2 ?? '',
      };
    }

    return null;
  } catch (error) {
    console.log(error);

    return null;
  }
};
