"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CartItem } from "./useCart";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartSidebar({
  open,
  onClose,
  items,
  subtotal,
  onIncrease,
  onDecrease,
  onRemove,
}: CartSidebarProps) {
  const router = useRouter();

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed right-0 top-0 z-50 flex h-full w-[380px] flex-col bg-[#f8f7f3] p-5 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-[#2f5d3a]" />
            <h2 className="text-lg font-bold text-[#2f5d3a]">My Cart</h2>
          </div>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm">
            Your cart is empty. Add plants from the collection.
          </div>
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-white p-3 shadow-sm"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[#1e3424]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-[#365641]">NPR {item.price}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDecrease(item.id)}
                          className="rounded-md bg-[#e5eddf] p-1 text-[#2f5d3a]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => onIncrease(item.id)}
                          className="rounded-md bg-[#e5eddf] p-1 text-[#2f5d3a]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 border-t border-[#d8dfd3] pt-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-[#1d4e2a]">NPR {subtotal}</span>
          </div>
          <button
            onClick={() => {
              onClose();
              router.push("/user/dashboard/checkout");
            }}
            disabled={items.length === 0}
            className="w-full rounded-xl bg-[#2f5d3a] p-3 font-semibold text-white hover:bg-[#264a2e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
