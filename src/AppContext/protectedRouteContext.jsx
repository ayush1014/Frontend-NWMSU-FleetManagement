import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "./userContext";

export function ProtectedRoute({ children }){
    const { user } = useUser();
    const location = useLocation();

    if(!user){
        return <Navigate to="/" state={{
            from: location
        }} replace/>
    }

    return children;
}