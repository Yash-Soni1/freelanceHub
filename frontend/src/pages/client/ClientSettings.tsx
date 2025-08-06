import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ClientLayout from "@/components/layouts/ClientLayout";

const ClientSettings = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Local state for UI placeholders
  const [username, setUsername] = useState(user?.name || "");
  const [confirmPasswordForUsername, setConfirmPasswordForUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState("");

  const totalOrders = 12; // placeholder
  const savedGigs = 5; // placeholder

  return (
    <ClientLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-4xl font-bold mb-6">Settings & Profile</h1>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Profile Overview */}
          <div className="border-2 border-black p-6 rounded-lg shadow-[8px_8px_0_0_lightblue] bg-white">
            <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
            <p className="mb-1"><strong>Name:</strong> {user?.name}</p>
            <p className="mb-1"><strong>Email:</strong> {user?.email}</p>
            <p className="mb-1"><strong>Role:</strong> {user?.role}</p>
            <p className="mb-1"><strong>Total Orders:</strong> {totalOrders}</p>
            <p className="mb-1"><strong>Saved Gigs:</strong> {savedGigs}</p>
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
            <Button variant="destructive_green" className="w-full border-none text-white">
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
            <Button variant="brutal" className="w-full bg-orange-400 hover:shadow-orange-300">
              Update Password
            </Button>
          </div>
           {/* Delete Account */}
            <div className="border-2 border-black p-6 rounded-lg shadow-[6px_6px_0_0_red] bg-white max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-red-600">Delete Account</h2>
                <p className="text-base mb-4 text-gray-700">
                    Type <strong>{user?.name}</strong> to confirm deletion of your account. 
                    This action <span className="font-bold text-red-600">cannot</span> be undone.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                    value={confirmDelete}
                    onChange={(e) => setConfirmDelete(e.target.value)}
                    placeholder="Enter username"
                    className="flex-1 text-lg py-3"
                    />
                    <Button
                    variant="destructive"
                    disabled={confirmDelete !== user?.name}
                    className="text-lg px-6 py-3 font-bold"
                    >
                    Delete Account
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientSettings;
