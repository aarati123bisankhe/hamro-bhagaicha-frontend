export default function DashboardCards() {
  return (
    <div className="space-y-6">

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-md shadow text-center">
          <h2 className="font-semibold mb-2">Total Revenue (Today)</h2>
          <p className="text-lg font-bold">
            NRP 1,200.10 <span className="text-green-600">+15% Today</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-md shadow text-center">
          <h2 className="font-semibold mb-2">New Orders</h2>
          <p className="text-lg font-bold">45</p>
        </div>

        <div className="bg-white p-6 rounded-md shadow text-center">
          <h2 className="font-semibold mb-2">Low Stock Alerts</h2>
          <p className="text-lg font-bold text-red-600">8 ⚠️</p>
        </div>

        <div className="bg-white p-6 rounded-md shadow text-center">
          <h2 className="font-semibold mb-2">New Users</h2>
          <p className="text-lg font-bold">20</p>
        </div>
      </div>

      {/* Recently Orders */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Recently Orders</h2>

        <div className="bg-white p-4 rounded-md shadow flex justify-between items-center">
          <div>
            <h3 className="font-medium">New Order #HBZ1234567</h3>
            <p className="text-sm text-gray-600">Placed by <strong>Niya Sharma</strong></p>
          </div>
          <span className="text-xs text-gray-500">1 min ago</span>
        </div>

        <div className="bg-white p-4 rounded-md shadow flex justify-between items-center">
          <div>
            <h3 className="font-medium">New Order #HBZ1234568</h3>
            <p className="text-sm text-gray-600">Placed by <strong>Rohan Thapa</strong></p>
          </div>
          <span className="text-xs text-gray-500">2 min ago</span>
        </div>
      </div>

    </div>
  );
}
