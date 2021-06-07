import React from 'react';
import Repo from './Repo';

const Repos = ({ repos }) => {
  return (
    <>
      {(repos.length > 0 &&
        repos.map(repo => <Repo repo={repo} key={repo.id} />)) ||
        ''}
    </>
  );
};

export default Repos;
