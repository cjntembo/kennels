import React, { useState, createContext } from "react"


// The context is imported and used by individual components that need data
export const LocationContext = createContext()
const url = 'https://e15-kennels-api-cjntembo.herokuapp.com'

// This component establishes what data can be used.
export const LocationProvider = (props) => {
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch(`${url}/locations?_embed=employees&_embed=animals`)
        .then(res => res.json())
        .then(setLocations)
    }

    const addLocation = location => {
        return fetch(`${url}/locations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
        .then(response => response.json())
    }

    const updateLocation = location => {
        return fetch(`${url}/animals/${location.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(location)
        })
          .then(getLocations)
      }
      
      const getLocationById = (locationId) => {
        return fetch(`${url}/locations/${locationId}`
        )
        .then(res => res.json())
    }

    const removeLocation = locationId => {
        return fetch(`${url}/locations/${locationId}`, {
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