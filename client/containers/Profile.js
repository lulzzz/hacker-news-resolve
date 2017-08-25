import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import '../styles/profile.css';

export const User = ({ id, name, createdAt, karma }) => {
  if (!id) {
    return (
      <div>
        <h1>Error</h1>
        User not found
      </div>
    );
  }

  return (
    <div className="profile__content">
      <table>
        <tbody>
          <tr>
            <td>name:</td>
            <td>
              {name}
            </td>
          </tr>
          <tr>
            <td>created:</td>
            <td>
              {new Date(createdAt).toLocaleString('en-US')}
            </td>
          </tr>
          <tr>
            <td>karma:</td>
            <td>
              {karma}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <Link to="/changepw">change password</Link>
      </div>
    </div>
  );
};

export const mapStateToProps = ({ user, users }, ownProps) => {
  const { location } = ownProps;

  const { id } = queryString.parse(location.search);

  if (id) {
    return users[id];
  }

  return user;
};

export default connect(mapStateToProps)(User);