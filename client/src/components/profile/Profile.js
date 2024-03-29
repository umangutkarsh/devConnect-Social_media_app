import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';


const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {

   const { user_id: id } = useParams();

   useEffect(() => {
      getProfileById(id);
   }, [getProfileById, id]);

   return (
      <>
         {profile === null || loading ? (<Spinner />) : (
            <section className='container'>
               <Link to="/profiles" className='btn btn-light'>
                  Back to Profiles
               </Link>
               {auth.isAuthenticated && 
                  auth.loading === false && 
                  auth.user._id === profile.user._id && (
                     <Link to="/edit-profile" className='btn btn-dark'>
                        Edit Profile
                     </Link>
                  )}
                  <div className="profile-grid my-1">
                     <ProfileTop profile={profile} />
                     <ProfileAbout profile={profile} />
                     <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length === 0 ? (
                           <h4>No Experience credentials</h4>
                        ) : (
                           <>
                              {profile.experience.map(exp => (
                                 <ProfileExperience 
                                    key={exp._id} 
                                    experience={exp} 
                                 />
                              ))}
                           </>
                        )}
                     </div>
                     
                     <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.education.length === 0 ? (
                           <h4>No Education background</h4>
                        ) : (
                           <React.Fragment>
                              {profile.education.map(edu => (
                                 <ProfileEducation
                                    key={edu._id}
                                    education={edu} 
                                 />
                              ))}
                           </React.Fragment>
                        )}
                     </div>

                     {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername} />
                     )}
                  </div>
            </section>
         )}
      </>
   )
};

Profile.propTypes = {
   getProfileById: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);