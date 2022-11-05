import * as React from "react";
import { Container } from "reactstrap";

import Navbar from "../components/Navbar";
import Email from "../components/Email";

const Home = () => (
  <React.Fragment>
    <Navbar />
    <hr />
    <Container>
      <Email />
    </Container>
  </React.Fragment>
);

export default Home;
