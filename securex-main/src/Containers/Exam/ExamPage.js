import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { useLeaderboard } from './../LeaderBoard'; // Adjust path

function ExamPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToLeaderboard } = useLeaderboard();

  const { id, name, studentSubject } = location.state || {};
  const [time, setTime] = useState(20 * 60);
  const [warningCount, setWarningCount] = useState(0);

  const testDetails = JSON.parse(localStorage.getItem('testDetails'));

  useEffect(() => {
    console.log("testDetails from localStorage:", testDetails);

    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        const newWarningCount = warningCount + 1;
        setWarningCount(newWarningCount);

        alert(`Warning: Full screen exited (${newWarningCount})`);

        if (newWarningCount >= 3) {
          addToLeaderboard(id, name, newWarningCount, true);
          alert("Exam terminated. Please contact teacher/organization.");
          navigate('/');
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [warningCount, navigate, addToLeaderboard, id, name]);

  const handleGoBack = () => {
    addToLeaderboard(id, name, warningCount, false);
    navigate('/', { state: { id, name } });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const requestFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.heading}>Periodic Test - {testDetails?.subjectName || 'N/A'}</h2>
          <p style={styles.date}>20th January, 2022</p>
        </div>
        <button onClick={requestFullScreen} style={styles.fullscreenButton}>
          Go Fullscreen
        </button>
        <div style={styles.headerRight}>
          <div style={styles.timer}>
            <p>{formatTime(time)}</p>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.leftSection}>
          <div style={styles.webcamContainer}>
            <img src="http://localhost:8085/video_feed" alt="Video Feed" style={styles.webcam} />
          </div>
          <div style={styles.studentDetails}>
            <h3>Student Details</h3>
            <p><strong>Student ID:</strong> {id}</p>
            <p><strong>Student Name:</strong> {name}</p>
          </div>
        </div>

        <div style={styles.rightSection}>
          <h3>Instructions:</h3>
          <ul style={styles.instructions}>
            <li>There are 5 questions.</li>
            <li>The questions are multiple choice questions.</li>
            <li>Total duration is 20 minutes.</li>
            <li>All the best. You got this!</li>
          </ul>

          {testDetails?.subjectName === studentSubject && testDetails?.url && (
            <div>
              <h4>Test Link:</h4>
              <a href={testDetails.url} target="_blank" rel="noopener noreferrer">{testDetails.url}</a>
            </div>
          )}

          <div style={styles.formContainer}>
            <iframe
              title="Google Form for TSEC Periodic Test"
              src="https://docs.google.com/forms/d/e/1FAIpQLSfV0BlxHGPLl8eScMEk5g4ZLjcbpai3i7xtYLTOskpX8ZfQAA/viewform?embedded=true" 
              width="100%"
              height="500"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
            <button style={styles.fullscreenButton} onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#edf2f4',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#8d99ae',
    borderBottom: '1px solid #2b2d42',
    marginBottom: '20px',
  },
  headerLeft: {
    textAlign: 'left',
  },
  heading: {
    margin: '0',
    color: '#2b2d42',
    fontSize: '24px',
  },
  date: {
    margin: '0',
    color: '#2b2d42',
    fontSize: '14px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  fullscreenButton: {
    cursor: 'pointer',
    backgroundColor: '#2b2d42',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#edf2f4',
    marginLeft: '20px',
  },
  timer: {
    backgroundColor: '#2b2d42',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#edf2f4',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftSection: {
    width: '30%',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    border: '1px solid #8d99ae',
  },
  webcamContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  webcam: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
    border: '1px solid #2b2d42',
  },
  studentDetails: {
    marginTop: '20px',
    textAlign: 'left',
  },
  rightSection: {
    width: '65%',
    backgroundColor: '#edf2f4',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    border: '1px solid #8d99ae',
  },
  instructions: {
    paddingLeft: '20px',
    color: '#2b2d42',
  },
  formContainer: {
    marginTop: '20px',
  },
};

export default ExamPage;
