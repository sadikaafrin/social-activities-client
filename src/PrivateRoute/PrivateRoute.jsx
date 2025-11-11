import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { ClimbingBoxLoader } from 'react-spinners';
import { AuthContext } from '../contex/AuthContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);
    const location = useLocation();
    console.log(location);

    if(loading){
        return (
            <div className='h-[97vh] flex items-center justify-center'>
                <ClimbingBoxLoader/>
            </div>
        )
    }
    if(!user){
        return <Navigate to="/signin" state={location.pathname}/>
    }
    return children
};

export default PrivateRoute;