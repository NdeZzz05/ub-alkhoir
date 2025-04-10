import { Tcart } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
  products: Tcart[];
  addProduct: (cart: Tcart) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeProduct: (id: string) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (cart) =>
        set({
          products: [...get().products.filter((item) => item.id !== cart.id), cart],
        }),
      increaseQuantity: (id) => {
        const newProducts = get().products.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });

        set({
          products: newProducts,
        });
      },
      decreaseQuantity: (id) => {
        const newProducts = get().products.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        });

        set({
          products: newProducts.filter((item) => item.quantity !== 0),
        });
      },
      removeProduct: (id) =>
        set({
          products: [...get().products.filter((item) => item.id !== id)],
        }),
    }),
    {
      name: "cart-product-ub-alkhoir",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
