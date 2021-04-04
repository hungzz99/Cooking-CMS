import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    ListGroup,
    ListGroupItem,
    Button
} from "shards-react";

const Details = ({ title }) => (
    <Card small className="mb-3">
        <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
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
                        <strong className="text-success">1</strong>{" "}
                    </span>
                    <span className="d-flex mb-2">
                        <i className="material-icons mr-1">attachment</i>
                        <strong className="mr-1">Tittle:</strong>{" "}
                        <strong className="text-success">Chichken</strong>{" "}
                    </span>
                    <span className="d-flex">
                        <i className="material-icons mr-1">score</i>
                        <strong className="mr-1">Type Recipes:</strong>{" "}
                        <strong className="text-warning">Healthy</strong>
                    </span>
                    <span className="d-flex">
                        <i className="material-icons mr-1">aspect_ratio</i>
                        <strong className="mr-1">Image:</strong>{" "}
                        <strong className="text-warning">Ok</strong>
                    </span>
                    <span className="d-flex mb-2">
                        <i className="material-icons mr-1">topic</i>
                        <strong className="mr-1">Ingredients: abc</strong> 
                    </span>
                    <span className="d-flex mb-2">
                        <i className="material-icons mr-1">new_releases</i>
                        <strong className="mr-1">Preparation: abc</strong> 
                    </span>
                    <span className="d-flex mb-2">
                        <i className="material-icons mr-1">calendar_today</i>
                        <strong className="mr-1">Time: 15 minues </strong> 
                    </span>
                    
                    
                </ListGroupItem>
                <ListGroupItem className="d-flex px-3 border-0">
                    <Link to="/promotional-list">
                        <Button outline theme="accent" size="sm">
                            <i className="material-icons">fast_rewind</i> Turn Back
                        </Button>
                    </Link>
                    <Link to="/update">
                    <Button theme="accent" size="sm" className="ml-auto">
                        <i className="material-icons">file_copy</i> Update
                    </Button>
                    </Link>
                </ListGroupItem>
            </ListGroup>
        </CardBody>
    </Card>
);

Details.propTypes = {
    title: PropTypes.string
};

Details.defaultProps = {
    title: "Promotion Details"
};

export default Details;
