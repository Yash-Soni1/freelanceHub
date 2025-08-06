/* eslint-disable @typescript-eslint/no-unused-vars */
import ClientLayout from "@/components/layouts/ClientLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/utils/api";

const ClientOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || user.role !== "client") {
      toast.error("Access denied. Clients only.");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <ClientLayout>
        <p className="text-lg">Loading orders...</p>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border-2 border-black p-4 rounded-lg shadow-[6px_6px_0px_lightblue] bg-white"
            >
              <h4 className="font-bold">{order.gigTitle}</h4>
              <p className="text-sm text-gray-600">
                Freelancer: {order.freelancer}
              </p>
              <p className="font-semibold">₹{order.price}</p>
              <p className="text-sm">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </ClientLayout>
  );
};

export default ClientOrders;
