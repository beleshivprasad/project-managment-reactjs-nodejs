import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

//importing Components
import Loading from "../../Components/Alerts/Loading";
import Main from "../../Components/Main/Main";
import ErrorMessage from "../../Components/Alerts/ErrorMessage";

//Redux Import
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../../redux/actions/userAction";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  //Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
          width: "40%",
          margin: "auto auto",
        }}
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading></Loading>}
        <Row>
          <Form onSubmit={submitHandler} onReset={resetHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                autoComplete={email}
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

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoComplete={password}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br />
            <Row>
              <Col>
                <Button variant="dark" type="submit">
                  Login
                </Button>
              </Col>
              <Col></Col>
              <Col></Col>
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
