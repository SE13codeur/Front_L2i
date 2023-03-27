export default interface IBook {
  id?: number;
  title?: string;
  subtitle?: string;
  authors?: string;
  publisher?: string;
  isbn13?: string;
  pages?: string;
  year?: number;
  description?: string;
  price?: Float32Array;
  url?: string;
  image?: string;
  category?: string;
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
