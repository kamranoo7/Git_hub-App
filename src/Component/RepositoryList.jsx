// RepositoryList.js
import React from 'react';

function RepositoryList({ repositories }) {
  return (
    <div>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            {/* Display other repository details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepositoryList;
