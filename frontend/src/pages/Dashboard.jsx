import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get user from global state
  const { user } = useSelector((state) => state.auth);

  // get user goals and data from global state
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    // if user not logged in, navigate to login page
    if (!user) {
      navigate("/login");
    }
    // dispatch getGoals function from goalSlice
    dispatch(getGoals());
    return () => {
      // reset global state
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  // show spinner when loading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name} </h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
    </>
  );
};

export default Dashboard;
