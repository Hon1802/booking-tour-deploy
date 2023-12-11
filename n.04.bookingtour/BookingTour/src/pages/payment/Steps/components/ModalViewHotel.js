import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Label } from 'reactstrap';
import { img1 } from '../../../../assets/home'
import "./styles/view-hotel.scss";
import { convertDate } from "../../../../utility/ConvertDate"
import { Row, Col } from "reactstrap"
//icon
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import AirportShuttleTwoToneIcon from '@mui/icons-material/AirportShuttleTwoTone';
import FamilyRestroomTwoToneIcon from '@mui/icons-material/FamilyRestroomTwoTone';
import VapeFreeTwoToneIcon from '@mui/icons-material/VapeFreeTwoTone';
import LocalParkingRoundedIcon from '@mui/icons-material/LocalParkingRounded';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import LocalBarOutlinedIcon from '@mui/icons-material/LocalBarOutlined';
import ConfirmBook from "./ConfirmBook";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const list = [{
    value: "Free Wifi",
    icon: <LocationOnOutlinedIcon />
},
{
    value: "Airport shuttle (free)",
    icon: <AirportShuttleTwoToneIcon />
},
{
    value: "Family rooms",
    icon: <FamilyRestroomTwoToneIcon />
},
{
    value: "Non-smoking rooms",
    icon: <VapeFreeTwoToneIcon />
},
{
    value: "Free parking",
    icon: <LocalParkingRoundedIcon />
},
{
    value: "24-hour front desk",
    icon: <TableBarOutlinedIcon />
},
{
    value: "Room service",
    icon: <RoomServiceOutlinedIcon />
},
{
    value: "Air conditioning",
    icon: <AcUnitOutlinedIcon />
},
{
    value: "Bar",
    icon: <LocalBarOutlinedIcon />
},
]
const ViewHotel = (props) => {
    const hotel = props.hotelDetail?.data[0]
    const [isOpenConfirmBook, setIsOpenConfirmBook] = useState(false)
    const handleBook = () => {
        props.setHotel(hotel)
        props.handleSetActiveStep(2)
    }
    return (
        <div id="view-hotel">
            <BootstrapDialog
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
                fullScreen={true}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Hotel Detail: {hotel?.hotel?.name}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <div className="tourDetail-wrapper">
                        <div className="tourDetail-wrapper-left">
                            <img alt="tour-image" src={`data:image/jpeg;base64,${hotel?.hotel?.image}`} />
                        </div>
                        <div className="tourDetail-wrapper-right">
                            <div className="tourDetail-content-wrapper">
                                <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                                    <PersonOutlineOutlinedIcon sx={{ mr: "10px" }} />
                                    Number of adults  </div>
                                <div className="tourDetail-content" style={{ marginBottom: "10px" }}>{hotel?.offers[0]?.guests?.adults}</div>
                                <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                                    <FlightTakeoffOutlinedIcon sx={{ mr: "10px" }} />
                                    Checkin Date </div>
                                <div className="tourDetail-content" style={{ marginBottom: "10px" }}>{convertDate(hotel?.offers[0]?.checkInDate)}</div>
                                <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                                    <FlightLandOutlinedIcon sx={{ mr: "10px" }} />
                                    Checkout Date </div>
                                <div className="tourDetail-content" style={{ marginBottom: "10px" }}>{convertDate(hotel?.offers[0]?.checkOutDate)}</div>
                                <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                                    <LocalAtmOutlinedIcon sx={{ mr: "10px" }} />
                                    Budget</div>
                                <div className="tourDetail-content" style={{ marginBottom: "10px" }}>
                                    {/* {hotel?.offers[0]?.price?.total} VND */}
                                      {/* edit0712 */}
                                    {new Intl.NumberFormat('vi-VN').format(hotel?.offers[0]?.price?.total)} VND
                                </div>
                                <Button onClick={() => setIsOpenConfirmBook(true)} variant="contained" sx={{ color: "white", background: "var(--color-hover" }}>Book Now</Button>
                            </div>
                        </div>
                    </div>
                    <div className='service-wrapper'>
                        <h4>Most popular facilities</h4>
                        <Row className='service-list'>
                            {list.map((item, index) => (
                                <Col lg={3} className='service-item d-flex my-2' key={index}>
                                    <div className='service-icon'>{item.icon}</div>
                                    <span>{item.value}</span>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div className='service-wrapper'>
                        <h4>Description</h4>
                        <div className="tourDetail-description">{hotel?.hotel?.description}</div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <ConfirmBook
                open={isOpenConfirmBook}
                handleOk={handleBook}
                handleClose={() => setIsOpenConfirmBook(false)}
            />
        </div >
    );
}

export default ViewHotel