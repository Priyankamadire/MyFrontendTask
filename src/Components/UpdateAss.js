import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './udateDet.css';

const UpdateAssignmentDetails = () => {
  const { id } = useParams();

  const [duedate, setDueDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateDetails, setUpdatedDetails] = useState('');
  const [marks, setMarks] = useState('');
  const [students, setStudents] = useState('');
  const [classandsec, setClassAndSec] = useState('');
  const [attachment_link, setAttachmentLink] = useState('');

  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  const handleUpdate = async (url, data, successMessage) => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Accept: 'application/json',
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.json();
        setUpdatedDetails(responseData.updateDetails);
        if (responseData.success) {
          successMessage && successMessage();
        }
      } else {
        const errorData = await response.json();
        setUpdatedDetails(errorData.error);
      }
    } catch (error) {
      console.error('Error updating:', error);
      setUpdatedDetails('Failed to update. Please try again.');
    }
  };

  const handleDueDateUpdate = () => {
    handleUpdate(
      `http://localhost:5000/update-due-date/${id}`,
      { due_date: duedate },
      () => setDueDate('')
    );
  };

  const handleTitleUpdate = () => {
    handleUpdate(
      `http://localhost:5000/update-assignment-title/${id}`,
      { title },
      () => setTitle('')
    );
  };

  const handleDescriptionUpdate = () => {
    handleUpdate(
      `http://localhost:5000/update-assignment-description/${id}`,
      { assignment_description: description },
      () => setDescription('')
    );
  };

  const handleMarksUpdate = () => {
    handleUpdate(
      `http://localhost:5000/update-marks/${id}`,
      { marks },
      () => setMarks('')
    );
  };

  const handleStudentsUpdate = () => {
    handleUpdate(
      `http://localhost:5000/update-total-students/${id}`,
      { total_students: students },
      () => setStudents('')
    );
  };

  const handleStdClassSecUpdate = () => {
    handleUpdate(
      `http://localhost:5000/update-classandsection/${id}`,
      { newclasssec: classandsec },
      () => setClassAndSec('')
    );
  };

  const handleAttachLinkUpdate = () => {
    handleUpdate(
      `http://localhost:5000/update-attachments-link/${id}`,
      { newattachlink: attachment_link },
      () => setAttachmentLink('')
    );
  };

  return (
    <>
      <br />
      <div className="container" style={{ flex: '1', paddingRight: '20px' }}>
        <div className="white-box">
          <div className="update-form-container">
            <h2>Update Due Date</h2>
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                value={duedate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleDueDateUpdate}
                disabled={duedate.trim() === ''}
              >
                Update
              </button>
            </div>

            <h2>Update Title</h2>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <button
                className="btn btn-success"
                onClick={handleTitleUpdate}
                disabled={title.trim() === ''}
              >
                Update
              </button>
            </div>

            <h2>Update Description</h2>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleDescriptionUpdate}
                disabled={description.trim() === ''}
              >
                Update
              </button>
            </div>

            <h2>Update Marks</h2>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                placeholder="Enter new marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleMarksUpdate}
                disabled={marks.trim() === ''}
              >
                Update
              </button>
            </div>

            <h2>Update Total Students</h2>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                placeholder="Enter new total students"
                value={students}
                onChange={(e) => setStudents(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleStudentsUpdate}
                disabled={students.trim() === ''}
              >
                Update
              </button>
            </div>

            <h2>Update Class and Section</h2>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new class and section"
                value={classandsec}
                onChange={(e) => setClassAndSec(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleStdClassSecUpdate}
                disabled={classandsec.trim() === ''}
              >
                Update
              </button>
            </div>

            <h2>Update Attachments Link</h2>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new attachments link"
                value={attachment_link}
                onChange={(e) => setAttachmentLink(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleAttachLinkUpdate}
                disabled={attachment_link.trim() === ''}
              >
                Update
              </button>
            </div>

            {updateDetails && <p>{updateDetails}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAssignmentDetails;
