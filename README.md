# SecureX - Face Detection & Monitoring System
### SecureX (ReactJs + Spring Boot + OpenCV + Microsoft SQL Server)
SecureX is an intelligent face detection and exam proctoring system built with OpenCV, React, Spring Boot, and Microsoft SQL Server. It provides real-time webcam monitoring, live video streaming, and automatic multi-face detection to ensure exam integrity. With full-screen enforcement, violation alerts, and an easy-to-use dashboard for teachers and students, SecureX safeguards exams and can easily adapt to security needs


# 🚀 Features
- 🎥 Real-time face and eye detection using OpenCV Haar Cascades
- ⚠️ Multi-face warning system for exam proctoring
- 🔴 Live video streaming through Spring Boot backend
- 👨‍🏫 Separate login systems for teachers and students
- 📝 Exam creation and management functionality
- 🏆 Leaderboard system for performance tracking
- 🌐 Fully responsive React frontend with modern UI
- 💾 Microsoft SQL Server database integration for persistent storage
  

# 🛠️ Tech Stack

| Layer            | Tools Used                                            |
|------------------|-------------------------------------------------------|
| Frontend         | React.js, React Router,  Bootstrap                    |
| Backend          | Java (Spring Boot), OpenCV, CORS                      |
| Computer Vision  | OpenCV Haar Cascades for face/eye detection           |
| Streaming        | Spring Boot Response streaming for live video         |
| Database         | Microsoft SQL Server for user data and exam storage   |

                    
# 📂 Project Structure
```
securex/
├── SecureX/
│   ├── src
│       ├── controller
│           ├── MainController
│       ├── Entity
│           ├── Leaderboard
│       ├── repository
│           ├── LeaderboardRepository
│       ├── service
│           ├── VideoStreamService
│       ├── SecureXApplication
├── haarcascades/
├── securex-main/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── Components/
│   │   │   ├── Create.js
│   │   │   ├── Login.js
│   │   │   └── Logintr.js
│   │   └── Containers/
│   │       ├── Auth/
│   │       ├── Exam/
│   │       ├── MPage/
│   │       ├── StPage/
│   │       ├── TcPage/
│   │       └── LeaderBoard.js
│   └── public/
├── screenshots/
```


# 📸 Screenshots
### Main Page

### Student Page

### Exam Page

### Teacher Page

### Student Result Data


# 🗣️ Set Your Database Configuration
Before running the app, you need to configure your Microsoft SQL Server database and create a Google Form for test creation:

1. Microsoft SQL Server Database - Create database named `securex` and update password in `app.py`
2. Google Form - Create a Google Form for test/exam creation and get the shareable link


# 🎥 Demo Video You can watch a full walkthrough here:
https://drive.google.com/file/d/1kgMNXO42R5DTQNe4EOXKZoS8Bf9mNV6a/view?usp=sharing


# 🔗 GitHub Repo: 
https://github.com/SANJANAKB01/SecureX

# 🤝 Contributing
Pull requests are welcome! If you’d like to add new algorithms, improve the UI, or enhance the animations, feel free to fork the repo and submit a PR.
