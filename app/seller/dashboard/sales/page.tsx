"use client";

import { useMemo } from "react";
import { useSellerProducts } from "../components/sellerProductStore";

export default function SalesStatsPage() {
  const { items, totalStock } = useSellerProducts();

  const inventoryValue = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.stock, 0),
    [items]
  );

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-[#1e3d2c]">Sales / Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[#d7e5d8] bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-[#678469]">Products</p>
          <p className="text-2xl font-bold text-[#23412d]">{items.length}</p>
        </div>
        <div className="rounded-xl border border-[#d7e5d8] bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-[#678469]">Total Stock</p>
          <p className="text-2xl font-bold text-[#23412d]">{totalStock}</p>
        </div>
        <div className="rounded-xl border border-[#d7e5d8] bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-[#678469]">Inventory Value</p>
          <p className="text-2xl font-bold text-[#23412d]">NPR {inventoryValue}</p>
        </div>
      </div>
    </section>
  );
}
