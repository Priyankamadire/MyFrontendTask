import React, {useEffect,useContext}from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const StdLogout = () => {
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate;
    useEffect(()=>{
        fetch('https://mybackendtask.onrender.com/clglog-out',{
            method:"GET",
            headers : {
                Accept : "appllication/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false})

            navigate('/stdslogin',{replace:true});
            if (!res.status === 200) { 
                const error = new Error(res.error);
                throw error;
        
              }
        }).catch((err)=>{
            console.log(err);
        })
    })
  return (
    <>
    <h1>logout page</h1>
    </>
  )
}

export default StdLogout
