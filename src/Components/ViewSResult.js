import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './StdViewAssg.css';

const StdResultTeach = () => {
  const { rlno } = useParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    const fetchresuofstd = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\\s*([^;]*).*$)|^.*$/, "$1");
        const response = await fetch(`https://mybackendtask.onrender.com/postedmarksdbyrl/${rlno}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        setStudents(data.submissions);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error fetching assignment details:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchresuofstd();
  }, [rlno]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  const filteredStudents = Array.isArray(students) ? students.filter(student => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    return searchTerms.every(term =>
      Object.values(student).some(value =>
        value.toString().toLowerCase().includes(term)
      )
    );
  }) : [];

  const reversedStudents = filteredStudents.reverse();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <br/>
      <center><strong><h1>All Submitted Assignment Marks</h1></strong></center>
      <br />

      <form className="d-flex" style={{ width: '100%' }}>
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: '100%' }}
        />
      </form>
      <br/>
     


      <div className="student-listing">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class and Section</th>
                <th>Roll no</th>
                <th>Assignment Title</th>
                <th>Assignment Description</th>
                <th>Assignment Link</th>
                <th>Assign Marks</th>
              </tr>
            </thead>
            <tbody>
              {reversedStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.classandsection}</td>
                  <td>{student.rlno}</td>
                  <td>{student.assignment_title}</td>
                  <td>{student.assignment_description}</td>
                  <td><a href={student.assignment_link} target="_blank" rel="noopener noreferrer">View</a></td>
                  <td>
                      {student.assign_marks}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
      </div>  
    </div>
  );
};

export default StdResultTeach;
