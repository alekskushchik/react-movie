import { Navigate } from "react-router-dom";
import { getUser } from "../../helpers";

export const ProtectedRoute = ({ children }) => {
    const user = getUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};