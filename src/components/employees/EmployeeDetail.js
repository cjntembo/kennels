import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { useParams, useHistory } from "react-router-dom"
import "./Employee.css"

export const EmployeeDetail = () => {

    const { releaseEmployee } = useContext(EmployeeContext)
    const history = useHistory()

    const { employees } = useContext(EmployeeContext)
    const [ employee, setEmployee ] = useState({ location: {}})

    const handleRelease = () => {
        releaseEmployee(employee.id)
        .then(() => {
            history.push("/employees")
        })
    }

    /*
        Given the example URL above, this will store the value
        of 5 in the employeeId variable
    */
    const { employeeId } = useParams();


    useEffect(() => {
        const thisEmployee = employees.find(e => e.id === parseInt(employeeId)) || { location: {} }

        setEmployee(thisEmployee)
    }, [employeeId])

    return (
        <>
        <button onClick={handleRelease}>Release Employee</button>
        <button onClick={() => {
            history.push(`/employees/edit/${employee.id}`)
        }}>Edit</button>
        <section className="employee">
            <h3 className="employee__name">{ employee.name }</h3>
            <div className="employee__location">Location: { employee.location.name }</div>
            <div className="employee__manager">Is Manager: {employee.manager}</div>
            <div className="employee__fullTime">Is Full Time: {employee.fullTime}</div>
            <div className="employee__hourlyRate">Hourly Rate: {employee.hourlyRate}</div>
        </section>
    </>
    )
}
