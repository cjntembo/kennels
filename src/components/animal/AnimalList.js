import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { useHistory, Link } from 'react-router-dom'
import { Animal } from "./Animal"
import { AnimalDetail } from "./AnimalDetail"
import "./Animal.css"

export const AnimalList = () => {
  const { animals, getAnimals, searchTerms } = useContext(AnimalContext)

  // Since you are no longer ALWAYS displaying all of the animals
  const [ filteredAnimals, setFiltered ] = useState([])
  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getAnimals()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(animals)
    }
  }, [searchTerms, animals])

  return (
    <>
      <h1>Animals</h1>

      <button onClick={() => history.push("/animals/create")}>
          Make Reservation
      </button>
      <div className="animals">
      {
        filteredAnimals.map(animal => {
          return <AnimalDetail key={animal.id} animal={animal} />
        })
      }
      </div>
    </>
  )
}

// chap 11 and 12
// export const AnimalList = () => {

//   const history = useHistory()
//   const { getAnimals, animals } = useContext(AnimalContext)

//   // Initialization effect hook -> Go get animal data
//   useEffect(()=>{
//       getAnimals()
//   }, [])

//   return (
//       <>
//           <h1>Animals</h1>

//           <button onClick={() => history.push("/animals/create")}>
//               Make Reservation
//           </button>

//           <div className="animals">
//               {
//                   animals.map(animal => {return (
//                   <div className="animal">
//                     <Link to={`/animals/detail/${animal.id}`} key={animal.id}>
//                         { animal.name }
//                     </Link>
//                     </div>
//                   )
//                 })
//               }
//           </div>
//       </>
//   )
// }


// export const AnimalList = () => {
//   // This state changes when `getAnimals()` is invoked below
//   const { animals, getAnimals } = useContext(AnimalContext)

//   //useEffect - reach out to the world for something
//   useEffect(() => {
//     console.log("AnimalList: useEffect - getAnimals")
//     getAnimals()
//   }, [])


  // Below is code before chap 7
  // return (
  //   <section className="animals">
  //     {
  //       animals.map(animal => {
  //         return (
  //           <div className="animal" id={`animal--${animal.id}`}>
  //             <div className="animal__name">
  //               Name: { animal.name }
  //             </div>
  //             <div className="animal__breed">
  //               Breed: { animal.breed }
  //             </div>
  //           </div>
  //         )
  //       })
  //     }
  //   </section>
  // )


//   // below is code from chap 7
//   // Invoke the useHistory() hook function
// const history = useHistory()

// return (
//     <>
//       <h2>Animals</h2>
//       <button onClick={
//         () => history.push("/animals/create")
//       }>
//             Add Animal
//       </button>
//       <div className="animals">
//       {
//         animals.map(animal => {
//           return (
//             <div className="animal" id={`animal--${animal.id}`}>
//               <div className="animal__name">
//                 Name: { animal.name }
//               </div>
//               <div className="animal__breed">
//                 Breed: { animal.breed }
//               </div>
//             </div>
//           )
//         })
//       }
//       </div>
//     </>
// )
// }
