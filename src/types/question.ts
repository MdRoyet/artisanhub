export interface Question {
  _id: string;
  product: string;
  user: string;
  userName: string;
  question: string;
  answer?: string;
  answeredBy?: string;
  createdAt: string;
  updatedAt: string;
}
