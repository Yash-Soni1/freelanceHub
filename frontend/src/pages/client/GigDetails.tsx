/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft } from "lucide-react";
import ClientLayout from "@/components/layouts/ClientLayout";

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState<any>(null);

  useEffect(() => {
    api.get(`/gigs/${id}`)
      .then((res) => setGig(res.data))
      .catch(() => {
        toast.error("Failed to fetch gig.");
        navigate("/browse-gigs");
      });
  }, [id, navigate]);

  if (!gig) return <p className="p-6">Loading gig details...</p>;

  return (
    <ClientLayout>
      <Button
        variant="outline"
        onClick={() => navigate("/browse-gigs")}
        className="mb-6 flex items-center text-sm text-blue-600 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Browse
      </Button>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Left */}
        <div className="flex-1 border-2 border-black rounded-lg p-6 shadow-[10px_10px_0_0_gray] bg-white">
          <img
            src={gig.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
            alt={gig.title}
            className="w-full h-48 object-cover mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{gig.title}</h1>
          <p className="text-gray-700 mb-4">{gig.description}</p>
          <div className="space-y-1 mb-4">
            <p><strong>Price:</strong> ₹{gig.price}</p>
            <p><strong>Delivery Time:</strong> {gig.deliveryTime} days</p>
            <p><strong>Category:</strong> {gig.category}</p>
            <p>
              <strong>Posted:</strong> {formatDistanceToNow(new Date(gig.createdAt))} ago
            </p>
          </div>
          <p className="text-sm text-gray-600">
            <strong>Freelancer:</strong> {gig.freelancer?.name} ({gig.freelancer?.email})
          </p>
        </div>

        {/* Right */}
        <div className="w-full lg:w-[350px] border-2 border-black rounded-lg p-6 shadow-[10px_10px_0_0_lightgreen] bg-white">
          <h2 className="text-xl font-bold mb-4">Hire this Freelancer</h2>
          <p className="mb-4 text-sm text-gray-600">
            You're about to hire <strong>{gig.freelancer?.name}</strong> for ₹{gig.price} with{" "}
            {gig.deliveryTime} days delivery.
          </p>
          <Button className="w-full cursor-pointer" variant="brutal"
            onClick={() => navigate(`/gig/${gig._id}/checkout`)}>
            Proceed to Hire
          </Button>
        </div>
      </div>
    </ClientLayout>
  );
};

export default GigDetails;
