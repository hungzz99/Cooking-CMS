import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Form, FormInput, FormTextarea, Button, FormSelect } from "shards-react";
import { Link } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import { useParams } from 'react-router-dom';
import './views.css';
import firebase from 'firebase';

class Update extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "Loading...",
      type: "Loading...",
      ingredient: "Loading...",
      preparation: "Loading...",
      people: "Loading...",
      time: "Loading...",
      pictureUrl: "",
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    firebase.database().ref(`posts/${this.props.postId}`).get().then(snapshot => {
      if (snapshot.exists()) {
        this.setState({
          title: snapshot.val().title,
          type: snapshot.val().type,
          ingredient: snapshot.val().ingredient,
          preparation: snapshot.val().preparation,
          people: snapshot.val().people,
          time: snapshot.val().time,
          pictureUrl: snapshot.val().photoUrl,
        })
      }
    })
  }

  onClick(e) {
    e.preventDefault();
    this.updatePost()
  }

  updatePost() {
    var newPost = {
      ingredient: this.state.ingredient,
      like: 0,
      people: this.state.people,
      postId: this.props.postId,
      title: this.state.title,
      type: this.state.type,
      preparation: this.state.preparation,
      time: this.state.time,
      photoUrl: this.state.pictureUrl,
    };
    var update = {}
    update[`posts/${this.props.postId}`] = newPost;
    firebase.database().ref().update(update).then(() => {
      this.onUpdateSuccess();
    }).catch((error) => {
      console.log(`Update Fail! Error: ${error}`);
    })
  }

  onUpdateSuccess() {
    // Update UI to notify update success
    console.log("Update Successful");
  }

  onChange(e) {
    console.log(`${e.target.name} : ${e.target.value}`);
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Update Recipes" subtitle="" className="text-sm-left" />
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
                          name="title"
                          placeholder="Tittle*"
                          value={this.state.title}
                          onChange={this.onChange}
                        />
                      </Col>
                      <Col md="6" className="form-group">
                        <label htmlFor="feFirstName">Type </label>
                        <FormSelect id="feInputState" value={this.state.type} name="type" onChange={this.onChange}>
                          <option value="">-Choose Types*- </option>
                          <option value="Healthy">Healthy</option>
                          <option value="Easy">Easy</option>
                          <option value="Daily">Daily</option>
                          <option value="Occasions">Occasions</option>
                        </FormSelect>
                      </Col>

                    </Row>
                    <Row form>
                      <Col md="12" className="form-group">
                        <label htmlFor="feDescription">Ingredients</label>
                        <FormTextarea id="feDescription" rows="3" name="ingredient" onChange={this.onChange} value={this.state.ingredient} />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="12" className="form-group">
                        <label htmlFor="feDescription">Preparation</label>
                        <FormTextarea id="feDescription" rows="3" name="preparation" onChange={this.onChange} value={this.state.preparation} />
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
                        <label htmlFor="feLastName">Time* (minutes)</label>
                        <FormInput
                          name="time"
                          placeholder="Time*"
                          value={this.state.time}
                          onChange={this.onChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="feLastName">People</label>
                        <FormInput
                          name="people"
                          placeholder="People"
                          value={this.state.people}
                          onChange={this.onChange}
                        />
                      </Col>
                    </Row>
                    <ListGroupItem className="d-flex px-3 border-0">
                      <Link to="/recipes-manager">
                        <Button outline theme="accent" size="sm">
                          <i className="material-icons">fast_rewind</i> Turn Back
                        </Button>
                      </Link>
                      <Button theme="accent" size="sm" className="ml-auto" onClick={this.onClick}>
                        <i className="material-icons" >file_copy</i> Update Recipe
                      </Button>
                    </ListGroupItem>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Container>
    )
  }
}

function withUpdatesHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useParams();
    return <Component {...props} postId={myHookValue.id} />
  }
}
export default withUpdatesHook(Update);
