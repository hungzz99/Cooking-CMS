import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Form, FormInput, FormTextarea, Button, FormSelect, CardImg, Modal, ModalBody, ModalHeader} from "shards-react";
import firebase from 'firebase';
import PageTitle from "../components/common/PageTitle";
import './views.css';
import FileBase64 from "../components/react-file-base64";


class AddNewRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: "",
      temp: true,
      title: "",
      type: "",
      ingredient: "",
      preparation: "",
      people: "",
      time: "",
      photoUrl: null,
      file: null,
      open: false,
      content: "",
    }
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  addPost() {
    const dbRef = firebase.database().ref('/posts');
    const pushNewPost = dbRef.push();
    const id = pushNewPost.key;

    // Firebase
    const storageRef = firebase.storage().ref(`posts/${id}`);
    storageRef.put(this.state.file).then(() => {
      console.log(`Put files success!!!`);
      storageRef.getDownloadURL().then((downloadURL) => {
        var newPost = {
          ingredient: this.state.ingredient,
          like: 0,
          people: this.state.people,
          postId: id,
          title: this.state.title,
          type: this.state.type,
          preparation: this.state.preparation,
          time: this.state.time,
          photoUrl: downloadURL,
        };
        pushNewPost.set(newPost).then(() => {
          this.onToggleChange(`Success add new post!`);
        }).catch((error) => {
          this.onToggleChange(`Fail to add new post with error: ${error}`)
        })
      })
    }).catch((error) => {
      this.onToggleChange(`Put file error: ${error}!!!`);
    })
  }

  toggle(){
    this.setState({
      open: !this.state.open,
    })
  }

  onToggleChange(content) {
    // Update UI to notify update success
    console.log(content);
    this.setState({
      content: content,
    }, () => {this.toggle()})
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeImage(e) {
    this.setState({
      file: e.target.files[0],
      photoUrl: URL.createObjectURL(e.target.files[0])
    })
  }

  onClick(e) {
    e.preventDefault();
    this.addPost();
  }

  getFiles(files) {
    this.setState({
      files: files,
      temp: false
    })
  }

  render() {
    return (
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
                        <label htmlFor="feFirstName">Tittle
                    <span className="span-color"> *</span></label>
                        <FormInput
                          placeholder="Tittle*"
                          name="title"
                          onChange={this.onChange}
                        />
                      </Col>
                      <Col md="6" className="form-group">
                        <label htmlFor="feFirstName">Type
                      <span className="span-color"> *</span> </label>
                        <FormSelect id="feInputState" name="type" onChange={this.onChange}>
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
                        <label htmlFor="feDescription">Ingredients
                    <span className="span-color"> *</span></label>
                        <FormTextarea id="feDescription" rows="3" name="ingredient" onChange={this.onChange} />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="12" className="form-group">
                        <label htmlFor="feDescription">Preparation
                    <span className="span-color"> *</span></label>
                        <FormTextarea id="feDescription" rows="3" name="preparation" onChange={this.onChange} />
                      </Col>
                    </Row>

                    <Row form>
                      {/* Description */}
                      <Col md="2" className="form-group">
                        <label htmlFor="feDescription">Picture
                    <span className="span-color"> *</span></label>
                        <br />
                        {<CardImg width="400px" height="250px" src={this.state.photoUrl} />}
                      </Col>
                    </Row>
                    <Col md="12" className="form-group">
                      <input type="file" onChange={this.onChangeImage} name="photoUrl" className="InputFile" />
                    </Col>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="feLastName">Time
                    <span className="span-color"> *</span></label>
                        <FormInput
                          name="time"
                          placeholder="Time*"
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
                          onChange={this.onChange}
                        />
                      </Col>
                    </Row>
                    <Button theme="accent" onClick={this.onClick}>Add New Recipes</Button>
                    <Modal open={this.state.open} toggle={this.toggle}>
                      <ModalBody> {this.state.content} </ModalBody>
                    </Modal>
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

export default AddNewRecipes;
