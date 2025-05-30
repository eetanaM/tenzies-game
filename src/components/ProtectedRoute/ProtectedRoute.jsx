import { Navigate } from "react-router";

const ProtectedRoute = ({ user, onlyUnAuth = false, element }) => {

    if (!onlyUnAuth && !user) {
        return <Navigate to='/' />
    }

    return element
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ user, element }) => <ProtectedRoute user={user} onlyUnAuth={true} element={element} />
