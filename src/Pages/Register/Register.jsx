import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import Main from "../../Components/Main/Main";
import ErrorMessage from "../../Components//Alerts/ErrorMessage";
import Loading from "../../Components/Alerts/Loading";

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !fname ||
      !lname ||
      !email ||
      !gender ||
      !password ||
      !confirmPassword
    ) {
      setMessage("All Fields are Required..!");
      setInterval(() => {
        setMessage(null);
      }, 2000);
    } else if (password !== confirmPassword) {
      setMessage("Password Don't Match");
      setInterval(() => {
        setMessage(null);
      }, 2000);
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);
        const { data } = await axios.post(
          "/users/register",
          {
            fname,
            lname,
            gender,
            email,
            password,
          },
          config
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        history.push("/login");
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
        setInterval(() => {
          setError(false);
        }, 2000);
      }
    }
  };

  return (
    <Main title="Register">
      <Container
        style={{
          width: "60%",
          margin: "auto auto",
        }}
      >
        <Row>
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading></Loading>}
        </Row>
        <Row>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="fname">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lname">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                as="select"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete=""
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cnfpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                autoComplete=""
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Register
            </Button>
          </Form>
        </Row>
        <hr />
        <Row>
          <Col>
            Already registered ? <Link to="/user/login">Login Here</Link>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Register;
