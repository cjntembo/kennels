import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location"

export const LocationList = () => {
  // This state changes when `getLocations()` is invoked below
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("LocationList: useEffect - getLocations")
    getLocations()
  }, [])


  return (
    <section className="locations">
      {
        locations.map(location => {
          return (
            <div className="location" id={`location--${location.id}`}>
              <div className="location__name">
                Name: { location.name }
              </div>
              <div className="location__breed">
                Breed: { location.breed }
              </div>
            </div>
          )
        })
      }
    </section>
  )
}