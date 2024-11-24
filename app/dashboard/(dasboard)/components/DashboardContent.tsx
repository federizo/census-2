"use client";
import React from "react";
import Card from "./Card";
import QuickDraftForm from "./QuickDraftForm";
import { useTheme } from "next-themes";

const DashboardContent: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8 w-full h-full">
      <div className={`${theme === "light" ? "text-gray-800" : "text-white"}`}>
        <h1 className="text-3xl font-bold mb-4">Welcome to PB Census!</h1>
        <p>We've assembled some links to get you started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="At a glance" >
          <p>16 posts, 13 pages</p>
          <button className="mt-2 text-blue-500 underline">
            Update to 5.8
          </button>
        </Card>
        <Card title="WooCommerce Set up">
          <p>Snap 1 of 6</p>
        </Card>
        <Card title="Quick draft">
          <QuickDraftForm />
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
