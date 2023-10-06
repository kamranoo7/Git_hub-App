import React, { useState, useEffect } from 'react';
import style from "../Style/Home.module.css"
function HomePage() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [selectedFollower, setSelectedFollower] = useState(null);

  const fetchUserData = async () => {
    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();

      // Fetch user repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const reposData = await reposResponse.json();

      setUserData(userData);
      setUserRepos(reposData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchFollowers = async () => {
    try {
      // Fetch user followers
      const followersResponse = await fetch(`https://api.github.com/users/${username}/followers`);
      const followersData = await followersResponse.json();

      setFollowers(followersData);
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  const handleSearch = () => {
    fetchUserData();
    fetchFollowers();
  };

  const handleFollowerClick = (follower) => {
    setSelectedFollower(follower);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {userData && (
        <div>
          <h2>User Information</h2>
          <img src={userData.avatar_url} alt={`${username}'s avatar`} />
          <p>Username: {userData.login}</p>
          {/* Display other user details */}
        </div>
      )}
      {userRepos.length > 0 && (
        <div>
          <h2>Repositories</h2>
          <ul>
            {userRepos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
                {/* Display other repository details */}
              </li>
            ))}
          </ul>
        </div>
      )}
      {followers.length > 0 && (
        <div>
          <h2>Followers</h2>
          <ul>
            {followers.map((follower) => (
              <li key={follower.id}>
                <button onClick={() => handleFollowerClick(follower)}>
                  {follower.login}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedFollower && (
        <div>
          {/* Display selected follower's information */}
          <button onClick={() => setSelectedFollower(null)}>Back to Followers</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
