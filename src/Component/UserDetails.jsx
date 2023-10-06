// UserDetails.js
import React from 'react';

function UserDetails({ user }) {
  return (
    <div>
      <img src={user.owner.avatar_url} alt={`${user.login} avatar`} />
      <h2>{user.login}</h2>
      {/* Display other user details */}
    </div>
  );
}

export default UserDetails;
