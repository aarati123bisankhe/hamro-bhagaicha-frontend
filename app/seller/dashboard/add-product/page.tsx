"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSellerProducts } from "../components/sellerProductStore";

type Category = "plant" | "pot" | "combo";

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct } = useSellerProducts();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("plant");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const clearForm = () => {
    setName("");
    setDescription("");
    setCategory("plant");
    setPrice("");
    setStock("");
    setImageUrl("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!name.trim() || !description.trim()) {
      setError("Product name and description are required.");
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      setError("Stock must be a whole number 0 or greater.");
      return;
    }

    addProduct({
      name: name.trim(),
      description: description.trim(),
      category,
      price: parsedPrice,
      stock: parsedStock,
      imageUrl: imageUrl.trim() || undefined,
    });

    setSuccess("Product added successfully.");
    clearForm();
  };

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-[#1e3d2c]">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-5 shadow-sm border border-[#d7e5d8] space-y-4 max-w-2xl"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-[#23412d]">Product Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Monstera Deliciosa"
            className="w-full rounded-lg border border-[#cfe1d0] px-3 py-2 outline-none focus:border-[#2f5d46]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#23412d]">Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            placeholder="Short product description"
            className="w-full rounded-lg border border-[#cfe1d0] px-3 py-2 outline-none focus:border-[#2f5d46]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#23412d]">Category</label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as Category)}
              className="w-full rounded-lg border border-[#cfe1d0] bg-white px-3 py-2 outline-none focus:border-[#2f5d46]"
            >
              <option value="plant">Plant</option>
              <option value="pot">Pot</option>
              <option value="combo">Combo</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#23412d]">Price (NPR)</label>
            <input
              type="number"
              min="1"
              step="1"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="e.g. 1500"
              className="w-full rounded-lg border border-[#cfe1d0] px-3 py-2 outline-none focus:border-[#2f5d46]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#23412d]">Stock Quantity</label>
            <input
              type="number"
              min="0"
              step="1"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
              placeholder="e.g. 20"
              className="w-full rounded-lg border border-[#cfe1d0] px-3 py-2 outline-none focus:border-[#2f5d46]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#23412d]">Image URL (optional)</label>
            <input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://example.com/product.jpg"
              className="w-full rounded-lg border border-[#cfe1d0] px-3 py-2 outline-none focus:border-[#2f5d46]"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-700">{success}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-[#2f5d46] px-4 py-2 font-semibold text-white transition hover:bg-[#244937]"
          >
            Save Product
          </button>
          <button
            type="button"
            onClick={() => router.push("/seller/dashboard/inventory")}
            className="rounded-lg border border-[#9fbea9] px-4 py-2 font-semibold text-[#2f5d46] transition hover:bg-[#f3faf4]"
          >
            View Inventory
          </button>
        </div>
      </form>
    </section>
  );
}
