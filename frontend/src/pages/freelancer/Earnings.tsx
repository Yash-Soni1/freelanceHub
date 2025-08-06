/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";
import api from "@/utils/api";
import FreelancerLayout from "@/components/layouts/FreelancerLayout";

const Earnings = () => {
  const [earningsData, setEarningsData] = useState<any[]>([]);

  // Mock data for now
  useEffect(() => {
    const mockData = [
      { month: "Jan", earnings: 5000 },
      { month: "Feb", earnings: 8000 },
      { month: "Mar", earnings: 4500 },
      { month: "Apr", earnings: 9000 },
      { month: "May", earnings: 7500 },
      { month: "Jun", earnings: 12000 },
    ];
    setEarningsData(mockData);
  }, []);
  return (
    <FreelancerLayout>
      <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Earnings Overview</h1>

      {/* Total Earnings Card */}
      <Card className="border-2 border-black shadow-[8px_8px_0_0_lightgreen] mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₹50,000</p>
          <p className="text-sm text-gray-500">From all completed orders</p>
        </CardContent>
      </Card>

      {/* Monthly Earnings Graph */}
      <Card className="border-2 border-black shadow-[8px_8px_0_0_lightblue]">
        <CardHeader>
          <CardTitle className="text-lg">Monthly Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#4ade80"
                    strokeWidth={3}
                    dot={{ fill: "green", strokeWidth: 5, r: 3}}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
    </FreelancerLayout>
  );
};

export default Earnings;
