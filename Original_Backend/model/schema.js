import mongoose from "mongoose";


const sch=mongoose.Schema({
    username:String,
    password:Number
})
export const Schema=mongoose.model("Schema", sch);
