export interface Review {
  _id: string;
  product: string; // Product _id
  user: string; // User _id
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}
