from flask import Flask, Response
import cv2
from flask_cors import CORS
import time
import mysql.connector
app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

# MySQL database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'sanchi01',  # Replace with your MySQL password
    'database': 'securex'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

# Initialize the video capture and Haar cascades
cap = cv2.VideoCapture(0)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

# Initialize warning state
warning_displayed = False
warning_start_time = None

def generate_frames():
    global warning_displayed, warning_start_time

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        face_count = len(faces)

        # Draw rectangles around faces
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 0), 5)  # Yellow box for face
            roi_gray = gray[y:y + h, x:x + w]
            roi_color = frame[y:y + h, x:x + w]
            eyes = eye_cascade.detectMultiScale(roi_gray, 1.3, 5)
            for (ex, ey, ew, eh) in eyes:
                cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 5)  # Green box for eyes

        # Handle warning display logic
        if face_count > 1:
            if not warning_displayed:
                warning_displayed = True
                warning_start_time = time.time()
        else:
            # Once the warning has been displayed, do not reset it
            # so the warning won't show again for subsequent detections
            if warning_displayed and (time.time() - warning_start_time) >= 1:
                warning_displayed = False  # Ready for next detection

        # Show warning for 1 second if applicable
        if warning_displayed:
            elapsed_time = time.time() - warning_start_time
            if elapsed_time < 360:
                warning_text = "Warning!!"
                cv2.putText(frame, warning_text, (frame.shape[1] // 2 - 150, frame.shape[0] // 2),
                            cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 3, cv2.LINE_AA)

        # Encode the frame in JPEG format
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8085, debug=True)

# Release the capture when done
import atexit
atexit.register(lambda: cap.release())


# from flask import Flask, jsonify, Response
# from flask_cors import CORS
# import mysql.connector
# import cv2
# import time
# import atexit

# app = Flask(__name__)
# CORS(app, origins="http://localhost:3000")

# # MySQL database configuration
# db_config = {
#     'host': 'localhost',
#     'user': 'root',
#     'password': 'sanchi01',  # Replace with your MySQL password
#     'database': 'securex'
# }

# def get_db_connection():
#     return mysql.connector.connect(**db_config)

# # Initialize the video capture and Haar cascades
# cap = cv2.VideoCapture(0)
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
# eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

# # Initialize warning state
# warning_displayed = False
# warning_start_time = None

# def generate_frames():
#     global warning_displayed, warning_start_time

#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break

#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         faces = face_cascade.detectMultiScale(gray, 1.3, 5)
#         face_count = len(faces)

#         # Draw rectangles around faces
#         for (x, y, w, h) in faces:
#             cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 0), 5)  # Yellow box for face
#             roi_gray = gray[y:y + h, x:x + w]
#             roi_color = frame[y:y + h, x:x + w]
#             eyes = eye_cascade.detectMultiScale(roi_gray, 1.3, 5)
#             for (ex, ey, ew, eh) in eyes:
#                 cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 5)  # Green box for eyes

#         # Handle warning display logic
#         if face_count > 1:
#             if not warning_displayed:
#                 warning_displayed = True
#                 warning_start_time = time.time()
#         else:
#             # Once the warning has been displayed, do not reset it
#             # so the warning won't show again for subsequent detections
#             if warning_displayed and (time.time() - warning_start_time) >= 1:
#                 warning_displayed = False  # Ready for next detection

#         # Show warning for 1 second if applicable
#         if warning_displayed:
#             elapsed_time = time.time() - warning_start_time
#             if elapsed_time < 360:
#                 warning_text = "Warning!!"
#                 cv2.putText(frame, warning_text, (frame.shape[1] // 2 - 150, frame.shape[0] // 2),
#                             cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 3, cv2.LINE_AA)

#         # Encode the frame in JPEG format
#         _, buffer = cv2.imencode('.jpg', frame)
#         frame = buffer.tobytes()

#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# @app.route('/video_feed')
# def video_feed():
#     return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# @app.route('/leaderboard', methods=['GET'])
# def get_leaderboard():
#     connection = get_db_connection()
#     cursor = connection.cursor(dictionary=True)
#     cursor.execute('SELECT * FROM leaderboard')
#     leaderboard = cursor.fetchall()
#     cursor.close()
#     connection.close()
#     return jsonify(leaderboard)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8082, debug=True)

# # Release the capture when done
# atexit.register(lambda: cap.release())