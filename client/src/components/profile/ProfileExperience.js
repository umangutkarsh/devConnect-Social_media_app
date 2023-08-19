import React from 'react';
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';


const ProfileExperience = ({ experience: { company, title, to, from, description } }) => {
   return (
      <div>
         <h3 className="text-dark">{company}</h3>
         <p>
            {formatDate(from)} - {to ? formatDate(to) : 'Present'}
         </p>
         <p>
            <strong>Position: </strong> {title}
         </p>
         <p>
            <strong>Description: </strong> {description}
         </p>
      </div>
   );
};

ProfileExperience.propTypes = {
   experience: PropTypes.object.isRequired
};

export default ProfileExperience;
