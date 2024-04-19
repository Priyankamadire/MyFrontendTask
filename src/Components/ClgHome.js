import React, { useState, useEffect } from 'react';

const ClgHome = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const callHomePage = async () => {
    try {
      const res = await fetch('http://localhost:5000/mydetails', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Sending cookies with the request
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUserName(data.user.name); // Assuming user name is nested under 'user' object
    } catch (err) {
      console.log(typeof err); // Log the type of error to the console
      console.error(err); // Log the error message to the console
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    callHomePage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Hi {userName}</h1>
    </div>
  );
};

export default ClgHome;
