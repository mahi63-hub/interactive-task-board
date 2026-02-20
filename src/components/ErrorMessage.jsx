import React from 'react';

function ErrorMessage({ message }) {
  return <div className="text-red-500 text-center">{message}</div>;
}

export default ErrorMessage;