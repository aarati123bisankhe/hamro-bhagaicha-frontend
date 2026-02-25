"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  deleteOrder,
  getOrders,
  type OrderRecord,
  updateOrderPaymentStatus,
  updateOrderStatus,
} from "@/app/user/dashboard/components/orderStore";

const ORDER_EVENT = "hb_order_change";
const ORDERS_PER_PAGE = 8;

function useAdminOrders(): OrderRecord[] {
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

export default function AdminOrdersPage() {
  const orders = useAdminOrders();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        !normalizedSearch ||
        `${order.id} ${order.customer.name} ${order.customer.email} ${order.customer.phone}`
          .toLowerCase()
          .includes(normalizedSearch);

      const currentStatus = order.orderStatus ?? "placed";
      const matchesStatus =
        statusFilter === "all" ? true : currentStatus === statusFilter;

      const matchesPayment =
        paymentFilter === "all" ? true : order.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [normalizedSearch, orders, paymentFilter, statusFilter]);

  const summary = useMemo(() => {
    return filteredOrders.reduce(
      (acc, order) => {
        const status = order.orderStatus ?? "placed";
        acc.totalRevenue += order.subtotal;
        if (status === "placed" || status === "processing") acc.active += 1;
        if (status === "delivered") acc.delivered += 1;
        if (status === "cancelled") acc.cancelled += 1;
        return acc;
      },
      { totalRevenue: 0, active: 0, delivered: 0, cancelled: 0 }
    );
  }, [filteredOrders]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ORDERS_PER_PAGE)
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedOrders = useMemo(() => {
    const start = (safeCurrentPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  }, [filteredOrders, safeCurrentPage]);

  return (
    <div className="space-y-6 text-black">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-sm text-gray-500">
            Track, update and manage customer orders.
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-md bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-semibold text-green-700">
            NPR {summary.totalRevenue}
          </p>
        </div>
        <div className="rounded-md bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Active Orders</p>
          <p className="text-2xl font-semibold text-amber-600">{summary.active}</p>
        </div>
        <div className="rounded-md bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Delivered</p>
          <p className="text-2xl font-semibold text-emerald-700">
            {summary.delivered}
          </p>
        </div>
        <div className="rounded-md bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Cancelled</p>
          <p className="text-2xl font-semibold text-red-600">{summary.cancelled}</p>
        </div>
      </section>

      <section className="rounded-md bg-white p-4 shadow">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search order ID, customer, phone or email"
            className="rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="rounded border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="placed">Placed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(event) => {
              setPaymentFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="rounded border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </section>

      <div className="space-y-4">
        {paginatedOrders.length === 0 ? (
          <div className="rounded-md bg-white p-6 text-sm text-gray-500 shadow">
            No orders found.
          </div>
        ) : (
          paginatedOrders.map((order) => {
            const currentStatus = order.orderStatus ?? "placed";
            return (
              <article key={order.id} className="rounded-md bg-white p-5 shadow">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <h2 className="text-lg font-semibold">{order.id}</h2>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      {order.customer.name} • {order.customer.phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-green-700">
                      NPR {order.subtotal}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {order.items.length} items
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
                  <div className="rounded border bg-gray-50 p-3 text-sm">
                    <p className="text-xs text-gray-500">Delivery</p>
                    <p className="font-medium capitalize">{order.deliveryMethod}</p>
                    <p className="text-xs text-gray-600">{order.customer.address}</p>
                  </div>

                  <div className="rounded border bg-gray-50 p-3 text-sm">
                    <p className="text-xs text-gray-500">Payment</p>
                    <select
                      value={order.paymentStatus}
                      onChange={(event) =>
                        updateOrderPaymentStatus(
                          order.id,
                          event.target.value as "pending" | "paid"
                        )
                      }
                      className="mt-1 w-full rounded border bg-white px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>

                  <div className="rounded border bg-gray-50 p-3 text-sm">
                    <p className="text-xs text-gray-500">Order Status</p>
                    <select
                      value={currentStatus}
                      onChange={(event) =>
                        updateOrderStatus(
                          order.id,
                          event.target.value as
                            | "placed"
                            | "processing"
                            | "shipped"
                            | "delivered"
                            | "cancelled"
                        )
                      }
                      className="mt-1 w-full rounded border bg-white px-2 py-1 text-sm"
                    >
                      <option value="placed">Placed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="rounded border bg-gray-50 p-3 text-sm">
                    <p className="text-xs text-gray-500">Actions</p>
                    <button
                      onClick={() => {
                        const ok = window.confirm(
                          `Delete order ${order.id}? This cannot be undone.`
                        );
                        if (ok) deleteOrder(order.id);
                      }}
                      className="mt-1 rounded border border-red-300 px-3 py-1 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded border bg-gray-50 p-3">
                  <p className="mb-2 text-sm font-semibold text-gray-700">Items</p>
                  <div className="space-y-1 text-sm">
                    {order.items.map((item) => (
                      <div
                        key={`${order.id}-${item.id}`}
                        className="flex items-center justify-between"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">
                          NPR {item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {filteredOrders.length > ORDERS_PER_PAGE && (
        <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 shadow">
          <p className="text-sm text-gray-600">
            Showing {(safeCurrentPage - 1) * ORDERS_PER_PAGE + 1}-
            {Math.min(safeCurrentPage * ORDERS_PER_PAGE, filteredOrders.length)} of{" "}
            {filteredOrders.length}
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={safeCurrentPage === totalPages}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
