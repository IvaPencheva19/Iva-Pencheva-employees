import React from "react";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
function EmployeeTable({ data }) {
  return (
    <div>
      <ListGroup>
        <ListGroup.Item variant="info">
          Pair of employees who have worked together on common projects for the
          longest period of time
        </ListGroup.Item>
      </ListGroup>
      <Table striped>
        <thead>
          <tr>
            <th>Employee 1 ID</th>
            <th>Employee 2 ID</th>
            <th>Project ID</th>
            <th>Duration in days</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.emp1ID}</td>
              <td>{item.emp2ID}</td>
              <td>{item.projectID}</td>
              <td>{item.duration}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeTable;
