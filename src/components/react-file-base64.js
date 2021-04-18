

import React from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Form, FormInput, FormTextarea, Button, CardImg, CardBody, FormSelect } from "shards-react";
import './components.css';
export default class FileBase64 extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      files: [],
    };
  }

  handleChange(e) {

    let files = e.target.files;
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };
        allFiles.push(fileInfo);
        if(allFiles.length === files.length){
          if(this.props.multiple) this.props.onDone(allFiles);
          else this.props.onDone(allFiles[0]);
        }
      } 
    } 
  }
  render() {
    return (
      // <Button theme="accent" onChange={this.handleChange.bind(this)} multiple={this.props.multiple}>Picture</Button>
      <input
        type="file"
        onChange={ this.handleChange.bind(this) }
        multiple={ this.props.multiple }
        className="InputFile"
        />
    );
  }
}

FileBase64.defaultProps = {
  multiple: false,
};
