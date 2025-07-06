import React, { useState} from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ onRegister, onLogin, isLogin, setIsLogin }) => {
  const [users, setUsers] = useState([]); // This holds the list of registered users
  const navigate = useNavigate();
  // const location = useLocation();
  // const [examTerminated, setExamTerminated] = useState(false);

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   if (params.get('message') === 'exam_terminated') {
  //     setExamTerminated(true);
  //   }
  // }, [location.search]);

  const handleToggle = () => {
    setIsLogin(!isLogin); // Toggle between login and register form
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const loginData = {
      email: form.id.value.trim(), // Email field from login
      password: form.password.value.trim(),
    };

    console.log("Attempting login with:", loginData);

    // Check if a user exists with matching email and password
    const user = users.find(user => user.email === loginData.email && user.password === loginData.password);

    if (user) {
      console.log("User found:", user);
      onLogin(user); // Successful login, pass the user data to App
      navigate('/stdpage', { state: { user } }); // Navigate to StdPage
    } else {
      console.log("Invalid login attempt");
      alert('Invalid login credentials! Please check your email and password.');
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const newUser = {
      name: form.name.value.trim(),
      id: form.id.value.trim(), // Let's keep this as an optional ID
      email: form.email.value.trim(), // We'll use this for login
      password: form.password.value.trim(),
    };

    console.log("Registering new user:", newUser);

    // Check if a user with the same email already exists
    const duplicateUser = users.find(user => user.email === newUser.email);
    if (!duplicateUser) {
      setUsers([...users, newUser]); // Add new user to the users array
      console.log("User successfully registered:", newUser);
      onRegister(newUser); // Pass the registered user data to App
      alert('Registration successful! Now you can login.');
      setIsLogin(true); // Switch to login mode
    } else {
      alert('This email is already registered.');
    }
  };

  return (
    <Container fluid style={{ backgroundColor: '#edf2f4', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} style={{ backgroundColor: '#8d99ae', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '100%' }}>
          <div className="text-center mb-4">
            <Button  style={{backgroundColor:'#2b2d42' , margin:'20px'}} onClick={() => setIsLogin(true)}>Login</Button>
            <Button  style={{backgroundColor:'#2b2d42' , margin:'20px'}} onClick={handleToggle}>Register</Button>
          </div>

          {isLogin ? (
            <Form onSubmit={handleSubmitLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label> {/* Update label to Email */}
                <Form.Control type="email" placeholder="Enter email" name="id" required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" required />
              </Form.Group>

              <Button type="submit" style={{ backgroundColor: '#2b2d42', width: '100%', marginTop: '20px' }}>
                Login
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleSubmitRegister}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" required />
              </Form.Group>

              <Form.Group controlId="formId">
                <Form.Label>ID (Optional)</Form.Label>
                <Form.Control type="text" placeholder="Enter unique ID" name="id" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label> {/* Use email for login */}
                <Form.Control type="email" placeholder="Enter email" name="email" required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" required />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" required />
              </Form.Group>

              <Button type="submit" style={{ backgroundColor: '#2b2d42', width: '100%', marginTop: '20px' }}>
                Register
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
