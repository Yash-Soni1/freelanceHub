/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/utils/api";
import { toast } from "sonner";
import FreelancerSidebar from "../../components/FreelancerSidebar";

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const [gigs, setGigs] = useState<any[]>([]);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const token = localStorage.getItem("token");

  const [editingGig, setEditingGig] = useState<any | null>(null);
  const [deletingGig, setDeletingGig] = useState<any | null>(null);
  const [confirmTitle, setConfirmTitle] = useState("");

  useEffect(() => {
    if (!user || user.role !== "freelancer") {
      toast.error("Access denied. Freelancers only.");
      navigate("/");
      return;
    }

    const fetchGigs = async () => {
      try {
        const res = await api.get("/gigs/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGigs(res.data);
      } catch (err) {
        toast.error("Failed to load your gigs.");
      }
    };

    fetchGigs();
  }, [navigate]);

  const handleDelete = async (gigId: string) => {
    try {
      await api.delete(`/gigs/${gigId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Gig deleted!");
      setGigs((prev) => prev.filter((gig) => gig._id !== gigId));
      setDeletingGig(null);
      setConfirmTitle("");
    } catch (err) {
      toast.error("Failed to delete gig.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGig) return;

    try {
      await api.put(`/gigs/${editingGig._id}`, editingGig, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Gig updated successfully!");
      setGigs((prev) =>
        prev.map((gig) => (gig._id === editingGig._id ? editingGig : gig))
      );
      setEditingGig(null);
    } catch (err) {
      toast.error("Failed to update gig.");
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editingGig) return;
    setEditingGig({ ...editingGig, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex">
      <FreelancerSidebar />
      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        {/* Gigs Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Gigs</h2>
        </div>

        {/* Gigs List */}
        {gigs.length === 0 ? (
          <p className="text-gray-600">You haven't created any gigs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="border-2 border-black p-4 shadow-[10px_10px_0_0_lightgreen]"
              >
                <div className="w-full h-32 bg-gray-100 mb-2 flex items-center justify-center text-gray-400">
                  Image Placeholder
                </div>

                <h2 className="text-xl font-bold">{gig.title}</h2>
                <p className="mt-2 text-sm">
                  {gig.description.length > 100
                    ? gig.description.slice(0, 100) + "..."
                    : gig.description}
                </p>
                <p className="mt-2 font-semibold">₹{gig.price}</p>
                <p className="text-sm text-gray-500">
                  Delivery: {gig.deliveryTime} days
                </p>
                <p className="text-sm text-gray-500">Category: {gig.category}</p>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="destructive_green"
                    onClick={() => setEditingGig(gig)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="text-white"
                    onClick={() => {
                      setDeletingGig(gig);
                      setConfirmTitle("");
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <AnimatePresence>
          {editingGig && (
            <motion.div
              key="editModal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 bg-opacity-30 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 border-2 border-black rounded-lg shadow-lg w-full max-w-lg relative">
                <h2 className="text-xl font-bold mb-4">Edit Gig</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="font-semibold">Title</label>
                    <Input
                      name="title"
                      value={editingGig.title}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Description</label>
                    <Textarea
                      name="description"
                      value={editingGig.description}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="font-semibold">Price</label>
                      <Input
                        type="number"
                        name="price"
                        value={editingGig.price}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="font-semibold">Delivery Time</label>
                      <Input
                        type="number"
                        name="deliveryTime"
                        value={editingGig.deliveryTime}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-semibold">Category</label>
                    <Input
                      name="category"
                      value={editingGig.category}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="destructive"
                      className="text-white"
                      onClick={() => setEditingGig(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="brutal">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Modal */}
        <AnimatePresence>
          {deletingGig && (
            <motion.div
              key="deleteModal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 bg-opacity-30 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 border-2 border-black rounded-lg shadow-lg w-full max-w-sm relative">
                <h2 className="text-lg font-semibold mb-3 text-red-600">
                  Confirm Deletion
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  Type <strong>{deletingGig.title}</strong> to confirm deletion.
                </p>
                <Input
                  type="text"
                  value={confirmTitle}
                  onChange={(e) => setConfirmTitle(e.target.value)}
                  placeholder="Enter gig title"
                  className="mb-4"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDeletingGig(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    disabled={confirmTitle !== deletingGig.title}
                    onClick={() => handleDelete(deletingGig._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default FreelancerDashboard;
