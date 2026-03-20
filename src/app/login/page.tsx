"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import Register from "../register/page"
import { buttonStyles } from "../../../lib/ui";
import Button from "../../components/ui/Button";


export default function LoginPage() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = async (e:any)=>{
    e.preventDefault()

    await signIn("credentials",{
      email,
      password,
      redirect:true,
      callbackUrl:"/dashboard"
    })
  }

  return (
    <div className="m-10 p-10">
      <h1 className={`font-heading logo-gradient text-7xl font-semibold tracking-wide`}>
  Zivora
</h1>
      <h1 className="text-red-600 font-body">Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <button onClick={()=>signIn("google")}>
        Login with Google
      </button>
     

      <div>
        <Register/>
      </div>
      



<button className={buttonStyles.primary}>
  Shop Now
</button>

<button className={buttonStyles.dark}>
  Buy Now
</button>

<Button>Shop Now</Button>

<Button variant="dark">Buy Now</Button>

<Button variant="outline">Wishlist</Button>

<button className="relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-br from-gray-200 to-gray-400">
  <span className="relative z-10">Explore</span>

  <span className="absolute inset-0 overflow-hidden">
    <span className="absolute left-[-75%] top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-500 hover:left-[125%]" />
  </span>
</button>

    </div>
  )
}