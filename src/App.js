import React, {useEffect, useState } from "react";
import "./App.css";
import getEmpData  from "./api/api";

const pageSize = 10;

function App() {
  const [employeeData , setEmployeeData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const totalPages = employeeData.length ? Math.ceil(employeeData.length / pageSize) : 1;
  const startIndex = (currPage-1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currList = employeeData.slice(startIndex, endIndex);

  const handlePrev = () => {
    if(currPage > 1) {
      setCurrPage((prev)=>  prev-1);
    }
  };

  const handleNext = () => {
    if(currPage < totalPages) {
      setCurrPage((prev)=> prev+1);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmpData();
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        
      }
    };
    fetchData();
  }, []);


  return (
    <div className="App">
      <h1 className="header">Employee Data Table</h1>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currList.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <div className="pagination-controls">
        <button
          onClick={handlePrev}
          
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="pagination-btn">{currPage}</span>
        <button
          onClick={handleNext}
          
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App;