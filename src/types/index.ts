export type ActionResult = {
  error: string;
};

export type TParams = {
  id: string;
};

export type TDetailProduct = {
  params: Promise<{ id: string }>;
};

export type TEdit = {
  params: Promise<{ id: string }>;
};

export type TProduct = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: {
    name: string;
  };
  stock: number;
  original_price?: number;
  discount_percentage?: number;
};

export type TCart = TProduct & { quantity: number };

export interface PromoWithProducts {
  id: string;
  discount_percentage: number;
  image: string;
  created_at: Date;
  updated_at: Date;
  products: {
    id: string;
    name: string;
    image: string;
  }[];
}
