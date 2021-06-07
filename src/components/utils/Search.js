import React, { useContext, useState } from 'react';

import GithubContext from '../../context/githubContext';
import AlertContext from '../../context/alertContext';

const Search = () => {
  const [text, setText] = useState('');

  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  console.log(`githubContext`, githubContext);
  console.log(`alertContext`, alertContext);

  // input handle
  const onChange = e => {
    // console.log(e.target.value);
    setText(e.target.value);
  };

  // Search
  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      // pre => user submit via blank
      // post=> alertState change
      alertContext.setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  // clear User
  const clearButton = githubContext.users.length > 0 && (
    <button
      className="btn btn-light btn-block"
      onClick={githubContext.clearUsers}
    >
      Clear
    </button>
  );

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input
          className="btn btn-dark btn-block"
          type="submit"
          value="Search"
        />
      </form>
      {clearButton}
    </div>
  );
};

export default Search;
