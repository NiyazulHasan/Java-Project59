import {useTypewriter, Cursor} from 'react-simple-typewriter';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
function EmployeeList()
{
    const [employee,setEmployee]= useState([]);

    const [value] = useTypewriter({
        words : ["Details", "List", "Info"],
        loop : true,
        typeSpeed : 120,
        deleteSpeed : 80
    })

    useEffect(()=>{
    EmployeeService.getAllEmployees().then(res =>{
        setEmployee(res.data);
    })
  },[]);

  const deleteEmployee =(id)=>
  {
        EmployeeService.deleteEmployee(id).then(res=>{
            EmployeeService.getAllEmployees().then(res=>{
                setEmployee(res.data);
            })
            .catch(error=>{
                console.log(error);
            })
        })
    } 



    return(
        <div className="container mt-5 p-5">
            <h4 className="text-center"> Employee {value}<Cursor/> </h4>
            <div className='row mt-5'>
    <Link to="/add-emp" className='btn btn-dark' style={{width:"237px"}}> Add Employee </Link>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>DOJ</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map(employee=>{
                                return <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.doj}</td>
                                            <td>{employee.dept.deptName}</td>
                                            <td>{employee.dept.designation}</td>
                                            <td>
    <Link to={`/update-emp/${employee.id}`} className='btn btn-warning'> update </Link>
    <button className='btn btn-danger ms-3' onClick={(e)=> deleteEmployee(employee.id)}> delete</button>
                                            </td>
                                        </tr>
                            })
                        }
                    </tbody>
                </table>    
            </div>
        </div>
    )
}
export default EmployeeList;
