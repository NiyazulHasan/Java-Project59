import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
function CreateEmployee()
{

    const navigate = useNavigate();

    const [employees,setEmployees] = useState({
        name:"",
        doj:"",
        dept:{
            deptName:"",
            designation:""
        }
    })
    const [errors,setErrors] = useState({
        name:"",
        doj:"",
        deptName:"",
        designation:""
    })

     const handleCancel=(e)=>{
        e.preventDefault();
        navigate("/");
    }

    const handleChange=(e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        if(name=="name" || name=="doj")
        {
               setEmployees({...employees,[name]:value}); 
        }
        else
        {
            setEmployees({...employees,dept:{...employees.dept,[name]:value}});
        }
        setErrors({...errors,[name]:""});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(validate())
        {
            const formattedDate = dateFormat(employees.doj);
            const employeeData=
            {
                ...employees,doj:formattedDate
            } 

            EmployeeService.addEmployee(employeeData).then(res=>{
                navigate("/");
            })

        }
    }

    const dateFormat=(date)=>{
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2,"0");
        const month = String(d.getMonth()+1).padStart(2,"0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }


 const validate=(e)=>{
        const formErrors = {};
        let isValid=true;

        if(!employees.name)
        {
            formErrors.name="Name is mandatory";
            isValid=false;
        }
        if(!employees.doj)
        {
            formErrors.doj="Date is mandatory";
            isValid=false;
        }
        if(!employees.dept.deptName)
        {
            formErrors.deptName="Department name is mandatory";
            isValid=false;
        }
        if(!employees.dept.designation)
        {
            formErrors.designation="Designation is mandatory";
            isValid=false;
        }
        setErrors(formErrors);
        return isValid;
    }




    return(
        <div className=" container mt-3 pt-5">
                <div className="card w-50 offset-3  p-5">
                    <form>
                    <h3 className="text-center"> Add Employee</h3>
                    <label>Name:</label>
                    <input type="text" name="name" className="form-control"
                    value={employees.name}
                    onChange={handleChange}/>
                    {errors.name && <small className="text-danger"> {errors.name}</small>}
                    <br/>


                    <label>DOJ:</label>
                    <input type="date" name="doj" className="form-control"
                    value={employees.doj}
                    onChange={handleChange}/>
                    {errors.doj && <small className="text-danger"> {errors.doj}</small>}
                    <br/>


                    <label>Department:</label>
                    <input type="text" name="deptName" className="form-control"
                    value={employees.dept.deptName}
                    onChange={handleChange}/>
                    {errors.deptName && <small className="text-danger"> {errors.deptName}</small>}
                    <br/>


                    <label>Designation:</label>
                    <input type="text" name="designation" className="form-control"
                    value={employees.dept.designation}
                    onChange={handleChange}/>
                    {errors.designation && <small className="text-danger"> {errors.designation}</small>}
                    <br/>

                    
                    <button className="btn btn-danger mt-3 float-start" onClick={handleCancel}> cancel </button>
                    <button className="btn btn-success mt-3 float-end" onClick={handleSubmit}> submit </button>
                    </form>
                </div>
        </div>
    )
}
export default CreateEmployee;
