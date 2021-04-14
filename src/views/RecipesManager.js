import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import './views.css';
import firebase from 'firebase';
import ItemList from '../components/list-item/ItemList'

class RecipesManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      latestPostId: null
    };
  }

  componentDidMount() {
    this.getAllPost()
  }

  getLatestPost() {
    const db = firebase.database().ref("posts").limitToLast(1)
    db.get().then(snapshot => {
      this.setState({
        latestPostId: snapshot.val().postId
      })
    }, () => this.getAllPost())
  }

  getAllPost() {
    let posts = [];
    const db = firebase.database().ref("posts")
    db.on('value', (snapshots) => {
      posts = [];
      snapshots.forEach(post => {
        posts.push(post.val())
        this.setState({
          posts: posts
        })
      })
    });
  }


  render() {
    const item = (this.state.posts == null) ? <p>Loading...</p> : this.state.posts.map(post => {
      return(<ItemList key={post.postId} post={post} />)
    });
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

      </>
    );
  }
}
export default RecipesManager;
