/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Star component for testimonials
const StarRating = ({ count = 5 }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-yellow-400 text-xl">★</span>
    ))}
  </div>
);

// CountUp animation for stats
const CountUpOnView = ({ target }: { target: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = target;
      if (start === end) return;
      let totalDuration = 2000;
      let incrementTime = 20;
      let increment = end / (totalDuration / incrementTime);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, incrementTime);
    }
  }, [inView, target]);

  return <span ref={ref}>{count}</span>;
};

const Home = () => {
  const [gigs, setGigs] = useState<any[]>([]);
  const placeholderImage = "https://placehold.co/400x300?text=No+Image";

  useEffect(() => {
  axios.get("http://localhost:5000/api/gigs")
    .then(res => {
      console.log("📦 API Response from backend:", res.data);
      if (Array.isArray(res.data)) {
        setGigs(res.data);
      } else if (Array.isArray(res.data.gigs)) {
        setGigs(res.data.gigs);
      } else {
        setGigs([]);
      }
    })
    .catch(err => {
      console.error("❌ Error fetching gigs:", err);
      setGigs([]);
    });
}, []);


  return (
    <div className="pt-20">

      {/* HERO */}
      <section
        className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center gap-8 text-white bg-gradient-to-r from-blue-800 via-purple-700 to-red-600 animate-gradient bg-[length:400%_400%] px-6"
      >
        {/* Blobs */}
        <div className="absolute -top-20 -left-20 w-[36rem] h-[36rem] bg-pink-400 opacity-10 rounded-full animate-blob-diagonal"></div>
        <div className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] bg-blue-400 opacity-10 rounded-full animate-blob-updown"></div>
        <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-yellow-400 opacity-10 rounded-full animate-blob-leftright"></div>
        {/* <div className="absolute top-2/3 right-1/3 w-[24rem] h-[24rem] bg-purple-400 opacity-10 rounded-full animate-blob-updown animation-delay-6000"></div>
        <div className="absolute top-10 left-1/2 w-[20rem] h-[20rem] bg-red-400 opacity-10 rounded-full animate-blob-leftright animation-delay-3000"></div>
        <div className="absolute bottom-10 right-1/2 w-[22rem] h-[22rem] bg-green-400 opacity-10 rounded-full animate-blob-diagonal animation-delay-5000"></div> */}

        <h1 className="text-6xl md:text-7xl font-bold drop-shadow-lg z-10 text-center">
          Welcome to FreelanceHub
        </h1>
        <p className="text-center max-w-2xl opacity-90 z-10 text-lg md:text-xl">
          Connect with talented freelancers or find amazing gigs in minutes.
        </p>
        <Button variant="default">
          Explore Gigs
        </Button>

        <style>
          {`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient { animation: gradient 6s ease-in-out infinite; }
            @keyframes blob-updown {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-60px) scale(1.1); }
            }
            .animate-blob-updown { animation: blob-updown 10s ease-in-out infinite; }
            @keyframes blob-leftright {
              0%, 100% { transform: translateX(0) scale(1); }
              50% { transform: translateX(60px) scale(1.1); }
            }
            .animate-blob-leftright { animation: blob-leftright 12s ease-in-out infinite; }
            @keyframes blob-diagonal {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(60px, -60px) scale(1.1); }
            }
            .animate-blob-diagonal { animation: blob-diagonal 14s ease-in-out infinite; }
            .animation-delay-2000 { animation-delay: 2s; }
            .animation-delay-3000 { animation-delay: 3s; }
            .animation-delay-4000 { animation-delay: 4s; }
            .animation-delay-5000 { animation-delay: 5s; }
            .animation-delay-6000 { animation-delay: 6s; }
          `}
        </style>
      </section>

      {/* FEATURES */}
      <section className="py-24 text-center bg-gradient-to-b from-orange-300 to-blue-300">
        <h2 className="text-4xl font-bold mb-12">Why Choose FreelanceHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
          {[
            { title: "Fast & Easy", desc: "Find gigs or freelancers in minutes.", color: "shadow-[6px_6px_0px_#f472b6]" },
            { title: "Trusted Network", desc: "Work with verified professionals.", color: "shadow-[6px_6px_0px_#60a5fa]" },
            { title: "Secure Payments", desc: "Safe and secure transactions.", color: "shadow-[6px_6px_0px_#facc15]" },
          ].map((f, i) => (
            <Card key={i} className={`border-2 border-black p-10 text-left ${f.color}`}>
              <CardHeader>
                <CardTitle className="text-2xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-lg">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURED GIGS GRID */}
      <section className="py-24 bg-gradient-to-b from-blue-300 to-red-300">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Gigs</h2>
        {gigs.length > 0 ? (
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {gigs.map((gig) => (
              <motion.div
                key={gig._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2 border-black p-4 text-center shadow-[6px_6px_0px_#a78bfa]">
                  <img
                    src={gig.images && gig.images.length > 0 ? gig.images[0] : placeholderImage}
                    alt={gig.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <CardHeader>
                    <CardTitle>{gig.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{gig.freelancer?.name || "Unknown Freelancer"}</p>
                    <p className="font-bold mb-2">₹ {gig.price}</p>
                    <Badge variant="brutal">{gig.deliveryTime} Days Delivery</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No gigs found.</p>
        )}
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-b from-red-300 to-green-300">
        <h2 className="text-4xl font-bold mb-12 text-center">What Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
          {[
            { name: "Alice", review: "Amazing experience! Delivered on time." },
            { name: "Bob", review: "Very professional and great quality." },
            { name: "Charlie", review: "Exceeded my expectations!" },
          ].map((t, i) => (
            <Card key={i} className="border-2 border-black p-10 shadow-[6px_6px_0px_#f87171]">
              <CardHeader>
                <CardTitle className="text-xl">{t.name}</CardTitle>
                <StarRating />
              </CardHeader>
              <CardContent className="text-lg">{t.review}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 text-center bg-gradient-to-b from-green-300 via-green-300 to-black">
        <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
        <div className="flex justify-center gap-12 flex-wrap text-3xl font-bold">
          <Badge className="border-2 border-black shadow-[4px_4px_0px_#f472b6] p-6">
            <CountUpOnView target={10000} />+ Gigs Posted
          </Badge>
          <Badge className="border-2 border-black shadow-[4px_4px_0px_#60a5fa] p-6">
            <CountUpOnView target={5000} />+ Freelancers
          </Badge>
          <Badge className="border-2 border-black shadow-[4px_4px_0px_#facc15] p-6">
            <CountUpOnView target={98} />% Satisfaction
          </Badge>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">FreelanceHub</h3>
            <p className="opacity-80">
              Connecting clients with talented freelancers worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/gigs" className="hover:underline">Browse Gigs</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="opacity-80 mb-4">Get updates and offers directly to your inbox.</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="bg-white text-black border-2 border-black" />
              <Button className="bg-white text-black border-2 border-black hover:bg-gray-200">Subscribe</Button>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm opacity-60">© {new Date().getFullYear()} FreelanceHub. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Home;
