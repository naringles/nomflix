import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;

const Loader = () => (
  <Container>
    <Helmet>
      <title>Loading... | Nomfilx</title>
    </Helmet>
    <span role="img" aria-label="Loading">
      &#9200;
    </span>
  </Container>
);

export default Loader;
