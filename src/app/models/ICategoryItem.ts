export interface ICategoryItem {
  id: number;
  name: string;
  parentId?: number;
  // children?: ICategoryItem[];
}

export interface IBook {
  id?: string;
  title?: string;
  subtitle?: string;
  authors?: string;
  publisher?: string;
  isbn13?: string;
  pages?: string;
  year?: string;
  description?: string;
  price?: string;
  url?: string;
  image?: string;
  categories?: ICategoryItem;
  published?: string;
  created_at?: Date;
  updated_at?: Date;
  regular_price?: number;
  sold_price?: number;
  isSolded?: boolean;
  isNewCollection?: boolean;
  rating: {
    rate: number;
    count: number;
  };
}
