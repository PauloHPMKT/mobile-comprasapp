export namespace ListProps {
  export type ToCreate = {
    title: string;
    description: string;
    products: Product[];
  }

  export type Result = {
    success?: boolean;
    error?: Error;
  }

  export type Product = {
    name: string;
    quantity: string;
    unitPrice?: string | null;
    totalPrice?: string | null;
  }
}