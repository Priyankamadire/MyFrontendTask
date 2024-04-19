import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StdViewAssg.css';
import { NavLink, useParams } from 'react-router-dom';

const StdViewAssg = () => {
  const [userName, setUserName] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState('');
  const { clgname } = useParams();
  const callHomePage = async () => {
    try {
      const res = await fetch('https://mybackendtask.onrender.com/stddetails', {
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
      console.error('Error fetching user details:', err);
      setErrorUser('Failed to fetch user details');
    } finally {
      setLoadingUser(false);
    }
  };
  const callFetchePage = async () => {
    try {
      const res = await fetch('https://mybackendtask.onrender.com/stddetails', {
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
      setUserName(data.user); // Assuming user name is nested under 'user' object
    } catch (err) {
      console.error('Error fetching user details:', err);
      setErrorUser('Failed to fetch user details');
    } finally {
      setLoadingUser(false);
    }
  };
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\\s*([^;]*).*$)|^.*$/, "$1");

  useEffect(() => {
    callHomePage();
    callFetchePage();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [errorAssignments, setErrorAssignments] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`https://mybackendtask.onrender.com/postedassignmentsofclgsd/${clgname}`, {
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
          setAssignments(data.assignments);
          setLoadingAssignments(false);
          setErrorAssignments(null);
        } else {
          setErrorAssignments(data.error || 'Failed to fetch assignments');
          setLoadingAssignments(false);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setErrorAssignments('Failed to fetch assignments. Please try again later.');
        setLoadingAssignments(false);
      }
    };
  
    fetchAssignments();
  }, [clgname, token]);
  

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  if (errorUser) {
    return <div>Error: {errorUser}</div>;
  }

  if (loadingAssignments) {
    return <div>Loading assignments...</div>;
  }

  if (errorAssignments) {
    return <div>Error fetching assignments: {errorAssignments}</div>;
  }

  if (assignments.length === 0) {
    return <div>No assignments found</div>;
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAssignments = assignments.filter(assignment => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    return searchTerms.every(term =>
      Object.values(assignment).some(value =>
        value.toString().toLowerCase().includes(term)
      )
    );
  });

  const reversedAssignments = filteredAssignments.reverse();

  const handleApply = () => {
    // Redirect to the apply page with the job ID
    navigate('/clghome'); // Use navigate here
  };

  return (
    <div>
      <br/>
      <center><strong><h1>All Assignments</h1></strong></center>
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

      <div className="assignment-listing">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>College</th>
                <th>Assignment TITLE</th>
                <th>Assignment Description</th>
                <th>Class and Section</th>
                <th>Due Date</th>
                
                <th>Marks</th>
                <th>Total Students</th>
                <th>Attachments Link</th>
               
              </tr>
            </thead>
            <tbody>
              {reversedAssignments.map(assignment => (
                <tr key={assignment._id}>
                  <td>{assignment.clgname}</td>
                  <td>{assignment.assignment_title}</td>
                  <td>{assignment.assignment_description}</td>
                  <td>{assignment.classandsection}</td>
                  <td>{assignment.due_date}</td>
                  
                  <td>{assignment.marks}</td>
                  <td>{assignment.total_students}</td>
                  <td>
                  <NavLink to={`/fillassg/${assignment.id}`} >
                     {assignment.attachments_link}</NavLink></td>
                  {/* <td>
                    <button className="apply-btn" onClick={handleApply}>Apply</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StdViewAssg;
