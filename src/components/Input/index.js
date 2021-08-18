import React from 'react';

import './styles.css';

function Input({ title, id, ...rest }) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{title}</label>
      <input id={id} {...rest} />
    </div>
  );
}

export default Input;