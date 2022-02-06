import React, { useState, useEffect } from "react";
import { Container, Image, Row } from "react-bootstrap";
import Main from "../../Components/Main/Main";

import axios from "axios";

const MyProfile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/9`, {
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
    <Main title={"MyProfile"}>
      <Container
        style={{
          border: "0.5px solid white",
          padding: "5%",
          boxShadow: "10px 5px 8px",
        }}
      >
        <Row style={{ marginLeft: "auto" }}>
          <Image
            src={data.avatar}
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              borderRadius: "50%",
            }}
          ></Image>
        </Row>
        <br />
        <Row>
          <h4>
            Name : {data.first_name} {data.last_name}
          </h4>
        </Row>
        <Row>
          <a target={`_blank`} href={`mailto:${data.email}`}>
            <h4>Email : {data.email}</h4>
          </a>
        </Row>
      </Container>
    </Main>
  );
};

export default MyProfile;
