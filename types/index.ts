export type UserRole = "OWNER";

export type Product = {
  id: string;
  name: string;
  sku: string;
  description?: string;
  quantityOnHand: number;
  costPrice?: number;
  sellingPrice?: number;
  lowStockThreshold?: number;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StockMovement = {
  id: string;
  productId: string;
  delta: number;
  note?: string;
  createdById: string;
  createdAt: string;
};

export type StockMovementResponse = {
  movement: StockMovement;
  updatedQuantityOnHand: number;
};

export type DashboardResponse = {
  totalProducts: number;
  totalQuantity: number;
  lowStockItems: {
    id: string;
    name: string;
    sku: string;
    quantityOnHand: number;
    effectiveThreshold: number;
  }[];
};

export type Settings = {
  defaultLowStockThreshold: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// API payloads
export type SignupPayload = {
  email: string;
  password: string;
  organizationName: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type CreateProductPayload = {
  name: string;
  sku: string;
  description?: string;
  initialQuantity?: number;
  costPrice?: number;
  sellingPrice?: number;
  lowStockThreshold?: number;
};

export type UpdateProductPayload = Omit<
  CreateProductPayload,
  "initialQuantity"
>;

export type AdjustStockPayload = {
  delta: number;
  note?: string;
  idempotencyKey: string;
};
