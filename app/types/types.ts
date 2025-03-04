export interface Store {
  id: number;
  category: string;
  description?: string;
  title: string;
  image: string;
  price: number;
  rating?: {
    count?: number;
    rate?: number;
  } | any;
  amount?: number;
  total?: number;
}

export interface UserInformation {
  name: string;
  mail: string;
  pass: string;
}

export default Store;
