import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import FreelancerLayout from "@/components/layouts/FreelancerLayout"; // Ensure this exists

interface Order {
  id: string;
  clientName: string;
  gigTitle: string;
  price: number;
  deliveryTime: number;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: "1", clientName: "John Doe", gigTitle: "Logo Design", price: 5000, deliveryTime: 3, status: "Pending" },
    { id: "2", clientName: "Jane Smith", gigTitle: "Website Development", price: 25000, deliveryTime: 10, status: "In Progress" },
    { id: "3", clientName: "Mark Lee", gigTitle: "Social Media Graphics", price: 3000, deliveryTime: 2, status: "Completed" },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateStatus = (status: Order["status"]) => {
    if (selectedOrder) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id ? { ...order, status } : order
        )
      );
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const statusColors = {
    Pending: "bg-yellow-400 text-black",
    "In Progress": "bg-blue-400 text-black",
    Completed: "bg-green-400 text-black",
    Cancelled: "bg-red-400 text-white",
  };

  return (
    <FreelancerLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border-2 border-black p-4 shadow-[10px_10px_0_0_lightblue] bg-white rounded-lg"
              >
                <h2 className="text-lg font-bold">{order.gigTitle}</h2>
                <p className="text-sm text-gray-600">Client: {order.clientName}</p>
                <p className="text-sm font-semibold">₹{order.price}</p>
                <p className="text-sm text-gray-500">
                  Delivery: {order.deliveryTime} days
                </p>
                <Badge className={`${statusColors[order.status]} mt-2`}>
                  {order.status}
                </Badge>
                <Button
                  onClick={() => setSelectedOrder(order)}
                  variant="brutal"
                  className="mt-4 w-full"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="border-2 border-black rounded-lg">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {selectedOrder.gigTitle}
                  </DialogTitle>
                  <p className="text-black">Client: {selectedOrder.clientName}</p>
                </DialogHeader>
                <div className="mt-4 space-y-2">
                  <p><strong>Price:</strong> ₹{selectedOrder.price}</p>
                  <p><strong>Delivery Time:</strong> {selectedOrder.deliveryTime} days</p>
                  <p><strong>Status:</strong> 
                    <Badge className={`${statusColors[selectedOrder.status]} ml-2 p-[3px]`}>
                      {selectedOrder.status}
                    </Badge>
                  </p>
                </div>
                <DialogFooter className="flex gap-2 mt-4">
                  <Button
                    variant="brutal"
                    onClick={() => updateStatus("In Progress")}
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    variant="destructive_green"
                    onClick={() => updateStatus("Completed")}
                  >
                    Mark Completed
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => updateStatus("Cancelled")}
                  >
                    Cancel Order
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </FreelancerLayout>
  );
};

export default Orders;
