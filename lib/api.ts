import type {
  SignupPayload,
  LoginPayload,
  CreateProductPayload,
  UpdateProductPayload,
  AdjustStockPayload,
  Product,
  DashboardResponse,
  PaginatedResponse,
  StockMovement,
  StockMovementResponse,
  Settings,
} from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  extraHeaders?: Record<string, string>,
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ?? `Request failed (${res.status})`,
    );
  }

  return res.json() as Promise<T>;
}

export const api = {
  // auth
  signup: (data: SignupPayload) =>
    request<{ accessToken: string }>("POST", "/auth/signup", data),
  login: (data: LoginPayload) =>
    request<{ accessToken: string }>("POST", "/auth/login", data),

  // dashboard
  getDashboard: () => request<DashboardResponse>("GET", "/dashboard"),

  // products
  getProducts: (page = 1, limit = 20) =>
    request<PaginatedResponse<Product>>(
      "GET",
      `/products?page=${page}&limit=${limit}`,
    ),
  getProduct: (id: string) => request<Product>("GET", `/products/${id}`),
  createProduct: (data: CreateProductPayload) =>
    request<Product>("POST", "/products", data),
  updateProduct: (id: string, data: UpdateProductPayload) =>
    request<Product>("PATCH", `/products/${id}`, data),
  deleteProduct: (id: string) =>
    request<{ success: boolean }>("DELETE", `/products/${id}`),

  // stock movements
  adjustStock: (
    productId: string,
    data: AdjustStockPayload,
    idempotencyKey: string,
  ) =>
    request<StockMovementResponse>(
      "POST",
      `/stock-movements/${productId}`,
      data,
      { "Idempotency-Key": idempotencyKey },
    ),
  getStockMovements: (productId: string, page = 1, limit = 20) =>
    request<PaginatedResponse<StockMovement>>(
      "GET",
      `/stock-movements/${productId}?page=${page}&limit=${limit}`,
    ),

  // settings
  getSettings: () => request<Settings>("GET", "/settings"),
  updateSettings: (data: { defaultLowStockThreshold: number }) =>
    request<Settings>("PATCH", "/settings", data),
};
