import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useContext,useState } from "react"
import {AppContext} from './App'
import { default as axios } from "axios"
import { Link } from "react-router-dom"
import { Login } from "./Login"
export const SignUp = ()=>{

    const{setSignUpdata,SignUpdata} = useContext(AppContext);

    const schema = yup.object().shape(
        {
            Name:yup.string().required(),
            Reg_No:yup.string().required(),
            Email:yup.string().email().required(),
            phone:yup.string().min(11).max(11).required(),
            password:yup.string().min(6).max(8).required(),
            confirm_password:yup.string().oneOf([yup.ref("password"),null],"passwords do not match")
        }
    )

    const{register,handleSubmit, formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

    const onSubmit = (data)=>{
        setSignUpdata(data)
        
        
            axios.post("http://127.0.0.1:5000/Credentials",{
                name:SignUpdata.Name,
                email:SignUpdata.Email,
                reg_no:SignUpdata.Reg_No,
                phone:SignUpdata.phone,
                password:SignUpdata.password
            }).then(res=>{
                console.log(res.data)
            }).catch(errors=>{
                console.log("error",errors)
            })
        
    
    }



    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Name" {...register("Name")}/>
                <p>{errors.Name?.message}</p>
                <input type="text" placeholder="Reg No" {...register("Reg_No")}/>
                <p>{errors.Reg_No?.message}</p>
                <input type="Email" placeholder="Email" {...register("Email")}/>
                <p>{errors.Email?.message}</p>
                <input type="text" placeholder="phone number" {...register("phone")}/>
                <p>{errors.phone?.message}</p>
                <input type="password" placeholder="password" {...register("password")}/>
                <p>{errors.password?.message}</p>
                <input type="password" placeholder="confirm password" {...register("confirm_password")}/>
                <p>{errors.confirm_password?.message}</p>
                <input type="submit"/>
            </form>

            <h1><Link to={"/"}>Already have an account?Login</Link></h1>
        </div>
    )
}