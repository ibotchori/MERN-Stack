import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";
// React-Toastify allows you to add notifications to your app with ease.
import { toast } from "react-toastify";
// Redirect page
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  // Destructure variables from state
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get data from redux
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // show notification in error case
    if (isError) {
      toast.error(message);
    }
    // redirect
    if (isSuccess || user) {
      navigate("/");
    }
    // reset the global state
    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    // Update state by target name
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // login the user, all data comes from the form
    const userData = {
      email,
      password,
    };
    // dispatch login function (from authSlice) and pass the user data
    dispatch(login(userData));
  };

  // show spinner when loading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
          <p>Login and start setting goals</p>
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
