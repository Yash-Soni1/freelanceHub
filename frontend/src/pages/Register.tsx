/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/utils/api";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client", // default role
  });
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/register", formData);
    const { token, user } = res.data;

    // Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Account created!");
    navigate("/dashboard"); // 🔁 redirect here

  } catch (err: any) {
    toast.error(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-sm border-2 p-6 shadow-[18px_18px_0_0_lightgreen] border-black"
      >
        <h2 className="text-2xl font-semibold">Register</h2>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input className="mt-2" id="name" type="text" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input className="mt-2" id="email" type="email" value={formData.email} onChange={handleChange} required />
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

        <div>
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-2 w-full border rounded-sm px-3 py-2 bg-white text-black appearance-none"
          >
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>

        <Button
          type="submit"
          className="w-full text-white border-none shadow-[4px_4px_0_0_black] hover:shadow-lg hover:shadow-green-300 transition-all duration-300"
          variant="destructive_green"
        >
          Create Account
        </Button>
        <p className="text-md text-gray-400">Already have an Account? <span className="text-green-600"><Link to="/login">Login</Link></span></p>
      </form>
    </div>
  );
};

export default Register;
