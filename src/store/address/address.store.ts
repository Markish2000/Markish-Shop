import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  address: {
    address: string;
    address2?: string;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    phone: string;
    postalCode: string;
  };

  setAddress: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        address: '',
        address2: '',
        city: '',
        country: '',
        firstName: '',
        lastName: '',
        phone: '',
        postalCode: '',
      },

      setAddress: (address) => {
        set({ address });
      },
    }),
    { name: 'address-storage' }
  )
);
