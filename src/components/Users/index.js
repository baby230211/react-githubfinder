import React, { useContext } from 'react';
import GithubContext from '../../context/githubContext';

import Spinner from '../utils/Spinner';
import UserItem from './UserItem';

const Users = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users } = githubContext;
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        (
          <div style={userStyle}>
            {users.map(user => {
              return <UserItem key={user.id} user={user}></UserItem>;
            })}
          </div>
        ) || ''
      )}
    </>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem'
};

export default Users;
