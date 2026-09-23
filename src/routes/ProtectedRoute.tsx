import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../features/auth";

function ProtectedRoute() {
    const location = useLocation();
    const {data,isLoading,isError} = useCurrentUser();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError || !data) {
        return (
            <Navigate to="/login" replace state={{ from: location }} />
        );
    }

    return <Outlet />;
}

export default ProtectedRoute;