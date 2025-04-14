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
};

export type TCart = TProduct & { quantity: number };
