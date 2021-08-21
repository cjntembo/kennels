import React from "react"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalDetail } from "./animal/AnimalDetail"
import { AnimalSearch } from "./animal/AnimalSearch"
import { CustomerProvider } from "./customers/CustomerProvider"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeProvider } from "./employees/EmployeeProvider"
import { EmployeeList } from "./employees/EmployeeList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { EmployeeDetail } from "./employees/EmployeeDetail"
import { LocationList } from "./locations/LocationList"
import { LocationProvider } from "./locations/LocationProvider"
import { LocationForm } from "./locations/LocationForm"
import { LocationDetail } from "./locations/LocationDetail"
import { Route } from "react-router-dom"

export const ApplicationViews = () => {
  return (
    <>
      {/* Render the location list when http://localhost:3000/ */}
      <LocationProvider>
        <Route exact path="/">
          <LocationList />
        </Route>
      </LocationProvider>

      {/* Render the animal list when http://localhost:3000/animals
            <AnimalProvider>
                <Route path="/animals">
                    <AnimalList />
                </Route>
              </AnimalProvider> */}

      <AnimalProvider>
        <LocationProvider>
          <CustomerProvider>
            <EmployeeProvider>

              {/* <Route exact path="/animals">
                <AnimalList />
              </Route>
               */}
              {/* Add a new route in ApplicationViews for editing an animal. Consider what providers you will need. What data will be editable? Can we re-use the AnimalForm? */}
              {/* <Route exact path="/animals/create"> */}
              <Route path="/animals/edit/:animalId(\d+)">
                <AnimalForm />
              </Route>

              <Route path="/animals/create">
                <AnimalForm />
              </Route>

              <Route exact path="/animals/detail/:animalId(\d+)">
                <AnimalDetail />
              </Route>

              <Route exact path="/animals">
                <AnimalSearch />
                <AnimalList />
              </Route>

              <Route exact path="/locations">
                <LocationList />
              </Route>

              <Route exact path="/locations/edit/:locationId(\d+)">
                <LocationForm />
              </Route>

              <Route exact path="/locations/create">
                <LocationForm />
              </Route>

              <Route exact path="/locations/detail/:locationId(\d+)">
                <LocationDetail />
              </Route>

              <Route exact path="/customers">
                <CustomerList />
              </Route>

              <Route exact path="/employees/edit/:employeeId(\d+)">
                <EmployeeForm />
              </Route>

              <Route exact path="/employees/create">
                <EmployeeForm />
              </Route>

              <Route exact path="/employees">
                <EmployeeList />
              </Route>

              <Route exact path="/employees/detail/:employeeId(\d+)">
                <EmployeeDetail />
              </Route>

            </EmployeeProvider>
          </CustomerProvider>
        </LocationProvider>  
      </AnimalProvider>  
    </>
  )
}
