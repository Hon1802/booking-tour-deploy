
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import { Button } from '@mui/material';
import { convertDate } from "../../../utility/ConvertDate"
import ChooseTicketPopup from "./chooseTicketPopup"
import React, { useState, useEffect } from 'react';
const Detail = ({ tourId, destination, duration, budget, openTime, closeTime, adultPrice, childPrice }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="tourDetail-content-wrapper">
            <div className="tourDetail-name"
                style={{ fontSize: "25px", fontWeight: "600" }}>
                <LocationOnOutlinedIcon sx={{ mr: "10px" }} />
                Destination</div>
            <div className="tourDetail-content" style={{ marginBottom: "10px" }}>
                {destination}</div>
            <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                <PersonOutlineOutlinedIcon sx={{ mr: "10px" }} />
                Tour Day  </div>
            <div className="tourDetail-content" style={{ marginBottom: "10px" }}>{duration} Day(s)</div>
            <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                <FlightTakeoffOutlinedIcon sx={{ mr: "10px" }} />
                Open Time </div>
            <div className="tourDetail-content" style={{ marginBottom: "10px" }}>{convertDate(openTime)}</div>
            <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                <FlightLandOutlinedIcon sx={{ mr: "10px" }} />
                Close Time </div>
            <div className="tourDetail-content" style={{ marginBottom: "10px" }} >{convertDate(closeTime)}</div>
            <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                <LocalAtmOutlinedIcon sx={{ mr: "10px" }} />
                Budget</div>
            <div className="tourDetail-content" style={{ marginBottom: "10px" }}>
                {/* {budget} VND */}
                  {/* edit0712 */}
                {new Intl.NumberFormat('vi-VN').format(budget)} VND
            </div>
            <Button onClick={handleClickOpen} variant="contained" sx={{ color: "white", background: "var(--color-hover" }}>Book Now</Button>
            <ChooseTicketPopup
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                tourId={tourId}
                adultPrice={adultPrice}
                openTime={openTime}
                closeTime={closeTime}
                duration={duration}
                childPrice={childPrice}
            />
        </div>
    );
}
export default Detail;