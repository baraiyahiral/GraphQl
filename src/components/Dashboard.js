import React from "react";
import RequireAuth from "./requireAuth";

const Dashboard = () => {
  return (
    <div className="w-100 h-100 bg-light d-flex justify-content-center align-items-center">
      Dashboard
    </div>
  );
};

export default RequireAuth(Dashboard);
