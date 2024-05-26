import { useState,useEffect } from "react";
function Data(){
    const [todo,setTodo]=useState([])
    useEffect(()=>{
      fetch("http://localhost:3000/todos",{
        method:"GET"
      }).then((res)=>{
        res.json().then((data)=>{
          console.log(data)
          setTodo(data)
        })
      });
      setInterval(()=>{
        const fetchedData=async ()=>{
          try{
            const res=await fetch("http://localhost:3000/todos")
            const data=await res.json()
            setTodo(data);
          }
          catch(error){
            console.log("error",error)
          }
        }
        fetchedData();
      } ,1000)
      
    },[]);
  
  // const fetchedData=async ()=>{
  //   try{
  //     const data=await fetch("http://localhost:3000/todos")
  //     const datajson=await data.json()
  //     console.log(datajson)
  //   }
  //   catch(error)
  //     {
  //       console.log("eorror",error)

  //   }
  // }
  // fetchedData();
    return (
      <>
      {todo.map(t =>{
        return(
  
        <div>
          <h1>{t.title}</h1>
          <h1>{t.description}</h1>
          <button>DELETE</button>
        </div>
        )
      })}
    </>
    )
}
export default Data;


// import React from 'react';

// const Logout = () => {
//   // Function to handle logout
//   const handleLogout = () => {
//     // Remove token from localStorage
//     localStorage.removeItem("token");

//     // Redirect to login page or any other page after logout
//     // You may use React Router for navigation
//     // Example: history.push("/login");
//   };

//   return (
//     <div>
//       <h1>Logout Page</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Logout;
