import React, { useEffect, useState } from 'react';
import { useParams, NavLink,useNavigate } from 'react-router-dom';


const DeleteAssg = () => {
    const navigate = useNavigate(); // To manage browser history
   

    const { id } = useParams();

    const deleteJob = async () => {
        try {
            const response = await fetch(`https://mybackendtask.onrender.com/deleteass/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Job deleted successfully');
                window.alert('Assgnment deleted'); // Display alert message
                navigate("/clghome"); // Redirect to specified page
            } else {
                throw new Error(data.error || 'Failed to delete job');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Are you sure you want to delete the job?</h1>
            <button style={buttonStyle} onClick={deleteJob}>Yes</button>
            <button style={buttonStyle}>
                <NavLink to='/clghome' style={navLinkStyle}>No</NavLink>
            </button>
        </div>
    );
}

// Inline CSS styles
const containerStyle = {
    textAlign: 'center',
    marginTop: '50px'
};

const headerStyle = {
    fontSize: '24px',
    marginBottom: '20px'
};

const buttonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none'
};

const navLinkStyle = {
    textDecoration: 'none',
    color: 'white'
};

export default DeleteAssg;
