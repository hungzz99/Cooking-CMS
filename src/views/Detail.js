import { Link } from "react-router-dom";
import React, { Component } from "react";
import { useParams } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    ListGroup,
    ListGroupItem,
    Button
} from "shards-react";
import firebase from 'firebase';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentTitle: "Recipe details",
            title: "",
            type: "",
            ingredient: "",
            preparation: "",
            people: 0,
            time: 0,
            pictureUrl: "",
        }
    }

    componentDidMount() {
        this.getPostInfo()
    }

    getPostInfo() {
        console.log("geting Info");
        const db = firebase.database()
        db.ref(`posts/${this.props.postId}`).on('value', snapshot => {
            if (snapshot.exists) {
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

    render() {
        console.log(this.state);
        return (
            <Card small className="mb-3">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">{this.state.componentTitle}</h6>
                </CardHeader>

                <CardBody className="p-0">
                    <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <span className="d-flex mb-2">
                                <i className="material-icons mr-1">visibility</i>
                                <strong className="mr-1">Visibility:</strong>{" "}
                                <strong className="text-success">Public</strong>{" "}
                            </span>
                            <span className="d-flex mb-2">
                                <i className="material-icons mr-1">fingerprint</i>
                                <strong className="mr-1">ID:</strong>{" "}
                                <strong className="text-success">{this.props.postId}</strong>{" "}
                            </span>
                            <span className="d-flex mb-2">
                                <i className="material-icons mr-1">attachment</i>
                                <strong className="mr-1">Tittle:</strong>{" "}
                                <strong className="text-success">{this.state.title}</strong>{" "}
                            </span>
                            <span className="d-flex">
                                <i className="material-icons mr-1">score</i>
                                <strong className="mr-1">Type Recipes:</strong>{" "}
                                <strong className="text-warning">{this.state.type}</strong>
                            </span>
                            <span className="d-flex">
                                <i className="material-icons mr-1">aspect_ratio</i>
                                <strong className="mr-1">Image:</strong>{" "}
                                <strong className="text-warning">Ok</strong>
                            </span>
                            <span className="d-flex mb-2">
                                <i className="material-icons mr-1">topic</i>
                                <strong className="mr-1">Ingredients: {this.state.ingredient}</strong>
                            </span>
                            <span className="d-flex mb-2">
                                <i className="material-icons mr-1">new_releases</i>
                                <strong className="mr-1">Preparation: {this.state.preparation}</strong>
                            </span>
                            <span className="d-flex mb-2">
                                <i className="material-icons mr-1">calendar_today</i>
                                <strong className="mr-1">Time: {this.state.time} minues </strong>
                            </span>


                        </ListGroupItem>
                        <ListGroupItem className="d-flex px-3 border-0">
                            <Link to="/promotional-list">
                                <Button outline theme="accent" size="sm">
                                    <i className="material-icons">fast_rewind</i> Turn Back
                        </Button>
                            </Link>
                            <Link to={`/update/${this.props.postId}`}>
                                <Button theme="accent" size="sm" className="ml-auto">
                                    <i className="material-icons">file_copy</i> Update
                    </Button>
                            </Link>
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>
        )
    }
}


function withDetailsHook(Component) {
    return function WrappedComponent(props) {
        const myHookValue = useParams();
        return <Component {...props} postId={myHookValue.id} />
    }
}

export default withDetailsHook(Details);