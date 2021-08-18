import React from 'react';

import './styles.css';

function Button({ title, ...rest }) {
  return (
    <button {...rest}>{title}</button>
  );
}

export default Button;