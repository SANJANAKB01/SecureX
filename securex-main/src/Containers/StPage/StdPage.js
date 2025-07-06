import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './StdPage.css';
import { Avatar, TextField, Button, Typography } from '@mui/material';
// import ExamPage from '../Exam/ExamPage';
const StdPage = () => {
  const { state } = useLocation();
  const { user } = state || {};
  const navigate = useNavigate(); // Initialize navigate

  if (!user) {
    return <div>No user data available</div>;
  }

  const Announcement = ({ title, details }) => (
    <div className="announcement-card">
      <Typography variant="h6">{title}</Typography>
      <p>{details}</p>
    </div>
  );

  const ExamCard = ({ title, maxMarks, duration }) => (
    <div className="exam-card">
      <Typography variant="h6">{title}</Typography>
      <p>Max Marks: {maxMarks}</p>
      <p>Duration: {duration}</p>
      <Button
        variant="contained"
        className="join-test-button"
        onClick={() => navigate('/exam', { state: { id: user.id, name: user.name } })} // Pass user ID and email
      >
        Join Test
      </Button>
    </div>
  );

  return (
    <div className="user-profile">
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-card">
            <div className="profile-picture">
              <Avatar
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                sx={{ width: 80, height: 80 }}
              />
              <div className="profile-info">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <div className="announcements-card">
            <h3>Announcements</h3>
            <Announcement title="Upcoming Exam: Machine Learning" details="Date: 2024-09-30, Time: 10 AM" />
            <Announcement title="Sports Day" details="Date: 2024-10-05, Location: School Ground" />
            <Announcement title="Results Announcement" details="Results for last exams: TBD" />
          </div>
        </div>
        <div className="profile-right">
          <div className="personal-details">
            <h3>Personal Details</h3>
            <div className="details-grid">
              <TextField label="First Name" defaultValue={user.name} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="Last Name" defaultValue="Henry" InputProps={{ readOnly: true }} fullWidth />
              <TextField label="Department" defaultValue="Web Development" InputProps={{ readOnly: true }} fullWidth />
              <TextField label="Email Address" defaultValue={user.email} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="New Password" type="password" InputProps={{ readOnly: true }} fullWidth />
              <TextField label="Confirm Password" type="password" InputProps={{ readOnly: true }} fullWidth />
            </div>
          </div>
          <div className="exams">
            <h3>My Exams</h3>
            <div className="exams-grid">
              <ExamCard title="Python" maxMarks={20} duration="20 Min" />
              <ExamCard title="Machine Learning" maxMarks={20} duration="20 Min" />
              <ExamCard title="Mathematics" maxMarks={20} duration="20 Min" />
              <ExamCard title="Big Data" maxMarks={20} duration="20 Min" />
              <ExamCard title="AI" maxMarks={20} duration="20 Min" />
              <ExamCard title="Data Structure" maxMarks={20} duration="20 Min" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StdPage;
