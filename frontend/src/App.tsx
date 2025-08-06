import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

//components
import Navbar from "@/components/Navbar";

//Auth Routes
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

//Freelancer Routes
import CreateGig from "@/pages/freelancer/CreateGig";
import FreelancerDashboard from "@/pages/freelancer/FreelancerDashboard";
import Orders from "@/pages/freelancer/Orders";
import Messages from "@/pages/freelancer/Messages";
import Reviews from "@/pages/freelancer/Reviews";
import Earnings from "@/pages/freelancer/Earnings";
import Settings from "@/pages/freelancer/Settings";

//Client Routes
import Dashboard from "@/pages/client/Dashboard";
import BrowseGigs from "@/pages/client/BrowseGigs";
import GigDetails from "@/pages/client/GigDetails";
import ClientSettings from "@/pages/client/ClientSettings";
import ClientMessages from "@/pages/client/ClientMessages";
import ClientOrders from "@/pages/client/ClientOrders";
import ClientReviews from "@/pages/client/ClientReviews";
import CheckoutGig from "@/pages/CheckoutGig";
import PaymentSuccess from "./pages/PaymentSuccess";

function AppWrapper() {
  const location = useLocation();

  const navbarPaths = ["/", "/login", "/register"];
  const shouldShowNavbar = navbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        {/** Auth Routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/**Freelancer Routes */}
        <Route path="/create-gig" element={<CreateGig />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/freelancer-dashboard/orders" element={<Orders />} />
        <Route path="/freelancer-dashboard/messages" element={<Messages />} />
        <Route path="/freelancer-dashboard/reviews" element={<Reviews />} />
        <Route path="/freelancer-dashboard/earnings" element={<Earnings />} />
        <Route path="/freelancer-dashboard/settings" element={<Settings />} />
        
        {/**Client Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/browse-gigs" element={<BrowseGigs />} />
        <Route path="/gig/:id" element={<GigDetails />} />
        <Route path="/dashboard/settings" element={<ClientSettings />} />
        <Route path="/dashboard/messages" element={<ClientMessages />} />
        <Route path="/dashboard/orders" element={<ClientOrders />} />
        <Route path="/dashboard/reviews" element={<ClientReviews />} />
        <Route path="/gig/:id/checkout" element={<CheckoutGig />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
