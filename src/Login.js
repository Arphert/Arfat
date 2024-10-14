import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {Link,useNavigate } from "react-router-dom"
import { useContext,useState } from "react"
import {AppContext} from './App'
import {default as axios} from 'axios'


export const Login = ()=>{

    const{Userdata,setUserdata} = useContext(AppContext);
    const navigate = useNavigate()
    const[LoginError,setLoginError] = useState("")

    const schema = yup.object().shape(
        {
            Reg_No:yup.string().required(),
            password:yup.string().required()
        }
    )

    const{register,handleSubmit, formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

    const onSubmit = async(data)=>{
        try{
            const response =await axios.get(`http://localhost:5000/Credentials/${data.Reg_No}`);

            if(response.data && response.data.password ===data.password){
                setUserdata(response.data)
            
            navigate("/Task");
        } else {
          setLoginError("Invalid registration number or password.");
        }
      } catch (error) {
        // Handle any error that occurs during the login process
        setLoginError("User not found or server error.");
      }
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <input type="text" placeholder="Reg No" {...register("Reg_No")}/>
                <p>{errors.Reg_No?.message}</p>
                <input type="password" placeholder="password" {...register("password")}/>
                <p>{errors.password?.message}</p>
                <input type="submit"/>
            </form>
           { LoginError && <p style={{ color: "red" }}>{LoginError}</p>}
            <h1><Link to={"/Signup"}>Don't have an account?SignUp</Link></h1>

            
        </div>
    )
}