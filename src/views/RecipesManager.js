import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, CardImg, Button } from "shards-react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PageTitle from "../components/common/PageTitle";
import './views.css';
import firebase from 'firebase';
import ItemList from '../components/list-item/ItemList'

class RecipesManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    let posts = [];
    const db = firebase.database().ref("posts")
    db.on('child_added', (post) => {
      posts.push(post.val())
      this.setState({ posts: posts });
    });
  }


  render() {
    const item = this.state.posts.map(post => <ItemList key={post.postId} post={post} />)
    return (
      <>
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle title="Recipes List" subtitle="" className="text-sm-left mb-3" />
          </Row>

          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h5 className="m-0">Recipes Results</h5>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          ID
                  </th>
                        <th scope="col" className="border-0">
                          Tittle
                  </th>
                        <th scope="col" className="border-0">
                          Type of Recipes
                  </th>
                        <th scope="col" className="border-0">
                          Image
                  </th>
                        <th scope="col" className="border-0">
                          Cooking Times
                  </th>
                        <th scope="col" className="border-0">
                          Actions
                  </th>
                      </tr>
                    </thead>
                    <tbody>
                      {item}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Recipes List Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="success">
              Cancel
          </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
          </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
export default RecipesManager;
