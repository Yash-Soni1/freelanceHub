/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/utils/api";
import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Freelancer {
  name: string;
  email: string;
}

interface Gig {
  _id: string;
  title: string;
  description: string;
  price: number;
  deliveryTime: number;
  category: string;
  createdAt: string;
  images: string[];
  freelancer: Freelancer;
}

const CheckoutGig = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/gigs/${id}`)
      .then((res) => setGig(res.data))
      .catch(() => {
        toast.error("Failed to load gig details.");
        navigate("/browse-gigs");
      });
  }, [id, navigate]);

  const handleCheckout = async () => {
    const res = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: gig.title,
        price: gig.price,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Payment failed, try again");
    }
  };

  if (!gig) return <p className="p-6">Loading checkout details...</p>;

  return (
    <ClientLayout>
      <div className="max-w-5xl mx-auto p-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/gig/${id}`)}
          className="mb-6 flex items-center text-sm hover:bg-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Gig
        </Button>

        <h1 className="text-4xl font-extrabold mb-8 text-black border-l-8 border-yellow-400 pl-4">
          Confirm Your Order
        </h1>

        <div className="border-4 border-black rounded-xl p-6 bg-white shadow-[8px_8px_0_0_#333]">
          <div className="flex flex-col lg:flex-row gap-8">
            <img
              src={gig.images?.[0] || "https://placehold.co/400x300?text=No+Image"}
              alt={gig.title}
              className="w-full lg:w-72 h-52 object-cover rounded-lg border-2 border-black transition-transform hover:scale-101"
            />

            <div className="flex-1 text-black">
              <h2 className="text-2xl font-bold mb-2">{gig.title}</h2>
              <p className="text-base text-gray-700 mb-4">{gig.description}</p>

              <div className="text-sm space-y-1 mb-4">
                <p><strong>Freelancer:</strong> {gig.freelancer?.name}</p>
                <p><strong>Category:</strong> {gig.category}</p>
                <p><strong>Delivery Time:</strong> {gig.deliveryTime} days</p>
              </div>

              <div className="bg-yellow-100 border-2 border-black px-4 py-3 rounded-lg inline-block font-bold text-xl shadow-[4px_4px_0_0_#000]">
                Total: ₹{gig.price}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button
              variant="brutal"
              className="w-full text-lg py-5 border-2 border-black bg-green-400 hover:bg-green-500 rounded-xl shadow-[4px_4px_0_0_#000]"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Redirecting to Stripe..." : `Confirm & Pay ₹${gig.price}`}
            </Button>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default CheckoutGig;
