"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../components/useCart";
import {
  createOrderId,
  saveOrder,
  type DeliveryMethod,
  type PaymentMethod,
} from "../components/orderStore";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(/^\+[1-9]\d{7,14}$/, "Use E.164 format (e.g. +97798XXXXXXXX)"),
  deliveryMethod: z.enum(["home", "pickup"]),
  paymentMethod: z.enum(["cod", "esewa"]),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

type OrderEmailItem = {
  name: string;
  quantity: number;
  price: number;
};

type OrderEmailPayload = {
  toEmail: string;
  orderId: string;
  customerName: string;
  totalAmount: number;
  currency: "NPR";
  items: OrderEmailItem[];
  shippingAddress: string;
};

type OrderEmailResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

async function sendOrderEmail(payload: OrderEmailPayload) {
  const res = await fetch("/api/checkout/send-order-confirmation-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let body: OrderEmailResponse | null = null;
  try {
    body = (await res.json()) as OrderEmailResponse;
  } catch {
    body = null;
  }

  if (!res.ok || !body?.success) {
    throw new Error(body?.message || `Request failed (${res.status})`);
  }

  return body;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, itemCount, clearCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: "home",
      paymentMethod: "cod",
    },
  });

  const onSubmit = async (values: CheckoutFormData) => {
    if (items.length === 0) return;

    const orderId = createOrderId();

    saveOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: values.name,
        address: values.address,
        email: values.email,
        phone: values.phone,
      },
      deliveryMethod: values.deliveryMethod as DeliveryMethod,
      paymentMethod: values.paymentMethod as PaymentMethod,
      paymentStatus: values.paymentMethod === "esewa" ? "paid" : "pending",
      orderStatus: "placed",
      items,
      subtotal,
    });

    const notificationResults = await Promise.allSettled([
      fetch("/api/sms/send-order-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: values.phone,
          phone: values.phone,
          phoneNumber: values.phone,
          customerName: values.name,
          orderId,
          total: subtotal,
          totalAmount: subtotal,
        }),
      }),
      sendOrderEmail({
        toEmail: values.email,
        orderId,
        customerName: values.name,
        totalAmount: subtotal,
        currency: "NPR",
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: values.address,
      }),
    ]);

    const smsResult = notificationResults[0];
    const emailResult = notificationResults[1];

    if (smsResult.status === "fulfilled" && !smsResult.value.ok) {
      const errorText = await smsResult.value.text();
      console.error("SMS send failed:", errorText);
    } else if (smsResult.status === "rejected") {
      console.error("SMS notification failed", smsResult.reason);
    }

    const emailFailed = emailResult.status === "rejected";
    if (emailFailed) {
      console.error("Email notification failed", emailResult.reason);
    }

    clearCart();
    router.push(
      `/user/dashboard/order-confirmation/${orderId}${emailFailed ? "?email=failed" : ""}`
    );
  };

  return (
    <>
      <Header cartCount={itemCount} />

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-2 md:px-10">
        <section className="rounded-2xl border border-[#d5ddce] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#1f4f2a]">Checkout</h1>
            <Link href="/user/dashboard" className="text-sm text-[#2f5d3a] underline">
              Continue Shopping
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name</label>
              <input
                {...register("name")}
                className="w-full rounded-lg border border-[#cfd8c8] px-3 py-2 outline-none focus:border-[#2f5d3a]"
                placeholder="Enter your name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Address</label>
              <textarea
                {...register("address")}
                rows={3}
                className="w-full rounded-lg border border-[#cfd8c8] px-3 py-2 outline-none focus:border-[#2f5d3a]"
                placeholder="Enter delivery address"
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  {...register("email")}
                  className="w-full rounded-lg border border-[#cfd8c8] px-3 py-2 outline-none focus:border-[#2f5d3a]"
                  placeholder="example@mail.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <input
                  {...register("phone")}
                  className="w-full rounded-lg border border-[#cfd8c8] px-3 py-2 outline-none focus:border-[#2f5d3a]"
                  placeholder="+97798XXXXXXXX"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Delivery Option</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#cfd8c8] p-3 text-sm">
                  <input type="radio" value="home" {...register("deliveryMethod")} />
                  Home Delivery
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#cfd8c8] p-3 text-sm">
                  <input type="radio" value="pickup" {...register("deliveryMethod")} />
                  Pick Up
                </label>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Payment Method</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#cfd8c8] p-3 text-sm">
                  <input type="radio" value="cod" {...register("paymentMethod")} />
                  Cash on Delivery
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#cfd8c8] p-3 text-sm">
                  <input type="radio" value="esewa" {...register("paymentMethod")} />
                  eSewa (Online)
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={items.length === 0 || isSubmitting}
              className="w-full rounded-xl bg-[#2f5d3a] p-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-[#d5ddce] bg-[#f8faf6] p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-[#1f4f2a]">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {items.length === 0 ? (
              <p className="text-sm text-[#516451]">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white p-3">
                  <img src={item.image} alt={item.name} className="h-14 w-14 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-[#5e735f]">
                      NPR {item.price} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">NPR {item.price * item.quantity}</p>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 border-t border-[#d7dfd1] pt-4">
            <div className="flex items-center justify-between text-sm">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-base font-semibold text-[#1d4e2a]">
              <span>Subtotal</span>
              <span>NPR {subtotal}</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
