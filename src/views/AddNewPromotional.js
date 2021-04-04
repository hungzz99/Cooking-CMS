import React from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Form, FormInput, FormTextarea, Button, FormSelect } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import RangeDatePicker from "../components/common/RangeDatePicker";
import './views.css';
const AddNewPromotional = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Add New Recipes" subtitle="" className="text-sm-left" />
    </Row>

    <Card small className="mb-4">
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">Tittle</label>
                    <FormInput
                      placeholder="Tittle*"
                      onChange={() => { }}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                      <label htmlFor="feFirstName">Type </label>
                      <FormSelect id="feInputState">
                        <option>-Choose Types*- </option>
                        <option>Healthy Recipes </option>
                        <option>Easy Recipes</option>
                        <option>Daily Recipes</option>
                        <option>Occasions Recipes</option>
                      </FormSelect>
                    </Col>
                  
                </Row>
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="feDescription">Ingredients</label>
                    <FormTextarea id="feDescription" rows="3" />
                  </Col>
                </Row>
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="feDescription">Preparation</label>
                    <FormTextarea id="feDescription" rows="3" />
                  </Col>
                </Row>

                <Row form>
                  {/* Description */}
                  <Col md="2" className="form-group">
                    <label htmlFor="feDescription">Picture</label>
                    <FormTextarea id="feDescription" rows="5" />
                  </Col>
                </Row>
                <Button theme="accent">Select Picture</Button>
                <Row form>
                <Col md="6" className="form-group">
                    <label htmlFor="feLastName">Time*</label>
                    <FormInput
                      placeholder="Time*"
                      onChange={() => { }}
                    />
                  </Col>
                </Row>
                <Button theme="accent">Add New Recipes</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  </Container>
);

export default AddNewPromotional;
