import React, { useState, Suspense } from "react";
import { Fade } from "react-reveal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAdmin } from "../../redux/actions/adminActions";
import Loader from "../common/loader";
import Loading from "../common/Loading";
import Logo from "../../assets/logo/nvcti-transparent-no-text.png";

const AdminLoginMain = ({ loginAdmin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setData({ email: "", password: "" });
  };

  const callback = () => {
    setTimeout(() => {
      resetForm();
      setLoading(false);
    }, 2000);
  };

  const checkDisabled = () => {
    if (data.email && data.password) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    loginAdmin(data, callback);
  };

  return (
    <section className="admin-login-div text-center">
      <Suspense fallback={<Loading />}>
        <Fade>
          <form onSubmit={handleSubmit} className="admin-login align-center">
            <img className="mb-4" src={Logo} alt="" width="100" height="auto" />
            <h4 className="h3 mb-3 font-weight-medium">Please Login to Access Dashboard</h4>
            <input type="email" name="email" className="form-control top" placeholder="Email Address" required onChange={handleChange} />
            <input type="password" name="password" className="form-control bottom" placeholder="Password" required onChange={handleChange} />
            <br />
            <button className="btn btn-lg btn-primary btn-block justify-center text-center" type="submit" disabled={!checkDisabled()}>
              {loading ? <Loader variant="light" /> : "Log In"}
            </button>
            <p className="mt-5 mb-3 text-muted">&copy; IIT (ISM) Dhanbad 2020</p>
          </form>
        </Fade>
      </Suspense>
    </section>
  );
};

AdminLoginMain.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
};

export default connect(null, { loginAdmin })(AdminLoginMain);
