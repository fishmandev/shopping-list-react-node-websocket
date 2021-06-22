import React, { useEffect, useState } from 'react';

const Alert = ({ message }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    let timeoutId = setTimeout(() => setShowAlert(false), 3000);
    return () => { clearTimeout(timeoutId) }
  });

  return (
    <>
      {showAlert && (<div>{message}</div>)}
    </>
  )
}

export default Alert;