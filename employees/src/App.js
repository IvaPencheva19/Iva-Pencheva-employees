import "./App.css";
import React, { useState, useEffect } from "react";
import FileForm from "./components/form/FileForm";
import EmployeeTable from "./components/table/EmployeeTable";
const App = () => {
  const [fileContent, setFileContent] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileContent }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [fileContent]);

  return (
    <div className="App">
      <FileForm setFileContent={setFileContent} />
      {data.length > 0 ? <EmployeeTable data={data} /> : null}
    </div>
  );
};

export default App;
