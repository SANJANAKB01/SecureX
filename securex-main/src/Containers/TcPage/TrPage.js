import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { useLeaderboard } from './../LeaderBoard'; 
import Modal from './Modal'; // Import the Modal component
import './TrPage.css';

function TrPage() {
  const navigate = useNavigate();  
  const { leaderboard } = useLeaderboard(); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openModal = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };


  const hardcodedStudents = [
    { id: 30, name: 'Dhawal', warningCount: 1, terminated: false },
    { id: 14, name: 'Vedant', warningCount: 3, terminated: true },
    { id: 19, name: 'Mohit', warningCount: 3, terminated: true },
    { id: 5, name: 'Khushbu', warningCount: 0, terminated: false },
    { id: 17, name: 'Diksha', warningCount: 1, terminated: false },
    { id: 25, name: 'Janvi', warningCount: 2, terminated: false },
    { id: 33, name: 'Sagar', warningCount: 3, terminated: true },
    { id: 39, name: 'Heer', warningCount: 2, terminated: false },
  ];
  

  return (
    <div className="App">
      <header className="navbar">
        <div className="logo">SecureX</div>
        <nav>
          <a href="/">Home</a>
          <a href="/">Create Test</a>
          <a href="/">About</a>
        </nav>
      </header>

      <div className="invite-section">
        <div className="invite-card">
          <h3>Add new student</h3>
          <p>Increase your circle and earn more</p>
          <button className="invite-btn">Invite</button>
        </div>
        <div className="create-ai-card">
          <h3>Create a Test</h3>
          <p>Everything Impossible</p>
          <button className="create-btn" onClick={() => navigate('/create')}>Create</button>
        </div>
      </div>
      
      <div className="leaderboard-section">
        <h2>Leaderboard</h2>
        <table className="leaderboard">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Warning</th>
              <th>Terminated</th>
              {/* <th>Score</th> */}
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.warningCount}</td>
                <td>{student.terminated ? 'Yes' : 'No'}</td>
                {/* <td>{student.terminated ? 0 : 20}</td> */}
                <td>
                  <button onClick={() => openModal(student)}>View</button>
                </td>
              </tr>
            ))}
{/* Replace hardcoded entries with the new array */}
{hardcodedStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.warningCount}</td>
              <td>{student.terminated ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => openModal(student)}>View</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* Modal Component */}
      <Modal isOpen={modalOpen} onClose={closeModal} student={selectedStudent} />
    </div>
  );
}

export default TrPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Modal from './Modal';
// import './TrPage.css';

// function TrPage() {
//   const navigate = useNavigate();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/leaderboard')
//       .then(response => response.json())
//       .then(data => setLeaderboard(data))
//       .catch(error => console.error('Error fetching leaderboard:', error));
//   }, []);

//   const openModal = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedStudent(null);
//   };

//   return (
//     <div className="App">
//       <header className="navbar">
//         <div className="logo">SecureX</div>
//         <nav>
//           <a href="/">Home</a>
//           <a href="/">Create Test</a>
//           <a href="/">About</a>
//         </nav>
//       </header>

//       <div className="invite-section">
//         <div className="invite-card">
//           <h3>Add new student</h3>
//           <p>Increase your circle and earn more</p>
//           <button className="invite-btn">Invite</button>
//         </div>
//         <div className="create-ai-card">
//           <h3>Create a Test</h3>
//           <p>Everything Impossible</p>
//           <button className="create-btn" onClick={() => navigate('/create')}>Create</button>
//         </div>
//       </div>
      
//       <div className="leaderboard-section">
//         <h2>Leaderboard</h2>
//         <table className="leaderboard">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Warning</th>
//               <th>Terminated</th>
//               <th>Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaderboard.map((student, index) => (
//               <tr key={index}>
//                 <td>{student.id}</td>
//                 <td>{student.name}</td>
//                 <td>{student.warningCount}</td>
//                 <td>{student.terminated ? 'Yes' : 'No'}</td>
//                 <td>
//                   <button onClick={() => openModal(student)}>View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Modal isOpen={modalOpen} onClose={closeModal} student={selectedStudent} />
//     </div>
//   );
// }

// export default TrPage;