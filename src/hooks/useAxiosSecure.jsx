import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, singOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(function (config) {
    const token = user.accessToken;
    if(token){
       config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  })
  const responseInterceptor = instance.interceptors.response.use(res =>{
    return res;
  }, err =>{
    const status = err.status;
    if(status === 401 || status === 403){
        console.log('log out user for the bed request');
        singOut()
        .then(() =>{
          // navigate to the login page
          navigate('/register');
        })
    }
  })
  return () =>{
    instance.interceptors.request.eject(requestInterceptor)
    instance.interceptors.response.eject(responseInterceptor)
  }
  },[user, singOut, navigate])
  return instance;
};
export default useAxiosSecure;