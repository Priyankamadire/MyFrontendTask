import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const PostAss = () => {
  const [admin, setAdmin] = useState({
    clgname: "",
    name: "",
    subject: "",
    assignment_title: "",
    assignment_description: "",
    due_date: "",
    assigned_date: "", // Make sure to include assigned_date in the state
    classandsection: "",
    attachments_link: "",
    marks: "",
    total_students: ""
  });
  
 
  
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const callHomePage = async () => {
    try {
      const res = await fetch('https://mybackendtask.onrender.com/mydetails', {
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
      setUserName(data.user.clgname); // Assuming user name is nested under 'user' object
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
  const [userDetails, setUserDetails] = useState({});

  const callFetchPage = async () => {
    try {
      const res = await fetch('https://mybackendtask.onrender.com/mydetails', {
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
      setUserDetails(data.user); // Assuming user details are nested under 'user' object
    } catch (err) {
      console.log(typeof err); // Log the type of error to the console
      console.error(err); // Log the error message to the console
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    callFetchPage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  const PostData = async (e) => {
    e.preventDefault();
    const { assignment_title, assignment_description, due_date, assigned_date, classandsection, attachments_link, marks, total_students } = admin;
    try {
      const res = await fetch("https://mybackendtask.onrender.com/post-assignment", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clgname: userDetails.clgname,
          name: userDetails.name,
          subject: userDetails.subject,
          assignment_title,
          assignment_description,
          due_date,
          assigned_date,
          classandsection,
          attachments_link,
          marks,
          total_students
        }),
        credentials: 'include'
      });
      if (!res.ok) {
        throw new Error('Failed to post assignment');
      }
      const data = await res.json();
      console.log("Data received after posting:", data); // Log the data received after successful post
      
        window.alert('Assignment successfully posted');
        navigate('/clghome'); // Navigate to clghome page after successful post
      
    } catch (error) {
      console.error(error);
      window.alert("Failed to post assignment");
    }
  };
  
  
  

  return (
    <div>
      <br/>
      <h1>Post Assignmnent for Students of {userName}</h1>
      {/* <h1>i {userDetails.name} posting this</h1> */}
      <div className="box" style={{ backgroundColor: "#f0f8ff", borderRadius: "10px", maxWidth: "500px", margin: "auto", padding: "10px 20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <form>
          <center>
            <h1 style={{ color: "#007bff" }}>POST ASSIGNMENT</h1>
          </center>
          {/* <label htmlFor="instname">Institute Name:</label>
          <input type="text" name="instname" id="instname" value={admin.instname} onChange={handleInputs} placeholder="eg: KMIT" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} /> */}

          {/* Other input fields */}
          <label htmlFor="assignment_title">Assignmnent title:</label>
                    <input type="text" name="assignment_title" id="assignment_title" value={admin.assignment_title} onChange={handleInputs} placeholder="Write short Note on Computer" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="assignment_description">Assignment description </label>
                    <input type="text" name="assignment_description" id="assignment_description" value={admin.assignment_description} onChange={handleInputs} placeholder="Uses of computer advantages and disadvantages" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="classandsection">Class and Section :</label>
                    <input type="text" name="classandsection" id="classandsection" value={admin.classandsection} onChange={handleInputs} placeholder="CSE A" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="attachments_link">Attachments link:</label>
                    <input type="text" name="attachments_link" id="attachments_link" value={admin.attachments_link} onChange={handleInputs} placeholder="http://gdrive//submit" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />
                    <label htmlFor="assigned_date">Date</label>
                    <input type="date" name="assigned_date" id="assigned_date" value={admin.assigned_date} onChange={handleInputs} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="marks">Marks:</label>
                    <input type="number" name="marks" id="marks" value={admin.marks} onChange={handleInputs} placeholder="80" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="due_date">Last Day to submit:</label>
                    <input type="date" name="due_date" id="due_date" value={admin.due_date} onChange={handleInputs} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

                    <label htmlFor="total_students">Total Students:</label>
          <input type="number" name="total_students" id="total_students" value={admin.total_students} onChange={handleInputs} placeholder="40" style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ced4da" }} />

          <center>
            <button type="submit" name="signup" id="signup" className="btn btn-primary" onClick={PostData} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>POST</button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default PostAss;
