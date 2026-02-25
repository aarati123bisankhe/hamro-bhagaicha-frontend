"use client";

import { useMemo, useState } from "react";
import {
  useCatalog,
  type CatalogType,
  type ComboCatalogItem,
  type PlantCatalogItem,
  type PotCatalogItem,
} from "@/app/user/dashboard/components/catalogStore";

const ITEMS_PER_PAGE = 8;

function ProductModal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-md bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-green-700">{title}</h2>
            <button onClick={onClose} className="text-xl leading-none text-gray-600">
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default function AdminPlantsPage() {
  const [activeTab, setActiveTab] = useState<CatalogType>("plant");
  const [currentPage, setCurrentPage] = useState(1);

  const plantCatalog = useCatalog("plant");
  const potCatalog = useCatalog("pot");
  const comboCatalog = useCatalog("combo");

  const [editPlant, setEditPlant] = useState<PlantCatalogItem | null>(null);
  const [editPot, setEditPot] = useState<PotCatalogItem | null>(null);
  const [editCombo, setEditCombo] = useState<ComboCatalogItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const currentItems = useMemo(() => {
    if (activeTab === "plant") return plantCatalog.items;
    if (activeTab === "pot") return potCatalog.items;
    return comboCatalog.items;
  }, [activeTab, comboCatalog.items, plantCatalog.items, potCatalog.items]);

  const totalPages = Math.max(1, Math.ceil(currentItems.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return currentItems.slice(start, start + ITEMS_PER_PAGE);
  }, [currentItems, safeCurrentPage]);

  const tabClass = (tab: CatalogType) =>
    `rounded-lg px-4 py-2 text-sm font-semibold transition ${
      activeTab === tab
        ? "bg-green-600 text-white"
        : "bg-white text-gray-700 hover:bg-green-50"
    }`;

  return (
    <div className="space-y-6 text-black">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <p className="text-sm text-gray-500">
            Manage plants, pots and combo products shown in storefront.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          + Add {activeTab === "plant" ? "Plant" : activeTab === "pot" ? "Pot" : "Combo"}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            setActiveTab("plant");
            setCurrentPage(1);
          }}
          className={tabClass("plant")}
        >
          Plants ({plantCatalog.count})
        </button>
        <button
          onClick={() => {
            setActiveTab("pot");
            setCurrentPage(1);
          }}
          className={tabClass("pot")}
        >
          Pots ({potCatalog.count})
        </button>
        <button
          onClick={() => {
            setActiveTab("combo");
            setCurrentPage(1);
          }}
          className={tabClass("combo")}
        >
          Combos ({comboCatalog.count})
        </button>
      </div>

      <section className="overflow-x-auto rounded-md bg-white shadow">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              {activeTab === "combo" && <th className="p-3">Old Price</th>}
              <th className="p-3">Rating</th>
              <th className="p-3">Reviews</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="line-clamp-1 text-xs text-gray-500">{item.description}</p>
                </td>
                <td className="p-3">
                  {"category" in item ? item.category : "Combo"}
                </td>
                <td className="p-3">NPR {item.price}</td>
                {activeTab === "combo" && (
                  <td className="p-3">
                    {"oldPrice" in item ? `NPR ${item.oldPrice}` : "-"}
                  </td>
                )}
                <td className="p-3">{item.rating}</td>
                <td className="p-3">{item.reviews}</td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        if (activeTab === "plant") setEditPlant(item as PlantCatalogItem);
                        if (activeTab === "pot") setEditPot(item as PotCatalogItem);
                        if (activeTab === "combo") setEditCombo(item as ComboCatalogItem);
                      }}
                      className="rounded border px-2 py-1 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const ok = window.confirm(`Delete ${item.name}?`);
                        if (!ok) return;
                        if (activeTab === "plant") plantCatalog.deleteItem(item.id);
                        if (activeTab === "pot") potCatalog.deleteItem(item.id);
                        if (activeTab === "combo") comboCatalog.deleteItem(item.id);
                      }}
                      className="rounded border border-red-300 px-2 py-1 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {currentItems.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 shadow">
          <p className="text-sm text-gray-600">
            Showing {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(safeCurrentPage * ITEMS_PER_PAGE, currentItems.length)} of{" "}
            {currentItems.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={safeCurrentPage === 1}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {safeCurrentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={safeCurrentPage === totalPages}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {isAddModalOpen && activeTab === "plant" && (
        <AddPlantModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={(item) => {
            plantCatalog.addItem(item);
            setIsAddModalOpen(false);
          }}
        />
      )}
      {isAddModalOpen && activeTab === "pot" && (
        <AddPotModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={(item) => {
            potCatalog.addItem(item);
            setIsAddModalOpen(false);
          }}
        />
      )}
      {isAddModalOpen && activeTab === "combo" && (
        <AddComboModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={(item) => {
            comboCatalog.addItem(item);
            setIsAddModalOpen(false);
          }}
        />
      )}

      {editPlant && (
        <EditPlantModal
          item={editPlant}
          onClose={() => setEditPlant(null)}
          onSave={(patch) => {
            plantCatalog.updateItem(editPlant.id, patch);
            setEditPlant(null);
          }}
        />
      )}
      {editPot && (
        <EditPotModal
          item={editPot}
          onClose={() => setEditPot(null)}
          onSave={(patch) => {
            potCatalog.updateItem(editPot.id, patch);
            setEditPot(null);
          }}
        />
      )}
      {editCombo && (
        <EditComboModal
          item={editCombo}
          onClose={() => setEditCombo(null)}
          onSave={(patch) => {
            comboCatalog.updateItem(editCombo.id, patch);
            setEditCombo(null);
          }}
        />
      )}
    </div>
  );
}

function AddPlantModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (item: PlantCatalogItem) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("/images/monsteradeliciosa.webp");
  const [category, setCategory] = useState<"Indoor Plant" | "Outdoor Plant">(
    "Indoor Plant"
  );
  const [rating, setRating] = useState(4.8);
  const [reviews, setReviews] = useState(1);

  return (
    <ProductModal title="Add Plant" onClose={onClose}>
      <ProductFormLayout
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
        price={price}
        setPrice={setPrice}
        rating={rating}
        setRating={setRating}
        reviews={reviews}
        setReviews={setReviews}
        categoryField={
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as "Indoor Plant" | "Outdoor Plant")
            }
            className="rounded border p-2"
          >
            <option value="Indoor Plant">Indoor Plant</option>
            <option value="Outdoor Plant">Outdoor Plant</option>
          </select>
        }
        onCancel={onClose}
        onSubmit={() => {
          onSave({
            id: `plant-${Date.now()}`,
            name,
            description,
            price,
            image,
            category,
            rating,
            reviews,
          });
        }}
      />
    </ProductModal>
  );
}

function AddPotModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (item: PotCatalogItem) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("/images/ceramic.png");
  const [category, setCategory] = useState<"All Pot" | "Hanging">("All Pot");
  const [rating, setRating] = useState(4.8);
  const [reviews, setReviews] = useState(1);

  return (
    <ProductModal title="Add Pot" onClose={onClose}>
      <ProductFormLayout
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
        price={price}
        setPrice={setPrice}
        rating={rating}
        setRating={setRating}
        reviews={reviews}
        setReviews={setReviews}
        categoryField={
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as "All Pot" | "Hanging")}
            className="rounded border p-2"
          >
            <option value="All Pot">All Pot</option>
            <option value="Hanging">Hanging</option>
          </select>
        }
        onCancel={onClose}
        onSubmit={() => {
          onSave({
            id: `pot-${Date.now()}`,
            name,
            description,
            price,
            image,
            category,
            rating,
            reviews,
          });
        }}
      />
    </ProductModal>
  );
}

function AddComboModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (item: ComboCatalogItem) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [image, setImage] = useState("/images/combo.png");
  const [rating, setRating] = useState(4.8);
  const [reviews, setReviews] = useState(1);

  return (
    <ProductModal title="Add Combo" onClose={onClose}>
      <ComboFormLayout
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        details={details}
        setDetails={setDetails}
        image={image}
        setImage={setImage}
        price={price}
        setPrice={setPrice}
        oldPrice={oldPrice}
        setOldPrice={setOldPrice}
        rating={rating}
        setRating={setRating}
        reviews={reviews}
        setReviews={setReviews}
        onCancel={onClose}
        onSubmit={() => {
          onSave({
            id: `combo-${Date.now()}`,
            name,
            description,
            details,
            price,
            oldPrice,
            image,
            rating,
            reviews,
          });
        }}
      />
    </ProductModal>
  );
}

function EditPlantModal({
  item,
  onClose,
  onSave,
}: {
  item: PlantCatalogItem;
  onClose: () => void;
  onSave: (patch: Partial<PlantCatalogItem>) => void;
}) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [image, setImage] = useState(item.image);
  const [category, setCategory] = useState(item.category);
  const [rating, setRating] = useState(item.rating);
  const [reviews, setReviews] = useState(item.reviews);

  return (
    <ProductModal title="Edit Plant" onClose={onClose}>
      <ProductFormLayout
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
        price={price}
        setPrice={setPrice}
        rating={rating}
        setRating={setRating}
        reviews={reviews}
        setReviews={setReviews}
        categoryField={
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as "Indoor Plant" | "Outdoor Plant")
            }
            className="rounded border p-2"
          >
            <option value="Indoor Plant">Indoor Plant</option>
            <option value="Outdoor Plant">Outdoor Plant</option>
          </select>
        }
        onCancel={onClose}
        onSubmit={() => onSave({ name, description, price, image, category, rating, reviews })}
      />
    </ProductModal>
  );
}

