import React, { useEffect, useState, memo } from "react";
import Navbar from "./Navbar";
import TourIcon from '@mui/icons-material/Tour';
import { Link, useLocation } from "react-router-dom";
import UserDropdown from "./UserDropdown";

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation();
    const isLogin = location?.state?.isLogin

    useEffect(() => {
        const handleIsSticky = () => {
            window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);
        }
        window.addEventListener("scroll", handleIsSticky);
        return () => {
            window.removeEventListener("scroll", handleIsSticky);
        };
    }, [isSticky]);
    return (
        <>
            <header id="header" className={isSticky ? "sticky" : ""}>
                <div className="navb">
                    <div className="overlay" />
                    <a to="/" className="navbar-title">
                        <TourIcon sx={{ color: "black" }} />
                        <span>Booking</span>Now
                    </a>

                    <nav className="nav_actions">
                        <Navbar />
                    </nav>
                    {isLogin || JSON.parse(localStorage.getItem("userDataUser"))?.token ?
                        <UserDropdown />
                        : <Link to="/login">
                            <div className="btn">Login</div>
                        </Link>
                    }
                </div>

            </header>
        </>
    );
};

export default memo(Header);
