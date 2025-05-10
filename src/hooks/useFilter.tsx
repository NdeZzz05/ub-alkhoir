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

// export interface FilterState {
//   filter: TFilter;
//   setFilter: (filter: TFilter) => void;
// }

// export const useFilter = create<FilterState>()((set) => ({
//   filter: {
//     search: "",
//     minPrice: 0,
//     maxPrice: 0,
//     sortBy: null,
//     category: null,
//     promo: null,
//   },
//   setFilter: (filter) =>
//     set((state) => ({
//       filter: {
//         ...state.filter,
//         ...filter,
//       },
//     })),
// }));

export interface FilterState {
  filter: TFilter;
  draft: TFilter;
  setFilter: (filter: TFilter) => void;
  setDraft: (draft: TFilter) => void;
  applyDraft: () => void;
  resetFilter: () => void;
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
  draft: {
    search: "",
    minPrice: 0,
    maxPrice: 0,
    sortBy: null,
    category: null,
    promo: null,
  },
  setFilter: (filter) =>
    set(() => ({
      filter,
      draft: filter,
    })),
  setDraft: (draft) =>
    set((state) => ({
      draft: {
        ...state.draft,
        ...draft,
      },
    })),
  applyDraft: () =>
    set((state) => ({
      filter: { ...state.draft },
    })),
  resetFilter: () =>
    set(() => ({
      filter: {
        search: "",
        minPrice: 0,
        maxPrice: 0,
        sortBy: null,
        category: null,
        promo: null,
      },
      draft: {
        search: "",
        minPrice: 0,
        maxPrice: 0,
        sortBy: null,
        category: null,
        promo: null,
      },
    })),
}));
