import { Link } from "react-router-dom";
import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

import axios from "axios";

//importing Components
import Loading from "../../Components/Alerts/Loading";
import Main from "../../Components/Main/Main";
import ErrorMessage from "../../Components/Alerts/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //Validation Function
  const fieldValidation = async () => {
    if (!email || !password) {
      setError("Please  Fill All Fields");
    } else if (password.length < 8) {
      setError("Password Should be Minimum 8 character");
    } else {
      return true;
    }
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  //Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fieldValidation();
      if (res) {
      }
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.post(
        "https://reqres.in/api/login",
        {
          email,
          password,
        },
        config
      );

      console.log(data.token === "QpwL5tke4Pnpja7X4");
      if (data.token === "QpwL5tke4Pnpja7X4") {
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        setError("Login Failed");
      }

      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const resetHandler = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };
  return (
    <Main title="Login">
      <Container
        style={{
          width: "60%",
          margin: "auto auto",
        }}
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading></Loading>}
        <Row>
          <Form onSubmit={submitHandler} onReset={resetHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </Form.Group>
            <Row>
              <Col>
                <Button variant="dark" type="submit">
                  Login
                </Button>
              </Col>
              <Col></Col>
              <Col>
                <Button variant="dark" type="reset">
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <hr />
        <Row>
          <Col>
            New User ? <Link to="/user/register">Register Here</Link>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Login;
