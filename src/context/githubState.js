import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducers';

import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING
} from './types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  // Search users

  const searchUsers = async text => {
    // https://docs.github.com/en/rest/reference/search
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  const getUser = async username => {
    // https://docs.github.com/en/rest/reference/search
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}`);
    dispatch({ type: GET_USER, payload: res.data });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const getUserRepos = async username => {
    //docs.github.com/en/rest/reference/repos#list-repositories-for-a-user
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created&direction=asc`
    );
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
