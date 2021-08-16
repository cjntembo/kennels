import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { useHistory, Link } from 'react-router-dom'
import "./Location.css"

export const LocationList = () => {

  const history = useHistory()
  // This state changes when `getLocations()` is invoked below
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("LocationList: useEffect - getLocations")
    getLocations()
  }, [])

  return (
    <>
      <h1>Locations</h1>

      <button onClick={() => history.push("/locations/create")}>Add Location
      </button>

      <div className="locations">
        {
          locations.map(location => {
            return (
              <div className="location">
                <Link to={`/locations/detail/${location.id}`} key={location.id}>
                  {location.name}
                </Link>
              </div>
            )
          })
        }
      </div>
    </>
  )
}


  // return (
  //   <section className="locations">
  //     {
  //       locations.map(location => {
  //         return (
  //           <div className="location" id={`location--${location.id}`}>
  //             <div className="location__name">
  //               Name: { location.name }
  //             </div>
  //             <div className="location__breed">
  //               Address: { location.address }
  //             </div>
  //           </div>
  //         )
  //       })
  //     }
  //   </section>
  // )


//   // chap 7 and 8
//   const history = useHistory()

//   return (
//       <>
//         <h2>Locations</h2>
//         <button onClick={
//           () => history.push("/locations/create")
//         }>
//               Add Location
//         </button>
//         <div className="locations">
//         {
//           locations.map(location => {
//             return (
//               <div className="location" id={`location--${location.id}`}>
//                 <div className="location__name">
//                   Name: { location.name }
//                 </div>
//                 <div className="location__address">
//                   Breed: { location.address }
//                 </div>
//               </div>
//             )
//           })
//         }
//         </div>
//       </>
//   )
// }