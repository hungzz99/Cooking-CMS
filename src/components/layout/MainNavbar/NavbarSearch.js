import React, { Component } from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";
import {
  connectSearchBox
} from 'react-instantsearch-dom';

const SearchBox = ({ currentRefinement, refine }) => (
  <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex" onSubmit={(e) => { e.preventDefault(); }}>
    <InputGroup seamless className="ml-3">
      <InputGroupAddon type="prepend">
        <InputGroupText>
          <i className="material-icons" >search</i>
        </InputGroupText>
      </InputGroupAddon>
      <FormInput
        type="search"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
        className="navbar-search"
        placeholder="Search for something..."
      />
    </InputGroup>
  </Form>
);
const CustomSearchBox = connectSearchBox(SearchBox);
class NavbarSearch extends Component {

  render() {
    if (window.location.pathname === '/recipes-manager') {
      return(
        <CustomSearchBox />
      )
    } else {
      return(
        <></>
      )
    }
  }
}

export default NavbarSearch;
