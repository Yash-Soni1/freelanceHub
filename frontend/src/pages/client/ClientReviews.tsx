import ClientLayout from "@/components/layouts/ClientLayout";
import { useState } from "react";

const ClientReviews = () => {
  const [reviews] = useState([
    { id: 1, gigTitle: "Logo Design", rating: 5, review: "Amazing work! Highly recommended.", date: "2025-07-30" },
    { id: 2, gigTitle: "Website Development", rating: 4, review: "Great job, but a little delay.", date: "2025-07-25" },
    { id: 3, gigTitle: "SEO Optimization", rating: 5, review: "Traffic improved significantly!", date: "2025-07-20" },
  ]);

  return (
    <ClientLayout>
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600">You haven't written any reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="border-2 border-black p-4 rounded-lg shadow-[6px_6px_0px_orange] bg-white">
              <h4 className="font-bold mb-1">{rev.gigTitle}</h4>
              <p className="text-yellow-500 mb-1">{"★".repeat(rev.rating)}</p>
              <p className="text-sm text-gray-700 mb-2">{rev.review}</p>
              <p className="text-xs text-gray-500">Reviewed on {rev.date}</p>
            </div>
          ))}
        </div>
      )}
    </ClientLayout>
  );
};

export default ClientReviews;
