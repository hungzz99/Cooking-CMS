import React from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Form, FormInput, FormTextarea, Button, FormSelect } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import RangeDatePicker from "../components/common/RangeDatePicker";
// import Editor from "../components/add-new-post/Editor";
// import SidebarActions from "../components/add-new-post/SidebarActions";
// import SidebarCategories from "../components/add-new-post/SidebarCategories";


const ReportInformation = () => (
  <div>
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Report Information" subtitle="" className="text-sm-left" />
      </Row>

      {/* <Row>
      <Col lg="12" md="12">
        <Editor />
      </Col> */}
      {/* <Col lg="3" md="12">
        <SidebarActions />
        <SidebarCategories />
      </Col> */}
      {/* </Row> */}
      <Card small className="mb-4">
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="feFirstName">Promotional </label>
                      <FormSelect id="feInputState">
                        <option>Promotional 1</option>
                        <option>Promotional 2</option>
                        <option>Promotional 3</option>
                        <option>Promotional 4</option>
                        <option>Promotional 5</option>
                        <option>Promotional 6</option>
                      </FormSelect>
                    </Col>
                    <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">Start Date & End Date</label>
                    <RangeDatePicker />
                  </Col>

                    

                  </Row>
                  <Row form>
                  <Col md="6" className="form-group">
                      <label htmlFor="feLastName">MSISDN</label>
                      <FormInput
                        placeholder="Enter MSISDN"
                        onChange={() => { }}
                      />
                    </Col>
                </Row>
                  <Button theme="accent">Export to Excel</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Container>
  </div>
);

export default ReportInformation;
