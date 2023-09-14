import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default/Dashboard";

// Icon Imports
import {
  MdHome,
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
];
export default routes;
