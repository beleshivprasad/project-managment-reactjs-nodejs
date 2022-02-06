import React, { useState, useEffect } from "react";
import { Button, Card, CardGroup, Container } from "react-bootstrap";
import Main from "../../Components/Main/Main";

import axios from "axios";

const Users = () => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=2", {
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(({ data }) => {
        setData(data.data);
      });
  }, []);

  return (
    <Main title={"Users"}>
      <Container>
        <CardGroup>
          {data?.map((item) => {
            return (
              <Card style={{ width: "18rem" }} key={item.id}>
                <Card.Img
                  variant="top"
                  src={item.avatar}
                  style={{
                    maxWidth: "200px",
                    minHeight: "200px",
                  }}
                />
                <Card.Body>
                  <Card.Title>
                    {item.first_name} {item.last_name}
                  </Card.Title>
                  <Card.Text>{item.email}</Card.Text>
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

export default Users;
