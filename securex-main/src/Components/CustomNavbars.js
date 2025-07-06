import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function CustomNavbars() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Left side - Logo and Brand Name */}
        <Navbar.Brand href="#home">
          {/* <img
            src="logo.png" // Add your logo source here
            alt="SecureX Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          /> */}
          {' '}SecureX
        </Navbar.Brand>
        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Right side - Navigation Links */}
          <Nav className="ms-auto">
            <Nav.Link href="#blog">Blog</Nav.Link>
            <Nav.Link href="#product">Product</Nav.Link>
            <Nav.Link href="#community">Community</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbars;
