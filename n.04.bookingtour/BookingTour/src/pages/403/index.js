// ** React Imports
import { Link } from "react-router-dom"
import { useState } from "react"
// ** Reactstrap Imports
import { Button } from "reactstrap"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/actions/auth"
import { useNavigate } from "react-router-dom"
import source from "../../assets/error.svg"
const Unauthorized = () => {
    const data = JSON.parse(localStorage.getItem("userDataUser"))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const handleLogoutUser = () => {
        dispatch(logout(
            data?._id,
            setLoading,
            () => navigate("/login")
        ))
        localStorage.removeItem("userDataUser")
        localStorage.removeItem("accessTokenUser")
    }
    return (
        <div className="misc-wrapper">
            <Link className="brand-logo" to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2 className="text-primary" style={{ fontWeight: "bold" }}>
                    Booking Now
                </h2>
            </Link>
            <div className="misc-inner p-2 p-sm-3">
                <div className="w-100 text-center">
                    <h2 className="mb-1">Unauthorized 🕵🏻‍♀️</h2>
                    <p className="mb-2">Oops! 😖 Please sign in to continue</p>
                    <Button onClick={handleLogoutUser} color="primary" className="btn-sm-block mb-2">
                        Back to Login
                    </Button>
                    <img className="img-fluid" src={source} alt="Not authorized page" />
                </div>
            </div>
        </div>
    )
}
export default Unauthorized
