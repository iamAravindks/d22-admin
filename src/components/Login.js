
import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFireBase } from "../context/FireContext";



const Login = () =>
{
    const [formData, setFormdata] = useState({
        email: "",
        password:""
    })
  const {login,}=useFireBase()


    const history = useNavigate();

    const handleForm = (e, type) =>
    {
        if (type === "email")
            setFormdata((prevState) => ({
              email: e.target.value,
              password: prevState.password,
            }));
        else if (type === "password")
            setFormdata((prevState) => ({
              email: prevState.email,
              password: e.target.value,
            }));
    }
    const formSubmit = async(e) =>
    {
      e.preventDefault()

    try {
      await login(formData.email, formData.password)
      history('/')
    } catch {
    }

    }
    
  return (
    <div className="login" onSubmit={(e) => formSubmit(e)}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => handleForm(e, "email")}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleForm(e, "password")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login