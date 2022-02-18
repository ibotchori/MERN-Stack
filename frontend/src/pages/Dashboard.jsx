import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  // get user from global state
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // if user not logged in, navigate to login page
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <div>Dashboard</div>;
};

export default Dashboard;
