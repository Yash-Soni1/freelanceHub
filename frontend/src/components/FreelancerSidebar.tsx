import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FreelancerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { path: "/freelancer-dashboard", label: "Overview" },
    { path: "/create-gig", label: "Create Gig" },
    { path: "/freelancer-dashboard/orders", label: "Orders" },
    { path: "/freelancer-dashboard/messages", label: "Messages" },
    { path: "/freelancer-dashboard/reviews", label: "Reviews" },
    { path: "/freelancer-dashboard/earnings", label: "Earnings" },
    { path: "/freelancer-dashboard/settings", label: "Settings & Profile" },
  ];

  return (
    <aside className="w-64 min-h-screen border-r-2 border-black p-4 fixed left-0 top-0 bg-blue-100 z-40">
      <h2 className="text-2xl font-bold mb-6">Freelancer Panel</h2>
      <nav className="space-y-2 flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link to={item.path} key={item.path}>
              <Button
                variant={`${isActive ? "secondary" : "brutal"}`}
                className={`w-full justify-start border-2 border-black transition-all duration-200 relative
                  ${isActive 
                    ? "" 
                    : "bg-blue-500 hover:bg-blue-400"
                  }
                `}
              >
                {item.label}
              </Button>
            </Link>
          );
        })}

        <Button
          variant="destructive"
          className="w-full justify-start mt-4 text-white"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </nav>
    </aside>
  );
};

export default FreelancerSidebar;
