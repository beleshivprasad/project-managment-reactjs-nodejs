import React from "react";
import { Button, Card, CardGroup, Container } from "react-bootstrap";
import Main from "../../Components/Main/Main";
import data from "../../projects.json";

const Projects = () => {
  return (
    <Main title={" Projects"}>
      <Container>
        <CardGroup>
          {data?.map((item, index) => {
            return (
              <Card style={{ width: "18rem" }} key={item.id}>
                <Card.Img variant="top" src={item.image_url} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button variant="primary"></Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardGroup>
      </Container>
    </Main>
  );
};

export default Projects;
