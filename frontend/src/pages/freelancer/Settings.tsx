/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import FreelancerLayout from "@/components/layouts/FreelancerLayout";

const Settings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [username, setUsername] = useState(user?.name || "");
  const [confirmPasswordForUsername, setConfirmPasswordForUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState("");
  const [gigCount, setGigCount] = useState(0);

  // Fetch total gigs created
  useEffect(() => {
    const fetchGigCount = async () => {
      try {
        const res = await api.get("/gigs/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGigCount(res.data.length);
      } catch {
        console.error("Failed to fetch gig count");
      }
    };
    fetchGigCount();
  }, [token]);

  // Change Username
  const handleUsernameChange = async () => {
    if (!confirmPasswordForUsername) {
      toast.error("Please confirm your password");
      return;
    }
    try {
      await api.put(
        "/auth/update-username",
        { name: username, password: confirmPasswordForUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Username updated!");
      localStorage.setItem("user", JSON.stringify({ ...user, name: username }));
      setConfirmPasswordForUsername("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update username");
    }
  };

  // Change Password
  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await api.put(
        "/auth/update-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password updated!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/auth/delete-account`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Account deleted!");
      localStorage.clear();
      navigate("/register");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <FreelancerLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-4xl font-bold mb-6">Change Credentials</h1>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Profile Overview */}
          <div className="border-2 border-black p-6 rounded-lg shadow-[8px_8px_0_0_lightblue] bg-white">
            <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
            <p className="mb-1"><strong>Name:</strong> {user?.name}</p>
            <p className="mb-1"><strong>Email:</strong> {user?.email}</p>
            <p className="mb-1"><strong>Role:</strong> {user?.role}</p>
            <p className="mb-1"><strong>Total Gigs:</strong> {gigCount}</p>
          </div>

          {/* Update Username */}
          <div className="border-2 border-black p-6 rounded-lg shadow-[8px_8px_0_0_lightgreen] bg-white">
            <h2 className="text-xl font-semibold mb-4">Change Username</h2>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="New Username"
              className="mb-2"
            />
            <Input
              type="password"
              value={confirmPasswordForUsername}
              onChange={(e) => setConfirmPasswordForUsername(e.target.value)}
              placeholder="Confirm Password"
              className="mb-2"
            />
            <Button variant="brutal" onClick={handleUsernameChange} className="w-full">
              Update Username
            </Button>
          </div>

          {/* Update Password */}
          <div className="border-2 border-black p-6 rounded-lg shadow-[8px_8px_0_0_orange] bg-white">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Current Password"
              className="mb-2"
            />
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="mb-2"
            />
            <Input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="mb-2"
            />
            <Button variant="brutal" onClick={handlePasswordChange} className="w-full">
              Update Password
            </Button>
          </div>
          {/* Delete Account Full Row */}
        <div className="border-2 border-black p-4 rounded-lg shadow-[6px_6px_0_0_red] bg-white max-w-3xl">
          <h2 className="text-lg font-semibold mb-3 text-red-600">Delete Account</h2>
          <p className="text-sm mb-2 text-gray-700">
            Type <strong>{user?.name}</strong> to confirm deletion.
          </p>
          <div className="flex gap-2">
            <Input
              value={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.value)}
              placeholder="Enter username"
            />
            <Button
              variant="destructive"
              disabled={confirmDelete !== user?.name}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default Settings;
