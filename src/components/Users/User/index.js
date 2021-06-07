import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../utils/Spinner';
import GithubContext from '../../../context/githubContext';
import Repos from './Repos';

const User = props => {
  // props history,match,location
  const { match } = props;
  const { getUser, loading, user, repos, getUserRepos } =
    useContext(GithubContext);
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
  }, []);

  console.log(user);
  const {
    avatar_url,
    name,
    bio,
    company,
    location,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    blog
  } = user;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Link className="btn btn-light" to="/">
          Back To Search
        </Link>
      )}
      Hireable:{' '}
      {hireable ? (
        <i className="fas fa-check text-success"></i>
      ) : (
        <i className="fas fa-times-circle text-danger"></i>
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            className="round-img"
            src={avatar_url}
            alt=""
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <a className="btn btn-dark my-1" href={html_url}>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  <strong>Username: </strong>
                  {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong>Company: </strong>
                  {company}
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong>Website: </strong>
                  {blog}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </>
  );
};

export default User;
