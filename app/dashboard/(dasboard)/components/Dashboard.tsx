import React from "react";
import { Card } from "@/components/ui/card";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full ">


        {/* Responsive Grid for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Welcome Card */}
          <Card title="Welcome to PB Census!">
            <p>We’ve assembled some links to get you started</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
              Customize Your Site
            </button>
            <p className="mt-2 text-sm text-blue-500 underline cursor-pointer">
              Change your theme completely
            </p>
          </Card>

          {/* At a Glance Card */}
          <Card title="At a glance">
            <div className="text-white">
              <p>16 posts</p>
              <p>13 pages</p>
              <p className="text-sm text-white">
                PB Census 5.7.2 running{" "}
                <span className="text-blue-500 underline">storefront</span>{" "}
                theme
              </p>
              <button className="mt-2 px-3 py-1 bg-blue-100 text-blue-500 rounded-lg text-sm">
                Update to 5.8
              </button>
            </div>
          </Card>

          {/* WooCommerce Setup Card */}
          <Card title="WooCommerce Setup">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">
              Snap 1 of 6
            </button>
          </Card>

          {/* Quick Draft Card */}
          <Card title="Quick Draft">
            <form className="space-y-2">
              <input
                type="text"
                placeholder="Title"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="What’s on your mind?"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded"
              >
                Save Draft
              </button>
            </form>
          </Card>

          {/* Other Example Cards */}
          <Card title="Recent Activities">
            <ul className="list-disc list-inside text-gray-700">
              <li>Edited page "About Us"</li>
              <li>New comment on "Blog Post 1"</li>
              <li>Updated WooCommerce settings</li>
            </ul>
          </Card>

          <Card title="Statistics">
            <div className="text-gray-700">
              <p>Visitors Today: 250</p>
              <p>Page Views: 3,400</p>
              <p>Conversions: 32</p>
            </div>
          </Card>
        </div>
      </div>
  );
};

export default DashboardLayout;
