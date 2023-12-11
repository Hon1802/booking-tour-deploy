import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { img1 } from "../../assets/home";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import React from "react";
import Typed from "typed.js";
import { Input } from 'reactstrap';
const slogans = [
    "Know",
    "Book",
    "Go"
]
const Banner = () => {
    const el = React.useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });
    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: slogans,
            startDelay: 400,
            typeSpeed: 400,
            backSpeed: 100,
            backDelay: 100,
            loop: true,
        });

        // Destropying
        return () => {
            typed.destroy();
        };
    }, []);
    const handleSearch = (value) => {
        setSearchTerm(value);
    }
    return (
        <div className="home-banner-wrapper">
            <div className="banner-overlay"></div>
            <img src={img1} ></img>

            <div className={clsx("content", inView ? "visible" : "hidden")} ref={ref}></div>
            <h2>
                <span ref={el}></span> Better
            </h2>
            <div className="search-wrapper d-flex justify-content-between ">
                <div className="location-wrapper d-flex ">
                    <SearchIcon className="location-icon" />
                    <Input
                        id="tour_name"
                        placeholder={"Search by tour name..."}
                        value={searchTerm}
                        onChange={(e) => {
                            handleSearch(e.target.value)
                        }}
                    />
                </div>
                <div className="search-btn">
                    <Button variant="contained" color="primary"
                        sx={{ width: "130px", height: "fit-content", fontWeight: "bold" }}
                        onClick={() => {
                            window.location.href = `/tour?keyword=${searchTerm}`
                        }}
                    >FIND NOW</Button>
                </div>
            </div>
        </div>
    );
}
export default Banner;