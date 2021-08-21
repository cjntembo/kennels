import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { useParams,useHistory } from "react-router-dom"
import "./Location.css"
// import { EmployeeList } from "../employees/EmployeeList"

export const LocationDetail = () => {

    const { removeLocation } = useContext(LocationContext)
    const history = useHistory()

    const { locations } = useContext(LocationContext)
    const [ location, setLocation ] = useState({ animals:[], employees: [] })

    /*
        Given the example URL above, this will store the value
        of 5 in the employeeId variable
    */
    const { locationId } = useParams();


    useEffect(() => {
        const thisLocation = locations.find(l => l.id === parseInt(locationId)) || { animals:[], employees: [] }

        setLocation(thisLocation)
    }, [locationId])

    const handleRelease = () => {
        removeLocation(location.id)
            .then(() => {
                history.push("/locations")
            })
    }

    return (
        <>
        <button onClick={handleRelease}>Remove Location</button>
        <button onClick={() => {
            history.push(`/locations/edit/${location.id}`)
        }}>Edit</button>
    <section className="location">
        <h3 className="location__name">{ location.name }</h3>
        <div className="location__location">Address: { location.address }</div>
        <div className="location__employees">Employees: { location.employees.map(employee => (employee.name)).join(", ")}</div>
        <div className="location__animals">Animals: {location.animals.map(animal => (animal.name)).join(", ")}</div>
    </section>
    </>
    )
}
