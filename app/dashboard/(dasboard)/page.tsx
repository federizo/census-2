import React from "react";
import DashboardLayout from "./components/Dashboard";
import DashboardContent from "./components/DashboardContent";

export default function Dashboard() {
  return (
    <div className="space-y-5 w-full px-3">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </div>
  );
}
