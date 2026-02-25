"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getOrderById } from "../../components/orderStore";

const ORDER_EVENT = "hb_order_change";

function useOrder(orderId: string) {
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
    () => getOrderById(orderId),
    () => null
  );
}

export default function ConfirmationPage() {
  const params = useParams<{ orderId: string }>();
  const searchParams = useSearchParams();
  const orderId = params?.orderId ?? "";
  const order = useOrder(orderId);
  const emailStatus = searchParams.get("email");

  return (
    <>
      <Header cartCount={0} />

      <main className="mx-auto max-w-4xl px-6 py-8 md:px-10">
        {!order ? (
          <section className="rounded-2xl border border-[#d5ddce] bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-[#1f4f2a]">Order not found</h1>
            <p className="mt-2 text-sm text-[#4d5f50]">
              We could not find this order. Please place a new order from your cart.
            </p>
            <Link
              href="/user/dashboard"
              className="mt-5 inline-block rounded-lg bg-[#2f5d3a] px-4 py-2 text-sm font-semibold text-white"
            >
              Back to Dashboard
            </Link>
          </section>
        ) : (
          <section className="rounded-2xl border border-[#d5ddce] bg-white p-6 shadow-sm">
            {emailStatus === "failed" && (
              <div className="mb-4 rounded-lg border border-[#f0d0ce] bg-[#fff3f2] px-4 py-3 text-sm text-[#b74841]">
                Order placed, but confirmation email failed.
              </div>
            )}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[#628064]">
                  {order.orderStatus === "cancelled"
                    ? "Order Cancelled"
                    : "Order Confirmed"}
                </p>
                <h1 className="text-3xl font-semibold text-[#1f4f2a]">
                  {order.orderStatus === "cancelled"
                    ? "This order has been cancelled"
                    : "Thank you for your order"}
                </h1>
                <p className="mt-1 text-sm text-[#4d5f50]">Order ID: {order.id}</p>
              </div>
              <p className="rounded-full bg-[#e8f2e7] px-3 py-1 text-xs font-semibold text-[#23522f]">
                {order.paymentStatus === "paid" ? "Payment Received" : "Payment on Delivery"}
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-[#f8faf6] p-4">
                <h2 className="mb-2 text-sm font-semibold text-[#1f4f2a]">Customer Details</h2>
                <p className="text-sm">{order.customer.name}</p>
                <p className="text-sm text-[#4d5f50]">{order.customer.address}</p>
                <p className="text-sm text-[#4d5f50]">{order.customer.email}</p>
                <p className="text-sm text-[#4d5f50]">{order.customer.phone}</p>
              </div>

              <div className="rounded-xl bg-[#f8faf6] p-4">
                <h2 className="mb-2 text-sm font-semibold text-[#1f4f2a]">Delivery & Payment</h2>
                <p className="text-sm">
                  Delivery: {order.deliveryMethod === "home" ? "Home Delivery" : "Pick Up"}
                </p>
                <p className="text-sm">
                  Payment: {order.paymentMethod === "esewa" ? "eSewa" : "Cash on Delivery"}
                </p>
                <p className="text-sm text-[#4d5f50]">
                  Ordered on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-[#dbe3d6] p-4">
              <h2 className="mb-3 text-sm font-semibold text-[#1f4f2a]">Items</h2>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">NPR {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 border-t border-[#dbe3d6] pt-3 text-right text-base font-semibold text-[#1d4e2a]">
                Total: NPR {order.subtotal}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/user/dashboard"
                className="rounded-lg bg-[#2f5d3a] px-4 py-2 text-sm font-semibold text-white"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/user/dashboard/plant"
                className="rounded-lg border border-[#2f5d3a] px-4 py-2 text-sm font-semibold text-[#2f5d3a]"
              >
                Continue Shopping
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
