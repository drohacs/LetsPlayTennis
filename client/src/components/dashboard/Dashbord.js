import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

const Dashbord = (getCurrentProfile, auth, profile) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return <div>Dashbord</div>;
};

dashbord.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default dashbord(mapStateToProps, { getCurrentProfile })(Dashboard);
