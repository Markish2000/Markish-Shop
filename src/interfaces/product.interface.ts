export interface Product {
  description: string;
  gender: Category;
  id: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
}

export interface CartProduct {
  id: string;
  image: string;
  price: number;
  quantity: number;
  size: Size;
  slug: string;
  title: string;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

type Category = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';
