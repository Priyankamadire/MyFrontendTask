import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FillAssg = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [apply, setApply] = useState({
    clgname: "",
    name: "", 
    subject: "",
    rlno: "",
    assignment_title: "",
    assignment_description: "", 
    classandsection: "",
    assignment_link: "",
    assignment_id: ""
  });

  const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  const callHomePage = async () => {
    try {
      const res = await fetch('https://mybackendtask.onrender.com/stddetails', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUserDetails(data.user);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        if (!id) return; // Check if id exists

        const response = await fetch(`https://mybackendtask.onrender.com/postedassignmentswithid/${id}`, {
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const data = await response.json();
        if (response.ok) {
          setAssignmentDetails(data.assignment);
          setLoading(false);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to fetch assignment details');
        }
      } catch (error) {
        console.error('Error fetching assignment details:', error);
        setError('Failed to fetch assignment details. Please try again later.');
      }
    };

    fetchAssignmentDetails();
  }, [id]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setApply(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    const { assignment_link } = apply;
    try {
      const res = await fetch(`https://mybackendtask.onrender.com/submit-assgnm/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clgname: userDetails.clgname,
          name: userDetails.name,
          subject: assignmentDetails.subject,
          rlno: userDetails.rlno,
          assignment_title: assignmentDetails.assignment_title,
          assignment_description: assignmentDetails.assignment_description,
          classandsection: userDetails.classandsection,
          assignment_id: assignmentDetails.id,
          assignment_link
        }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to apply');
      }
      window.alert("submitted");
      navigate("/stdhome");
    } catch (error) {
      console.error(error);
      window.alert("Failed to apply");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <br/>
      <h1>Clg is {userDetails.clgname}</h1>
      <h1>Name is {userDetails.name}</h1>
    <h1>subject: {assignmentDetails.subject}</h1>
    <h1>rlno: {userDetails.rlno}</h1>
    <h1>assignment_title: {assignmentDetails.assignment_title}</h1>
    <h1>assignment_description: {assignmentDetails.assignment_description}</h1>
    <h1>classandsection: {userDetails.classandsection}</h1>
    <h1>  assignment_id: {assignmentDetails.id}</h1>

      <div className="box" style={{ backgroundColor: "#f0f8ff", borderRadius: "10px", maxWidth: "500px", margin: "auto", padding: "10px 20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <form>
          <center>
            <h1 style={{ color: "#007bff" }}>Apply for  {assignmentDetails.instname} assignment</h1>
          </center>
          <label htmlFor="assignment_link">Assignment Link:</label>
          <input type="text" name="assignment_link" id="assignment_link" value={apply.assignment_link} onChange={handleInputs} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
          <button type="submit" className="btn btn-primary" onClick={postData} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>POST</button>
        </form>
      </div>
    </div>
  );
};

export default FillAssg;
