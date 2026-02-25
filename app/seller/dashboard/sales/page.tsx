import { handleGetSellerInventory } from "@/lib/actions/seller/product_action";

export default async function SalesStatsPage() {
  const response = await handleGetSellerInventory();
  const items = response.data || [];

  const totalStock = items.reduce((sum, item) => sum + item.stock, 0);
  const inventoryValue = items.reduce((sum, item) => sum + item.price * item.stock, 0);

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

      {!response.success && (
        <p className="text-sm text-red-600">{response.message || "Failed to load stats."}</p>
      )}
    </section>
  );
}
