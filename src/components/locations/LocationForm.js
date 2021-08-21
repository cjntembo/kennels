import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider";
import { EmployeeContext } from "../employees/EmployeeProvider";
import "./Location.css"
import { useHistory, useParams } from 'react-router-dom';
// import { LocationList } from "./LocationList";

export const LocationForm = () => {
  const { addLocation, getLocationById, updateLocation } = useContext(LocationContext)
  const { animals, getAnimals } = useContext(AnimalContext)
  const { employees, getEmployees } = useContext(EmployeeContext)
  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

  Define the initial state of the form inputs with useState()
  */

  const [location, setLocation] = useState({
    name: "",
    address: "",
    employeeId: 0,
    animalId: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const {locationId} = useParams();
  const history = useHistory();

  /*
  Reach out to the world and get customers state
  and locations state on initialization.
  */
  // useEffect(() => {
  //   getLocations().then(getEmployees).then(getAnimals)
  // }, [])


  useEffect(() => {
    getEmployees().then(getAnimals).then(() => {
      if (locationId){
        getLocationById(locationId)
        .then(location => {
            setLocation(location)
            setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChangeLocation = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newLocation = { ...location }
    /* Animal is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newLocation[event.target.id] = event.target.value
    // update state
    setLocation(newLocation)
  }


  const handleSaveLocation = () => {
    if (parseInt(location.id) === 0) {
      window.alert("Please Select a Location")
    } else {
      setIsLoading(true);
      if (locationId){
        updateLocation({
          id: location.id,
          name: location.name,
          address: location.address,
          employeeId: parseInt(location.employeeId),
          animalId: parseInt(location.animalId)
        })
        .then(() => history.push(`/locations`))
      } else {
        addLocation({
          name: location.name,
          address: location.address,
          employeeId: location.employeeId,
          animalId: location.animalId
        })
        .then(() => history.push("/locations"))
      }
    }
  }
  // const handleClickSaveLocation = (event) => {
  //   event.preventDefault() //Prevents the browser from submitting the form

  //   const locationId = parseInt(location.id)
    

  //   if (locationId === 0) {
  //     window.alert("Please select a location")
  //   } else {
  //     //Invoke addAnimal passing the new animal object as an argument
  //     //Once complete, change the url and display the animal list

  //     const newLocation = {
  //       name: location.name,
  //       address: location.address
  //     }
  //     addLocation(newLocation)
  //       .then(() => history.push("/locations"))
  //   }
  // }

  return (
    <form className="locationForm">
      <h2 className="locationForm__title">New Location</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Location name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Location name" value={location.name} onChange={handleControlledInputChangeLocation} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="address">Location Address:</label>
          <input type="text" id="address" required autoFocus className="form-control" placeholder="Location address" value={location.address} onChange={handleControlledInputChangeLocation} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="employeeId">Employee: </label>
          <select value={location.employeeId} name="employeeId" id="location_employee" className="form-control" onChange={handleControlledInputChangeLocation}>
            {employees.map(employee => ( <option key={employee.id} value={employee.id}>
              {location.employeeId}
            </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="animalId"> Animal: </label>
          <select value={location.animalId} name="animalId" id="location_animal" className="form-control" onChange={handleControlledInputChangeLocation}>
            {animals.map(animal => ( <option key={animal.id} value={animal.id}>
              {location.animalId}
            </option>
              ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
      disabled={isLoading}
      onClick={event => {
        event.preventDefault()
        handleSaveLocation()
      }}>
        {locationId ? <>Save Location</> : <> Add Location</>}</button>
    </form>
  )
}
