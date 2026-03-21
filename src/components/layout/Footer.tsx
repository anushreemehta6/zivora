import { Facebook, Instagram, MessageCircleHeart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#02203d]  bottom-0 relative p-10 px-20 ">
     <div className='grid md:grid-cols-3 overflow-hidden gap-8 text-slate-400 '>
        <div className='flex flex-col'>
            <h1 className='text-2xl text-white font-semibold mb-3'>Quick Links</h1>
            <Link href="/reviews" className='hover:text-white'>Customer Reviews</Link>
            <Link href="/about" className='hover:text-white'>About us</Link>
            <Link href="/join">Join us</Link>

        </div>

        <div className='flex flex-col'>
            <h1 className='text-2xl text-white font-semibold mb-3'>Info</h1>
            <Link href="/reviews" className='hover:text-white'>Shipping & Returns</Link>
            <Link href="/about" className='hover:text-white'>Private Policy</Link>
            <Link href="/join" className='hover:text-white'>FAQs</Link>
            
        </div>

        <div className='flex flex-col'>
            <h1 className='text-2xl text-white font-semibold mb-3'>Contact Us</h1>
           <p className='hover:text-white'>
            For any suggestions,queries or complaints please contact us: <br/>
            D-35 Shanti nagar OPP. NBC car parking Jaipur, Rajasthan 302006
           </p>
           <p className='hover:text-white'>
            9549258382 , 9529890942 (10 AM to 6:30 PM)
           </p>
            
        </div>

     </div>
     <div className='flex gap-4  mt-4'>
        <Facebook className='text-white  hover:-translate-x-1 hover:scale-110 transition duration-300 ease-in-out'/>
        <Instagram className='text-white hover:-translate-x-1 hover:scale-110 transition duration-300 ease-in-out '/>
        <MessageCircleHeart className='text-white hover:-translate-x-1 hover:scale-110 transition duration-300 ease-in-out '/>
        
     </div>
      
    </div>
  )
}

export default Footer
