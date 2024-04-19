import React, { useState, useEffect } from 'react';
import { useParams , NavLink, useNavigate } from 'react-router-dom';

const AssignMarks = () => {
    const navigate = useNavigate();
  const { rlno, assignmentId } = useParams();
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState({
    clgname: "",
    name: "",
    classandsection: "",
    rlno: "",
    assignment_link: "",
    assignment_id: "",
    assignment_title: "", 
    assignment_description: "",
    assign_marks: ""  
  });
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    const fetchSubmittedStdDetails = async () => {
      try {
        const response = await fetch(`https://mybackendtask.onrender.com/submitted-std-detailsrlno/${rlno}/${assignmentId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        
        setAssignmentDetails(data.submissions[0]); // Assuming only one submission is returned
      } catch (err) {
        console.error('Error fetching assignment details:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmittedStdDetails();
  }, [rlno, assignmentId]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const postData = async (e) => {
    e.preventDefault();
    const { assign_marks } = post;
    try {
      const res = await fetch(`https://mybackendtask.onrender.com/postingmarks/${rlno}/${assignmentId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            clgname: assignmentDetails.clgname,
            name: assignmentDetails.name,
            classandsection: assignmentDetails.classandsection,
            rlno: assignmentDetails.rlno,
            assignment_link: assignmentDetails.assignment_link,
            assignment_id: assignmentDetails.assignment_id,
            assignment_title: assignmentDetails.assignment_title, 
            assignment_description: assignmentDetails.assignment_description,
            assign_marks
        }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to apply');
      }
      window.alert("Marks posted");
      navigate("/clghome");
    } catch (error) {
      console.error(error);
      window.alert("Marks have been already Posted");
    }
  };
  // Render loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render assignment details if available
  return (
    <div>
      <br/>
      {assignmentDetails && (
        <div>
          <h1>clgname: {assignmentDetails.clgname}</h1>
          <h1>name: {assignmentDetails.name}</h1>
          <h1>subject: {assignmentDetails.subject}</h1>
          <h1>rlno: {assignmentDetails.rlno}</h1>
          <h1>assignment_title: {assignmentDetails.assignment_title}</h1>
          <h1>assignment_description: {assignmentDetails.assignment_description}</h1>
          <h1>classandsection: {assignmentDetails.classandsection}</h1>
          <h1>assignment_link: {assignmentDetails.assignment_link}</h1>
          <h1>assignment_id: {assignmentDetails.assignment_id}</h1>
          {/* Add other assignment details as needed */}
        </div>


      )}
      <div className="box" style={{ backgroundColor: "#f0f8ff", borderRadius: "10px", maxWidth: "500px", margin: "auto", padding: "10px 20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <form>
          <center>
            <h1 style={{ color: "#007bff" }}>Posting marks for {assignmentDetails.name}</h1>
          </center>
          <label htmlFor="assign_marks">Assign Marks:</label>
          <input type="text" name="assign_marks" id="assign_marks" value={post.assign_marks} onChange={handleInputs} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
          <button type="submit" className="btn btn-primary" onClick={postData} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>POST</button>
        </form>
      </div>
    </div>
  );
};

export default AssignMarks;
