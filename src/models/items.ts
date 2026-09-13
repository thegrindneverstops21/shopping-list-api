export interface Item {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// The fields required to create a new item.
export interface CreateItemInput {
    name: string;
    quantity: number;
    purchased: boolean;
}

// These are the optional fields that may be updated later.
export interface UpdateItemInput {
    name?: string;
    quantity?: number;
    purchased?: boolean;
}