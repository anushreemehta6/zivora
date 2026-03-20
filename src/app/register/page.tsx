"use client"

import { useState } from "react"

export default function Register(){

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")

  const handleSubmit=async(e:any)=>{
    e.preventDefault()

    await fetch("/api/register",{
      method:"POST",
      body:JSON.stringify({email,password,name})
    })
  }

  return(
    <form onSubmit={handleSubmit}>
      <input placeholder="name" onChange={(e)=>setName(e.target.value)}/>
      <input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
      <input placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>

      <button>Register</button>
    </form>
  )
}