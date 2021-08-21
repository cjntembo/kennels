import React, { useState, createContext } from "react"


// The context is imported and used by individual components that need data
export const LocationContext = createContext()

// This component establishes what data can be used.
export const LocationProvider = (props) => {
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch("http://localhost:8088/locations?_embed=employees&_embed=animals")
        .then(res => res.json())
        .then(setLocations)
    }

    const addLocation = location => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
        .then(response => response.json())
    }

    const updateLocation = location => {
        return fetch(`http://localhost:8088/animals/${location.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(location)
        })
          .then(getLocations)
      }
      
      const getLocationById = (locationId) => {
        return fetch(`http://localhost:8088/locations/${locationId}`
        )
        .then(res => res.json())
    }

    const removeLocation = locationId => {
        return fetch(`http://localhost:8088/locations/${locationId}`, {
            method: "DELETE"
        })
            .then(getLocations)
    }

    return (
        <LocationContext.Provider value={{
            locations, getLocations, addLocation, updateLocation, getLocationById, removeLocation
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}