function EditPotModal({
  item,
  onClose,
  onSave,
}: {
  item: PotCatalogItem;
  onClose: () => void;
  onSave: (patch: Partial<PotCatalogItem>) => void;
}) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [image, setImage] = useState(item.image);
  const [category, setCategory] = useState(item.category);
  const [rating, setRating] = useState(item.rating);
  const [reviews, setReviews] = useState(item.reviews);

  return (
    <ProductModal title="Edit Pot" onClose={onClose}>
      <ProductFormLayout
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
        price={price}
        setPrice={setPrice}
        rating={rating}
        setRating={setRating}
        reviews={reviews}
        setReviews={setReviews}
        categoryField={
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as "All Pot" | "Hanging")}
            className="rounded border p-2"
          >
            <option value="All Pot">All Pot</option>
            <option value="Hanging">Hanging</option>
          </select>
        }
        onCancel={onClose}
        onSubmit={() => onSave({ name, description, price, image, category, rating, reviews })}
      />
    </ProductModal>
  );
}

function EditComboModal({
  item,
  onClose,
  onSave,
}: {
  item: ComboCatalogItem;
  onClose: () => void;
  onSave: (patch: Partial<ComboCatalogItem>) => void;
}) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [details, setDetails] = useState(item.details);
  const [price, setPrice] = useState(item.price);
  const [oldPrice, setOldPrice] = useState(item.oldPrice);
  const [image, setImage] = useState(item.image);
  const [rating, setRating] = useState(item.rating);
  const [reviews, setReviews] = useState(item.reviews);

  return (
    <ProductModal title="Edit Combo" onClose={onClose}>
      <ComboFormLayout
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        details={details}
        setDetails={setDetails}
        image={image}
        setImage={setImage}
        price={price}
        setPrice={setPrice}
        oldPrice={oldPrice}
        setOldPrice={setOldPrice}
        rating={rating}
        setRating={setRating}
        reviews={reviews}
        setReviews={setReviews}
        onCancel={onClose}
        onSubmit={() => onSave({ name, description, details, price, oldPrice, image, rating, reviews })}
      />
    </ProductModal>
  );
}

function ProductFormLayout({
  name,
  setName,
  description,
  setDescription,
  image,
  setImage,
  price,
  setPrice,
  rating,
  setRating,
  reviews,
  setReviews,
  categoryField,
  onCancel,
  onSubmit,
}: {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  image: string;
  setImage: (value: string) => void;
  price: number;
  setPrice: (value: number) => void;
  rating: number;
  setRating: (value: number) => void;
  reviews: number;
  setReviews: (value: number) => void;
  categoryField: React.ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="space-y-3"
    >
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
        className="w-full rounded border p-2"
        required
      />
      <input
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        className="w-full rounded border p-2"
        required
      />
      <input
        value={image}
        onChange={(event) => setImage(event.target.value)}
        placeholder="Image URL (e.g. /images/your-image.png)"
        className="w-full rounded border p-2"
        required
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          min={0}
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
          placeholder="Price"
          className="rounded border p-2"
          required
        />
        {categoryField}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          min={0}
          max={5}
          step={0.1}
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
          placeholder="Rating"
          className="rounded border p-2"
          required
        />
        <input
          type="number"
          min={0}
          value={reviews}
          onChange={(event) => setReviews(Number(event.target.value))}
          placeholder="Reviews"
          className="rounded border p-2"
          required
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="rounded border px-3 py-2">
          Cancel
        </button>
        <button type="submit" className="rounded bg-green-600 px-3 py-2 text-white">
          Save
        </button>
      </div>
    </form>
  );
}

function ComboFormLayout({
  name,
  setName,
  description,
  setDescription,
  details,
  setDetails,
  image,
  setImage,
  price,
  setPrice,
  oldPrice,
  setOldPrice,
  rating,
  setRating,
  reviews,
  setReviews,
  onCancel,
  onSubmit,
}: {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  details: string;
  setDetails: (value: string) => void;
  image: string;
  setImage: (value: string) => void;
  price: number;
  setPrice: (value: number) => void;
  oldPrice: number;
  setOldPrice: (value: number) => void;
  rating: number;
  setRating: (value: number) => void;
  reviews: number;
  setReviews: (value: number) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="space-y-3"
    >
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
        className="w-full rounded border p-2"
        required
      />
      <input
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        className="w-full rounded border p-2"
        required
      />
      <input
        value={details}
        onChange={(event) => setDetails(event.target.value)}
        placeholder="Details"
        className="w-full rounded border p-2"
        required
      />
      <input
        value={image}
        onChange={(event) => setImage(event.target.value)}
        placeholder="Image URL (e.g. /images/combo9.png)"
        className="w-full rounded border p-2"
        required
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          min={0}
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
          placeholder="Price"
          className="rounded border p-2"
          required
        />
        <input
          type="number"
          min={0}
          value={oldPrice}
          onChange={(event) => setOldPrice(Number(event.target.value))}
          placeholder="Old Price"
          className="rounded border p-2"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          min={0}
          max={5}
          step={0.1}
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
          placeholder="Rating"
          className="rounded border p-2"
          required
        />
        <input
          type="number"
          min={0}
          value={reviews}
          onChange={(event) => setReviews(Number(event.target.value))}
          placeholder="Reviews"
          className="rounded border p-2"
          required
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="rounded border px-3 py-2">
          Cancel
        </button>
        <button type="submit" className="rounded bg-green-600 px-3 py-2 text-white">
          Save
        </button>
      </div>
    </form>
  );
}
