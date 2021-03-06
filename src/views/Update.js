import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Form, FormInput, FormTextarea, Button, FormSelect, CardImg, Modal, ModalBody } from "shards-react";
import { Link } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import { useParams } from 'react-router-dom';
import './views.css';
import firebase from 'firebase';

class Update extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temp: true,
      files: [],
      title: "Loading...",
      type: "Loading...",
      ingredient: "Loading...",
      preparation: "Loading...",
      people: "Loading...",
      time: "Loading...",
      photoUrl: "",
      file: null,
      open: false,
      content: "",
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleValidation() {
    if (this.state.title != null && this.state.type != null && this.state.ingredient != null && this.state.preparation != null && this.state.time > 0 && this.state.people > 0 && this.state.photoUrl != null) {
        this.updatePost();
    } else {
      this.onToggleChange(`Invalid input data!!!`);
    }
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
          photoUrl: snapshot.val().photoUrl,
        })
      }
    })
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    })
  }

  onToggleChange(content) {
    console.log(content);
    this.setState({
      content: content,
    }, () => { this.toggle() })
  }

  onClick(e) {
    e.preventDefault();
    this.handleValidation()
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
      photoUrl: this.state.photoUrl,
    };
    var update = {}
    update[`posts/${this.props.postId}`] = newPost;
    firebase.database().ref().update(update).then(() => {
      this.onToggleChange(`Success update post!`);
    }).catch((error) => {
      this.onToggleChange(`Fail to update post with error: ${error}`)
    })
  }

  uploadImage() {
    const storageRef = firebase.storage().ref(`posts/${this.props.postId}`);
    storageRef.put(this.state.file).then(() => {
      console.log(`Put files success!!!`);
      storageRef.getDownloadURL().then((downloadURL) => {
        this.setState({
          photoUrl: downloadURL
        }, () => {
          this.updatePost();
        })
      }).catch((error) => {
        this.onToggleChange(`Get download link: ${error}`)
      })
    }).catch((error) => {
      this.onToggleChange(`put file error: ${error}`)
    })
  }

  onChangeImage(e) {
    this.setState({
      file: e.target.files[0],
      photoUrl: URL.createObjectURL(e.target.files[0])
    })
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
                          invalid={this.state.title ? (false) : (true)}
                          valid={this.state.title ? (true) : (false)}
                          name="title"
                          placeholder="Tittle*"
                          value={this.state.title}
                          onChange={this.onChange}
                        />
                      </Col>
                      <Col md="6" className="form-group">
                        <label htmlFor="feFirstName">Type </label>
                        <FormSelect id="feInputState" value={this.state.type} name="type" onChange={this.onChange}
                        invalid={this.state.type ? (false) : (true)}
                        valid={this.state.type ? (true) : (false)}
                        >
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
                        <FormTextarea id="feDescription" rows="5" name="ingredient" onChange={this.onChange} value={this.state.ingredient} 
                        invalid={this.state.ingredient ? (false) : (true)}
                        valid={this.state.ingredient ? (true) : (false)}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="12" className="form-group">
                        <label htmlFor="feDescription">Preparation</label>
                        <FormTextarea id="feDescription" rows="5" name="preparation" onChange={this.onChange} value={this.state.preparation}
                        invalid={this.state.preparation ? (false) : (true)}
                        valid={this.state.preparation ? (true) : (false)}
                         />
                      </Col>
                    </Row>

                    <Row form>
                      <Col md="2" className="form-group">
                        <label htmlFor="feDescription">Picture</label>
                        <br />
                        {/* {this.state.temp ? (<img src={this.state.photoUrl} width="400px" height="250px" onChange={this.onChangeImage} />) : (undefined)} */}
                        {<CardImg width="400px" height="250px" src={this.state.photoUrl} />}
                      </Col>
                      <Col md="12" className="form-group">
                        <input type="file" onChange={this.onChangeImage} name="file" className="InputFile" />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="feLastName">Time* (minutes)</label>
                        <FormInput
                          type="number"
                          name="time"
                          placeholder="Time*"
                          value={this.state.time}
                          onChange={this.onChange}
                          invalid={this.state.time ? (false) : (true)}
                          valid={this.state.time ? (true) : (false)}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="feLastName">People</label>
                        <FormInput
                          type="number"
                          name="people"
                          placeholder="People"
                          value={this.state.people}
                          onChange={this.onChange}
                          invalid={this.state.title ? (false) : (true)}
                          valid={this.state.title ? (true) : (false)}
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
                      <Modal open={this.state.open} toggle={this.toggle}>
                        <ModalBody> {this.state.content} </ModalBody>
                      </Modal>
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
