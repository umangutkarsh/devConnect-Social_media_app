import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

   useEffect(() => {
      getProfiles();
   }, [getProfiles]);

   return (
      <section className='container'>
         {loading ? (<Spinner />) : (
            <React.Fragment>
               <h1 className="large text-primary">Developers</h1>
               <p className="lead">
                  <i className="fab fa-connectdevelop" /> Browse and Connect with Developers
               </p>
               <div className="profiles">
                  {profiles.length === 0 ? (<h4>No Profiles found</h4>) : (
                     profiles.map(profile => (
                        <ProfileItem 
                           key={profile._id}
                           profile={profile}
                        />
                     ))
                  )}
               </div>
            </React.Fragment>
         )}
      </section>
   );
};

Profiles.propTypes = {
   getProfiles: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);