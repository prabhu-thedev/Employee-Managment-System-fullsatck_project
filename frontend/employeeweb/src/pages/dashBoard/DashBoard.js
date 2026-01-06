import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.log("Error fetching employees", error.message);
      }
    };
    fetchEmployee();
  }, []);

  const handleDelete = async (id) => {
  try {
    await fetch(`http://localhost:8080/api/employee/${id}`, {
      method: "DELETE",
    });

    setEmployees(employees.filter(emp => emp.id !== id));
  } catch (error) {
    console.log("Error deleting employee", error.message);
  }
};

const hadleUpdate = (employeeId) =>{
  navigate(`/employee/${employeeId}`)
}

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Employees</h1>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone_no}</td>
                  <td>{employee.dept}</td>
                  <td>
                    <Button variant="outline-secondary" size="sm" onClick={()=> hadleUpdate(employee.id)}>
                      Update
                    </Button>{" "}
                    <Button variant="outline-danger" size="sm" onClick={()=> handleDelete(employee.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </Col>
      </Row>
    </Container>
  );
};

export default DashBoard;
