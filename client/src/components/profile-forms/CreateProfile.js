
import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {
    phonenumber: '',
    bio: '',
    location: '',
    skill: ''
};


const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingProfile = useMatch('/create-profile');

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      // set local state with the profileData
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    user,
    dateregistered,
    phonenumber,
    bio,
    location,
    skill
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">
        {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        {creatingProfile
          ? ` Let's get some information to make your`
          : ' Add some changes to your profile'}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={skill} onChange={onChange}>
            <option value="1.0 UTR"> 1.0 UTR</option>
            <option value="1.5 UTR">1.5 UTR</option>
            <option value="2.0 UTR">2.0 UTR</option>
            <option value="2.5 UTR">2.5 UTR</option>
            <option value="3.0 UTR">3.0 UTR</option>
            <option value="3.5 UTR">3.5 UTR</option>
            <option value="4.0 UTR">4.0 UTR</option>
            <option value="4.5 UTR">4.5 UTR</option>
            <option value="5.0 UTR">5.0 UTR</option>
            <option value="5.5 UTR and over">5.5 UTR and over</option>
          </select>
          <small className="form-text">
            Give us an idea of your tennis level.
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself."
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself. Make sure to include what time, day's of the week, and courts work best.</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone Number"
            name="phonenumber"
            value={phonenumber}
            onChange={onChange}
          />
          <small className="form-text">
            Enter your 10-digit phone number (eg. 123-456-7890)
          </small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);