export interface Item {
  localId: number;
  name: string;
  description: string | null;
  quantity: string;
  price?: string;
  totalPrice?: string | null;
  isEditing: boolean;
  isEditingPrice?: boolean;
}