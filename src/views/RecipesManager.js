import React, { Component } from "react";
import algoliasearch from 'algoliasearch/lite';
import {
  connectInfiniteHits
} from 'react-instantsearch-dom';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import './views.css';
import ItemList from '../components/list-item/ItemList'
import { Button } from "@material-ui/core";


const InfiniteHits = ({
  hits,
  hasMore,
  refineNext, }) => (
  <>
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="Recipes List" subtitle="" className="text-sm-left mb-3" />
      </Row>

      <Row>
        <Col md="12">
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
                  {hits.map(hit => (
                    <ItemList key={hit.objectID} post={hit} />
                  ))}
                </tbody>
              </table>
            </CardBody>
            <Col md="12" className="Button-Show" disabled={!hasMore} onClick={refineNext}>
              <Button className="reset-filter1" >
                Show more
              </Button>
            </Col>
          </Card>
        </Col>
      </Row>
    </Container>

  </>
);

const RecipesManager = connectInfiniteHits(InfiniteHits)

export default RecipesManager;
