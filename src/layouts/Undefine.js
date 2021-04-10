import React from "react";
import { Container, Row, Col} from "shards-react";

const Undefine = ({ children }) => (
  <Container fluid> 
    <Row>
      <Col
        className="main-content p-0"
        lg={{ size: 12, offset: 0 }}
        md={{ size: 12, offset: 0 }}
        sm="12"
        tag="main"
      >
      {children}
      </Col>
    </Row>
  </Container>
);
export default Undefine;
