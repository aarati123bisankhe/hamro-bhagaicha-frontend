"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import Footer from "../dashboard/components/Footer";
import Header from "../dashboard/components/Header";
import { getOrders, type OrderRecord } from "../dashboard/components/orderStore";

const ORDER_EVENT = "hb_order_change";

function useOrders(): OrderRecord[] {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};

      const onStorage = (event: StorageEvent) => {
        if (event.key === "hb_orders") onStoreChange();
      };

      window.addEventListener("storage", onStorage);
      window.addEventListener(ORDER_EVENT, onStoreChange);

      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(ORDER_EVENT, onStoreChange);
      };
    },
    getOrders,
    () => []
  );
}

export default function OrdersPage() {
  const orders = useOrders();

  return (
    <>
      <Header cartCount={0} />

      <main className="mx-auto max-w-6xl px-6 py-8 md:px-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold text-[#1f4f2a]">My Orders</h1>
            <p className="mt-1 text-sm text-[#4d5f50]">View all your placed orders and details.</p>
          </div>
          <Link
            href="/user/dashboard"
            className="rounded-lg border border-[#2f5d3a] px-3 py-2 text-sm font-semibold text-[#2f5d3a]"
          >
            Back to Dashboard
          </Link>
        </div>

        {orders.length === 0 ? (
          <section className="rounded-2xl border border-[#d5ddce] bg-white p-6 shadow-sm">
            <p className="text-sm text-[#4d5f50]">No orders yet. Place an order from cart to see details here.</p>
            <Link
              href="/user/dashboard/plant"
              className="mt-4 inline-block rounded-lg bg-[#2f5d3a] px-4 py-2 text-sm font-semibold text-white"
            >
              Shop Plants
            </Link>
          </section>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-[#d5ddce] bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#6a7f6e]">Order ID</p>
                    <h2 className="text-lg font-semibold text-[#1f4f2a]">{order.id}</h2>
                    <p className="mt-1 text-xs text-[#4d5f50]">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-[#4d5f50]">Total</p>
                    <p className="text-xl font-bold text-[#1d4e2a]">NPR {order.subtotal}</p>
                    <span className="mt-1 inline-block rounded-full bg-[#e8f2e7] px-2.5 py-1 text-[11px] font-semibold text-[#23522f]">
                      {order.paymentStatus === "paid" ? "Paid" : "Pending"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                  <div className="rounded-xl bg-[#f8faf6] p-3">
                    <p className="text-xs text-[#6a7f6e]">Customer</p>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-[#4d5f50]">{order.customer.phone}</p>
                  </div>

                  <div className="rounded-xl bg-[#f8faf6] p-3">
                    <p className="text-xs text-[#6a7f6e]">Delivery</p>
                    <p className="font-medium">
                      {order.deliveryMethod === "home" ? "Home Delivery" : "Pick Up"}
                    </p>
                    <p className="text-[#4d5f50]">{order.customer.address}</p>
                  </div>

                  <div className="rounded-xl bg-[#f8faf6] p-3">
                    <p className="text-xs text-[#6a7f6e]">Payment</p>
                    <p className="font-medium">
                      {order.paymentMethod === "esewa" ? "eSewa" : "Cash on Delivery"}
                    </p>
                    <p className="text-[#4d5f50]">{order.customer.email}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-[#1f4f2a]">Items</p>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={`${order.id}-${item.id}`}
                        className="flex items-center justify-between rounded-lg bg-[#f8faf6] px-3 py-2 text-sm"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">NPR {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/user/dashboard/order-confirmation/${order.id}`}
                    className="inline-block rounded-lg bg-[#2f5d3a] px-4 py-2 text-sm font-semibold text-white"
                  >
                    View Full Detail
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
