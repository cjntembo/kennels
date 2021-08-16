import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { useHistory, Link } from 'react-router-dom'
import { Employee } from "./Employee"
import "./Employee.css"

export const EmployeeList = () => {

  const history = useHistory()
  const { getEmployees, employees } = useContext(EmployeeContext)

  // Initialization effect hook -> Go get employee data
  useEffect(()=>{
      getEmployees()
  }, [])

  return (
      <>
          <h1>Employees</h1>

          <button onClick={() => history.push("/employees/create")}>
              Add Employee
          </button>

          <div className="employees">
              {
                  employees.map(employee => {return (
                    <div className="employee">
                  <Link to={`/employees/detail/${employee.id}`} key={employee.id}>
                        { employee.name }
                      </Link>
                      </div>
                  )
                  })
              }
          </div>
      </>
  )
}

// export const EmployeeList = () => {
//   // This state changes when `getEmployees()` is invoked below
//   const { employees, getEmployees } = useContext(EmployeeContext)

//   //useEffect - reach out to the world for something
//   useEffect(() => {
//     console.log("EmployeeList: useEffect - getEmployees")
//     getEmployees()
//   }, [])

  
  // return (
    //   <section className="employees">
    //     {
      //       employees.map(employee => {
        //         return (
          //           <div className="employee" id={`employee--${employee.id}`}>
          //             <div className="employee__name">
          //               Name: { employee.name }
          //             </div>
          //             <div className="employee__branch">
          //               Location: { employee.location.name }
          //             </div>
          //           </div>
          //         )
          //       })
          //     }
          //   </section>
          // )
          


//           // Chapt 7 and 8
//   const history = useHistory()

//   return (
//     <>
//       <h2>Employees</h2>
//       <button onClick={
//         () => history.push("/employees/create")
//       }>
//             Add Employee
//       </button>
//       <div className="employees">
//       {
//         employees.map(employee => {
//           return (
//             <div className="employee"  id={`employee--${employee.id}`}>
//               <div className="employee__name">
//                 Name: { employee.name }
//               </div>
//               <div className="employee__branch">
//                 Branch: { employee.location.name }
//               </div>
//               <div className="employee__manager">
//                 Is Manager: { employee.manager }
//               </div>
//               <div className="employee__fullTime">
//                 Is Full TIme: { employee.fullTime }
//               </div>
//               <div className="employee__hourlyRate">
//                 Hourly Rate: { employee.hourlyRate }
//               </div>
//             </div>
//           )
//         })
//       }
//       </div>
//     </>
// )
// }