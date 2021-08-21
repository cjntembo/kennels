import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { AnimalContext } from "./AnimalProvider"
// Update this line of code to include releaseAnimal
import "./Animal.css"

export const AnimalDetail = (props) => {
    
    const {animals, releaseAnimal } = useContext(AnimalContext)
    const history = useHistory()

    
    // const { animals } = useContext(AnimalContext)
    const [ animal, setAnimal ] = useState({ location: {}, customer: {} })

    const handleRelease = () => {
        releaseAnimal(props.animal.id)
            .then(() => {
                history.push("/animals")
            })
    }
    /*
        Given the example URL above, this will store the value
        of 5 in the animalId variable
    */
    const { animalId } = useParams();


    useEffect(() => {
        const thisAnimal = animals.find(a => a.id === parseInt(animalId)) || { location: {}, customer: {} }

        setAnimal(thisAnimal)
    }, [animalId])

    
  



    return (
    
        <section className="animal">
        <button onClick={handleRelease}>Release Animal</button>
        <button onClick={() => {
            history.push(`/animals/edit/${props.animal.id}`)
        }}>Edit</button>
            <h3 className="animal__name">{ props.animal.name }</h3>
            <div className="animal__breed">{ props.animal.breed }</div>
            <div className="animal__location">Location: { props.animal.location.name }</div>
            <div className="animal__owner">Customer: { props.animal.customer.name }</div>
        </section>
    
    )
}
