import React from 'react'
import Banner from '../../components/Banner'
import { banner } from '../../assets'
import about1 from '../../assets/about/about-1.jpg'
import about2 from '../../assets/about/about-2.jpg'
import { Button } from '@mui/material'
import { Link } from "react-router-dom";
import Team from "./Team"
const About = () => {
    return (
        <div id="about">
            <Banner title="About Us" subtitle="About" banner={banner} />
            <div className="wrapper">
                <div className='wrapper-left'>
                    <div className='about-title'>We make the plan, You pack your bags.</div>
                    <div className='about-text'>
                        Welcome to Booking Now, your ultimate destination for unforgettable travel experiences. We are a passionate team of
                        globetrotters, adventure enthusiasts, and travel experts dedicated to turning your dream vacations into a reality.
                        <br />
                        At Booking Now, we believe that the journey is just as important as the destination. Our mission is to make your
                        travel dreams come true by providing you with seamless,
                        stress-free, and personalized booking experiences. Whether you're seeking a serene beach getaway,
                        an adrenaline-pumping adventure, a cultural immersion, or anything in between, we have you covered.
                    </div>
                    <Link to="/contact">
                        <Button variant="contained">CONTACT US</Button>
                    </Link>
                </div>
                <div className='wrapper-right'>
                    <img className="mx-1" src={about1} alt="about-img" />
                    <img src={about2} alt="about-img" />
                </div>
            </div>
            <Team />
        </div>
    )
}

export default About;
