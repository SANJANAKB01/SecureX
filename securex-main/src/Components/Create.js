import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';

function Create() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const teacherName = formData.get('teacherName');
    const subjectName = formData.get('subjectName');
    const url = formData.get('url');

    // Store the test details in local storage
    localStorage.setItem('testDetails', JSON.stringify({
      email,
      teacherName,
      subjectName,
      url,
    }));

    navigate('/trpage'); // Navigate to TrPage after form submission
  };

  return (
    <div className="form-container">
      <h1>Create a Test</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" className="form-input" required />
        <input type="text" name="teacherName" placeholder="Teacher Name" className="form-input" required />
        <input type="text" name="subjectName" placeholder="Subject Name" className="form-input" required />
        <input type="url" name="url" placeholder="Question Paper Link (Google Form)" className="form-input" required />
        <input type="number" name="maxMarks" placeholder="Maximum Marks" className="form-input" required />
        <input type="number" name="duration" placeholder="Duration (in minutes)" className="form-input" required />
        <button type="submit" className="submit-button">Create Test</button>
      </form>
    </div>
  );
}

export default Create;
