import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Main.css";

const Main = ({ title, children }) => {
  return (
    <div className="mainBack">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
