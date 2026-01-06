import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateUser.css";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔥 FIELD NAMES MATCH ENTITY EXACTLY
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    dept: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔥 Load previous data
  useEffect(() => {
    const fetchEmployee = async () => {
      const res = await fetch(
        `http://localhost:8080/api/employee/${id}`
      );
      const data = await res.json();

      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone_no: data.phone_no || "",
        dept: data.dept || "",
      });
    };

    fetchEmployee();
  }, [id]);

  // 🔥 Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/employee/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    navigate("/");
  };

  return (
    <div className="center-form">
      <h1>Edit Employee</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="phone_no"
            value={formData.phone_no}
            onChange={handleInputChange}
            placeholder="Phone"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="dept"
            value={formData.dept}
            onChange={handleInputChange}
            placeholder="Department"
          />
        </Form.Group>

        <Button type="submit" className="w-100">
          Confirm Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;