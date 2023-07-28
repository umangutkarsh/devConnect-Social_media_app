import React, { useEffect, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';


const initialState = {
   company: '',
   website: '',
   location: '',
   status: '',
   skills: '',
   githubusername: '',
   bio: '',
   twitter: '',
   facebook: '',
   linkedin: '',
   youtube: '',
   instagram: ''
};

const ProfileForm = ({ createProfile, getCurrentProfile, profile: { profile, loading } }) => {
   
   const [formData, setFormData] = useState(initialState);

   const creatingProfile = useMatch('/create-profile');

   const [socialInputs, toggleSocialInputs] = useState(false);

   const navigate = useNavigate();

   useEffect(() => {
      if (!profile) {
         getCurrentProfile();
      }

      if (!loading && profile) {
         const profileData = { ...initialState };

         for (const key in profile) {
            if (key in profileData) {
               profileData[key] = profile[key];
            }
         }

         for (const key in profile.social) {
            if (key in profileData) {
               profileData[key] = profile.social[key];
            }
         }

         if (Array.isArray(profileData.skills)) {
            profileData.skills = profileData.skills.join(', ');
         }
         setFormData(profileData);
      }
   }, [getCurrentProfile, loading, profile]);

   const {
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
   } = formData;

   const inputHandler = event => {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value
      });
   };

   const formSubmitHandler = event => {
      const editing = profile ? true : false;
      event.preventDefault();
      createProfile(formData, editing).then(() => {
         if (!editing) {
            navigate('/dashboard');
         }
      });
   };


   return ( 
      <section className='container'>
         <h1 className="large text-primary">
            {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
         </h1>
         <p className="lead">
            <i className="fas fa-user" /> 
               {createProfile ? 
                  'Add some information to make your profike stand out' 
                  : 'Make some changes to your profile'
               }
         </p>
         <small>* = required field</small>
         <form className="form" onSubmit={formSubmitHandler}>
            <div className="form-group">
               <select name="status" value={status} onChange={inputHandler}>
                  <option value="0">* Select Professional Status</option>
                  <option value="Developer">Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Student or Learning">Student or Learning</option>
                  <option value="Instructor">Instructor or Teacher</option>
                  <option value="Intern">Intern</option>
                  <option value="Other">Other</option>
               </select>
               <small className="form-text">
                  Give us an idea of where you are at in your career
               </small>
            </div>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="Company" 
                  name="company" 
                  value={company} 
                  onChange={inputHandler} 
               />
               <small className="form-text">
                  Could be your own company or one you work for
               </small>
            </div>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="Website" 
                  name="website"
                  value={website}
                  onChange={inputHandler} 
               />
               <small className="form-text">
                  Could be your own or a company website
               </small>
            </div>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="Location" 
                  name="location"
                  value={location}
                  onChange={inputHandler} 
               />
               <small className="form-text">
                  City & state suggested (eg. Boston, MA)
               </small>
            </div>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="* Skills" 
                  name="skills"
                  value={skills}
                  onChange={inputHandler} 
               />
               <small className="form-text">
                  Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
               </small>
            </div>
            <div className="form-group">
               <input
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={inputHandler}
               />
               <small className="form-text">
                  If you want your latest repos and a Github link, include your username
               </small>
            </div>
            <div className="form-group">
               <textarea 
                  placeholder="A short bio of yourself" 
                  name="bio"
                  value={bio}
                  onChange={inputHandler} 
               />
               <small className="form-text">Tell us a little about yourself</small>
            </div>

            <div className="my-2">
               <button 
                  onClick={() => toggleSocialInputs(!socialInputs)} 
                  type="button" 
                  className="btn btn-light"
               >
                  Add Social Network Links
               </button>
               <span>Optional</span>
            </div>

            {socialInputs && (
               <React.Fragment>
                  <div className="form-group social-input">
                     <i className="fab fa-twitter fa-2x"></i>
                     <input 
                        type="text" 
                        placeholder="Twitter URL" 
                        name="twitter"
                        value={twitter}
                        onChange={inputHandler} 
                     />
                  </div>

                  <div className="form-group social-input">
                     <i className="fab fa-facebook fa-2x"></i>
                     <input 
                        type="text" 
                        placeholder="Facebook URL" 
                        name="facebook"
                        value={facebook}
                        onChange={inputHandler} 
                     />
                  </div>

                  <div className="form-group social-input">
                     <i className="fab fa-youtube fa-2x"></i>
                     <input 
                        type="text" 
                        placeholder="YouTube URL" 
                        name="youtube"
                        value={youtube}
                        onChange={inputHandler} 
                     />
                  </div>

                  <div className="form-group social-input">
                     <i className="fab fa-linkedin fa-2x"></i>
                     <input 
                        type="text" 
                        placeholder="Linkedin URL" 
                        name="linkedin"
                        value={linkedin}
                        onChange={inputHandler} 
                     />
                  </div>

                  <div className="form-group social-input">
                     <i className="fab fa-instagram fa-2x"></i>
                     <input 
                        type="text" 
                        placeholder="Instagram URL" 
                        name="instagram" 
                        value={instagram} 
                        onChange={inputHandler} 
                     />
                  </div>
               </React.Fragment>
            )}
      
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

const mapStateToProps = state => ({
   profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(ProfileForm);