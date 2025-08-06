/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/utils/api";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await api.post("/auth/login", formData);
    const { token, user } = res.data;

    login(user, token); 
    toast.success("Logged in successfully!");

    if (user.role === "freelancer") {
      navigate("/freelancer-dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Login failed");
  }
};


useEffect(() => {
  if (user) {
    if (user.role === "freelancer") {
      navigate("/freelancer-dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }
}, [user, navigate]);



  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-sm border-2 p-6 shadow-[18px_18px_0_0_lightblue] border-black"
      >
        <h2 className="text-2xl font-semibold">Login</h2>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            className="mt-2"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            className="mt-2"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full" variant="brutal">
          Login
        </Button>

        <p className="text-md text-gray-400">Don't have an Account? <span className="text-blue-600"><Link to="/register">Register</Link></span></p>
      </form>
    </div>
  );
};

export default Login;
