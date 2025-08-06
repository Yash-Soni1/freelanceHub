import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/utils/api";
import { useNavigate } from "react-router-dom";
import ClientLayout from "@/components/layouts/ClientLayout";
import { Input } from "@/components/ui/input";

const BrowseGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const placeholderImage = "https://placehold.co/400x300?text=No+Image";

  useEffect(() => {
    api.get("/gigs")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setGigs(res.data);
        }
      })
      .catch(() => console.error("Failed to load gigs"));
  }, []);

  const filteredGigs = gigs.filter((gig) => {
    const search = searchTerm.toLowerCase();
    return (
      gig.title?.toLowerCase().includes(search) ||
      gig.category?.toLowerCase().includes(search) ||
      gig.description?.toLowerCase().includes(search)
    );
  });

  return (
    <ClientLayout>
      <h1 className="text-3xl font-bold mb-4">Browse Gigs</h1>

      {/* Smart Search Input */}
      <Input
        placeholder="Search by title, category, or keyword like 'Python'..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 border-2 border-black shadow-[4px_4px_0px_gray] w-full max-w-md"
      />

      {filteredGigs.length === 0 ? (
        <p>No gigs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => (
            <div
              key={gig._id}
              className="border-2 border-black p-4 shadow-[6px_6px_0px_gray] bg-white"
            >
              <img
                src={gig.images?.[0] || placeholderImage}
                alt={gig.title}
                className="w-full h-40 object-cover mb-3"
              />
              <h2 className="text-lg font-bold">{gig.title}</h2>
              <p className="text-gray-600 text-sm mb-1">
                {gig.category}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                {gig.freelancer?.name}
              </p>
              <p className="font-bold">₹{gig.price}</p>
              <Button
                variant="brutal"
                className="mt-3 w-full"
                onClick={() => navigate(`/gig/${gig._id}`)}
              >
                View Gig
              </Button>
            </div>
          ))}
        </div>
      )}
    </ClientLayout>
  );
};

export default BrowseGigs;
