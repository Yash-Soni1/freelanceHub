/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import FreelancerLayout from "@/components/layouts/FreelancerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import api from "@/utils/api";
import { Star } from "lucide-react";

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // Later replace with API call:
    // const res = await api.get("/reviews/my");
    // setReviews(res.data);

    const mockReviews = [
      {
        id: 1,
        reviewer: "John Doe",
        text: "Amazing work! Delivered on time and exceeded expectations.",
        rating: 5,
        date: "2025-07-28T10:00:00Z",
      },
      {
        id: 2,
        reviewer: "Jane Smith",
        text: "Good work overall, but delivery was a bit late.",
        rating: 4,
        date: "2025-07-25T15:30:00Z",
      },
      {
        id: 3,
        reviewer: "Mike Johnson",
        text: "Excellent communication and quality!",
        rating: 5,
        date: "2025-07-20T12:15:00Z",
      },
    ];
    setReviews(mockReviews);
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} day${days > 1 ? "s" : ""} ago` : "Today";
  };

  return (
    <FreelancerLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Reviews</h1>

        {reviews.length === 0 ? (
          <p className="text-gray-600">You haven’t received any reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="border-2 border-black shadow-[8px_8px_0_0_lightgreen] bg-white"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    {review.reviewer}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-3">{review.text}</p>
                  <p className="text-xs text-gray-500">
                    {formatTimeAgo(review.date)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </FreelancerLayout>
  );
};

export default Reviews;
