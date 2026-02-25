import { redirect } from "next/navigation";

export default function SellerDashboardIndex() {
  redirect("/seller/dashboard/add-product");
}
