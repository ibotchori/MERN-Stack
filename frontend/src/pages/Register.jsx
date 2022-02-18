import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
// React-Toastify allows you to add notifications to your app with ease.
import { toast } from "react-toastify";
// Redirect page
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  // Destructure variables from state
  const { name, email, password, password2 } = formData;

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
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Check password
    if (password !== password2) {
      // show notification
      toast.error("Password do not match!");
      // register the user
    } else {
      // all data comes from the form
      const userData = {
        name,
        email,
        password,
      };
      // dispatch register function (from authSlice) and pass the user data
      dispatch(register(userData));
    }
  };

  // show spinner when loading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
          <p>Please create an account</p>
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
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

export default Register;
