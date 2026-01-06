import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <strong>Employee Management System</strong>
          </Link>
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Link className="nav-link" to="/">Employees</Link>
          <Link className="nav-link" to="/employee">Post Employee</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
