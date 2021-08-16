import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { useParams } from "react-router-dom"
import "./Location.css"
import { EmployeeList } from "../employees/EmployeeList"

export const LocationDetail = () => {
    const { locations } = useContext(LocationContext)
    const [ location, setLocation ] = useState({ location: {}})

    /*
        Given the example URL above, this will store the value
        of 5 in the employeeId variable
    */
    const { locationId } = useParams();


    useEffect(() => {
        const thisLocation = locations.find(l => l.id === parseInt(locationId)) || { location: {} }

        setLocation(thisLocation)
    }, [locationId])

    return (
    <section className="location">
        <h3 className="location__name">{ location.name }</h3>
        <div className="location__location">Address: { location.address }</div>
        <div className="location__employees">Employees: { location.employees }</div>
        <div className="location__animals">Animals: {location.animals}</div>
    </section>
    )
}
