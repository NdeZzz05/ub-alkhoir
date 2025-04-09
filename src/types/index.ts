export type ActionResult = {
  error: string;
};

export type Tparams = {
  id: string;
};

export type TDetailProduct = {
  params: Tparams;
};

export type Tedit = {
  params: Tparams;
};

export type Tproduct = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: {
    name: string;
  };
};
