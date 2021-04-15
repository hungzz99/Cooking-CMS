import React, { Component } from "react";
import algoliasearch from 'algoliasearch/lite';
import {
  connectHits
} from 'react-instantsearch-dom';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import './views.css';
import ItemList from '../components/list-item/ItemList'


const Hits = ({ hits }) => (
  <>
    {hits.map(hit => (
      <ItemList key={hit.objectID} post={hit}/>
    ))}
  </>
);
const CustomHits = connectHits(Hits);

class RecipesManager extends Component {

  constructor(props) {
    super(props);
  }

  render() {
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
                        <CustomHits />
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
