import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))

    return user && user.token ? children : <Navigate to='/login' />
}
export default PrivateRoute