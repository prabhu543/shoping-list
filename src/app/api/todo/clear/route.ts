import ConnectDB from "@/lib/db";
import { Todo } from "@/lib/model/todos";
import { NextResponse } from "next/server";

export const DELETE = async()=>{
  try{
    await ConnectDB()
    await Todo.deleteMany();
    return NextResponse.json({message : "deleted all " }  , {status : 200})

  }catch(error){
    return NextResponse.json(`error ${error}` , {status : 500})
  }
}