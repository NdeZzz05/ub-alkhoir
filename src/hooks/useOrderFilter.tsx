// hooks/useOrderFilter.ts
import { StatusOrder } from "@prisma/client";
import { create } from "zustand";

export type TOrderFilter = {
  status?: StatusOrder | null;
};

interface OrderFilterState {
  filter: TOrderFilter;
  setFilter: (filter: TOrderFilter) => void;
}

export const useOrderFilter = create<OrderFilterState>()((set) => ({
  filter: {
    status: null,
  },
  setFilter: (filter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        ...filter,
      },
    })),
}));
