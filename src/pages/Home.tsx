import * as React from "react";
import { Container } from "reactstrap";

import Navbar from "../components/Navbar";
import Email from "../components/Email";
import Posts from "../components/Posts";

const Home = () => (
  <React.Fragment>
    <Navbar />
    <hr />
    <Container>
      <Email />
      <hr />
      <Posts />
    </Container>
  </React.Fragment>
);

export default Home;
