import React from 'react';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import formatDate from '../../utils/formatDate';
import Moment from 'react-moment';
import PropTypes from 'prop-types';


const Education = ({ education, deleteEducation }) => {

   const educationBackground = education.map(edu => (
      <tr key={edu._id}>
         <td>{edu.school}</td>
         <td className="hide-sm">{edu.degree}</td>
         <td>
            <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
               exp.to == null ? (' Present'): (
                  <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
               )
            }
         </td>
         <td>
            <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>
               Delete
            </button>
         </td>
      </tr>
   ))

   return (
      <React.Fragment>
         <h2 className="my-2">Education Background</h2>
         <table className="table">
            <thead>
               <tr>
                  <th>School</th>
                  <th className="hide-sm">Degree</th>
                  <th className="hide-sm">Years</th>
                  <th />
               </tr>
            </thead>
            <tbody>{educationBackground}</tbody>
         </table>
      </React.Fragment>
   )
}

Education.propTypes = {
   education: PropTypes.array.isRequired,
   deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);