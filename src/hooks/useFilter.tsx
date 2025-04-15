import { create } from "zustand";

export type SortBy = "priceLowest" | "priceHighest";

export type TFilter = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortBy | null;
  category?: string[] | null;
  promo?: string | null;
};

export interface FilterState {
  filter: TFilter;
  setFilter: (filter: TFilter) => void;
}

export const useFilter = create<FilterState>()((set) => ({
  filter: {
    search: "",
    minPrice: 0,
    maxPrice: 0,
    sortBy: null,
    category: null,
    promo: null,
  },
  setFilter: (filter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        ...filter,
      },
    })),
}));
