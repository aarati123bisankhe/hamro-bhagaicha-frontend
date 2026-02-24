export type DeliveryMethod = "home" | "pickup";
export type PaymentMethod = "cod" | "esewa";

export type CustomerInfo = {
  name: string;
  address: string;
  email: string;
  phone: string;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type OrderRecord = {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid";
  orderStatus?: "placed" | "cancelled";
  items: OrderItem[];
  subtotal: number;
};

const ORDERS_STORAGE_KEY = "hb_orders";
const ORDER_EVENT = "hb_order_change";
const EMPTY_ORDERS: OrderRecord[] = [];

let cachedRawOrders = "";
let cachedOrders: OrderRecord[] = EMPTY_ORDERS;

function readOrders(): OrderRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY) ?? "";
    if (raw === cachedRawOrders) return cachedOrders;
    if (!raw) {
      cachedRawOrders = "";
      cachedOrders = EMPTY_ORDERS;
      return cachedOrders;
    }

    const parsed = JSON.parse(raw) as OrderRecord[];
    cachedRawOrders = raw;
    cachedOrders = Array.isArray(parsed) ? parsed : EMPTY_ORDERS;
    return cachedOrders;
  } catch {
    cachedRawOrders = "";
    cachedOrders = EMPTY_ORDERS;
    return cachedOrders;
  }
}

function writeOrders(orders: OrderRecord[]) {
  if (typeof window === "undefined") return;

  const serialized = JSON.stringify(orders);
  cachedRawOrders = serialized;
  cachedOrders = orders;
  localStorage.setItem(ORDERS_STORAGE_KEY, serialized);
  window.dispatchEvent(new Event(ORDER_EVENT));
}

export function createOrderId() {
  return `HB-${Date.now().toString().slice(-8)}`;
}

export function saveOrder(order: OrderRecord) {
  const current = readOrders();
  writeOrders([order, ...current]);
}

export function getOrders() {
  return readOrders();
}

export function cancelOrder(orderId: string) {
  const next = readOrders().map((order) =>
    order.id === orderId ? ({ ...order, orderStatus: "cancelled" } as OrderRecord) : order
  );
  writeOrders(next);
}

export function deleteOrder(orderId: string) {
  const next = readOrders().filter((order) => order.id !== orderId);
  writeOrders(next);
}

export function getOrderById(orderId: string) {
  return readOrders().find((order) => order.id === orderId) ?? null;
}
