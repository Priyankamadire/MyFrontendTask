import React, { useState, useEffect } from 'react';
import { useNavigate, useParams ,NavLink } from 'react-router-dom';
import './StdViewAssg.css';

const StdsSubmitted = () => {
  const { assignmentId } = useParams();
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\\s*([^;]*).*$)|^.*$/, "$1");

  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmittedStudents = async () => {
      try {
        const response = await fetch(`https://mybackendtask.onrender.com/submitted-std-details/${assignmentId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
  
        if (response.ok) {
          setStudents(data.submissions); // Update to match backend response
          setLoading(false);
          setError(null);
        } else {
          setError(data.error || 'Failed to fetch submitted students');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching submitted students:', error);
        setError('Failed to fetch submitted students. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchSubmittedStudents();
  }, [assignmentId, token]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter(student => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    return searchTerms.every(term =>
      Object.values(student).some(value =>
        value.toString().toLowerCase().includes(term)
      )
    );
  });

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
      <center><strong><h1>All Submitted Students</h1></strong></center>
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
                <th>Subject</th>
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

                  <td>{student.subject}</td>
                  <td>{student.assignment_title}</td>
                  <td>{student.assignment_description}</td>
                  <td><a href={student.assignment_link} target="_blank" rel="noopener noreferrer">View</a></td>
                 <td> <NavLink to={`/assignmarks/${student.rlno}/${student.assignment_id}`} >
                     View Submmited Students</NavLink></td>  
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
      </div>  
    </div>
  );
};

export default StdsSubmitted;
