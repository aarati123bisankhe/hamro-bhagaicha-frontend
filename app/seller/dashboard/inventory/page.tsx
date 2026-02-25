"use client";

import { useSellerProducts } from "../components/sellerProductStore";

export default function InventoryPage() {
  const { items, loaded, removeProduct, totalStock } = useSellerProducts();

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-[#1e3d2c]">My Products / Inventory</h2>
        <p className="text-sm text-[#48664f]">
          Total Products: {items.length} | Total Stock: {totalStock}
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm border border-[#d7e5d8]">
        {!loaded ? (
          <p className="text-sm text-gray-600">Loading inventory...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-600">No products added yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-[#dbe8dc] p-4 flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold text-[#23412d]">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-[#e9f5ea] px-2 py-1 text-[#2f5d46]">
                      {item.category.toUpperCase()}
                    </span>
                    <span className="rounded-full bg-[#eef2ff] px-2 py-1 text-[#2e3e86]">
                      NPR {item.price}
                    </span>
                    <span className="rounded-full bg-[#fff7e8] px-2 py-1 text-[#7c5b15]">
                      Stock: {item.stock}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeProduct(item.id)}
                  className="rounded-md border border-[#efc8c8] px-3 py-1.5 text-sm font-medium text-[#b03c3c] hover:bg-[#fff3f3]"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
