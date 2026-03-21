import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"

export async function POST(req:Request){
 try{
    const body = await req.json();
    const{
        name,
        slug,
        description,
        image
    }=body 

    const category = await prisma.category.create({
        data:{
            name,
            slug,
            description,
            image
        }
    })

    const existing = await prisma.category.findUnique({
  where: { name }
})

if (existing) {
  return NextResponse.json(
    { error: "Category already exists" },
    { status: 400 }
  )
}

    return NextResponse.json(category)

 }
 catch(error){
    return NextResponse.json(
          { error: "category creation failed" ,errorDetails: error},
          { status: 500 }
        )

 }
}

export async function GET() {
  const categories = await prisma.category.findMany()
  return NextResponse.json(categories)
}