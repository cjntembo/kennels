import React, { useState, createContext } from "react"



export const CustomerContext = createContext()
const url = 'https://e15-kennels-api-cjntembo.herokuapp.com/'


export const CustomerProvider = (props) => {
  const [customers, setCustomers] = useState([])

  const getCustomers = () => {
    return fetch(`${url}/customers`)
    .then(res => res.json())
    .then(setCustomers)
  }

  const addCustomer = customerObj => {
    return fetch(`${url}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customerObj)
    })
    .then(getCustomers)
  }

  return (
    <CustomerContext.Provider value={{
      customers, getCustomers, addCustomer
    }}>
      {props.children}
    </CustomerContext.Provider>
  )
}

