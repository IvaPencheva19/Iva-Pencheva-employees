import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
const FileForm = ({ setFileContent }) => {
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = (event) => {
      setFileContent(event.target.result);
    };
  };

  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <ListGroup.Item variant="dark">
          Choose CSV file to process the data
        </ListGroup.Item>
        <Form.Control type="file" accept=".csv" onChange={handleFileSelect} />
      </Form.Group>
    </div>
  );
};

export default FileForm;
