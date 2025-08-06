/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ClientLayout from "@/components/layouts/ClientLayout";
import api from "@/utils/api";

const Dashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [user] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || user.role !== "client") {
      toast.error("Access denied. Clients only.");
      return;
    }

    const fetchOrders = async () => {
      try {
        const resOrders = await api.get("/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(resOrders.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/login";
        } else {
          toast.error("Failed to load orders.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <ClientLayout>
        <p className="text-lg">Loading dashboard...</p>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <h2 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h2>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">My Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border-2 border-black p-4 shadow-[10px_10px_0px_lightblue] bg-white"
              >
                <h4 className="font-bold">{order.gig?.title || "Untitled Gig"}</h4>
                <p className="text-sm text-gray-600">
                  Freelancer: {order.freelancer?.username || "Unknown"}
                </p>
                <p>
                  Status:{" "}
                  <span className="font-semibold capitalize">{order.status}</span>
                </p>
                <p>₹{order.price ?? "N/A"}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </ClientLayout>
  );
};

export default Dashboard;
