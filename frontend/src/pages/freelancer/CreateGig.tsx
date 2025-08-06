/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import api from "@/utils/api";
import FreelancerLayout from "@/components/layouts/FreelancerLayout";

const CreateGig = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    deliveryTime: "",
    price: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || user.role !== "freelancer") {
      toast.error("Only freelancers can create gigs.");
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post(
        "/gigs",
        {
          ...formData,
          deliveryTime: Number(formData.deliveryTime),
          price: Number(formData.price),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Gig created successfully!");
      navigate("/freelancer-dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gig creation failed");
    }
  };

  return (
    <FreelancerLayout>
    <div className="flex mt-10 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-md border-2 p-6 shadow-[18px_18px_0_0_lightgreen] border-black"
      >
        <h2 className="text-2xl font-semibold">Create a New Gig</h2>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            className="mt-2"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            className="mt-2"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            className="mt-2"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="deliveryTime">Delivery Time (in days)</Label>
          <Input
            id="deliveryTime"
            type="number"
            className="mt-2"
            value={formData.deliveryTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            className="mt-2"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full text-white" variant="destructive_green">
          Post Gig
        </Button>
      </form>
    </div>
    </FreelancerLayout>
  );
};

export default CreateGig;
