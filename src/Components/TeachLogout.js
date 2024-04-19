import React, {useEffect,useContext}from 'react'
import { useNavigate } from 'react-router-dom'
import { ClgContext } from '../App';

const TeachLogout = () => {
    const {clgstate,clgdispatch} = useContext(ClgContext);
    const navigate = useNavigate;
    useEffect(()=>{
        fetch('https://mybackendtask.onrender.com/log-out',{
            method:"GET",
            headers : {
                Accept : "appllication/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            clgdispatch({type:"CLG",payload:false})

            navigate('/teachlogin',{replace:true});
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

export default TeachLogout
