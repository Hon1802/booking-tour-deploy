import { useEffect, useState } from "react"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { img1, img2, img3 } from "../../../assets/home"
import { Row, Col } from "reactstrap"
import ReviewDetail from "./components/ReviewDetail"
import { Button } from '@mui/material';
import ViewHotel from "./components/ModalViewHotel";
import { getHotelByCity } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import { convertDate } from "../../../utility/ConvertDate";
import { getHotelById } from '../store/action';

const StepTwo = (props) => {
    const [open, setOpen] = useState(false);
    const tourDetail = useSelector(state => state.tour?.tourDetail)
    const dispatch = useDispatch()
    const store = useSelector(state => state.payment.hotels)
    const [hotelId, setHotelId] = useState("")
    const state = JSON.parse(localStorage.getItem("state"))
    const hotelDetail = useSelector(state => state.payment?.hotelDetail)

    // const [result, setResult] = useState(null)
    useEffect(() => {
        dispatch(getHotelByCity({ cityCode: tourDetail?.districtDes }))
    }, [])

    useEffect(() => {
        if (hotelId) {
            const params = {
                hotelIds: hotelId,
                adults: state?.numberAdult,
                checkInDate: state?.departureDate,
                checkOutDate: state?.returnDate,
                currency: "USD",
            }
            dispatch(getHotelById(params))
        }
    }, [hotelId])
    const handleClickOpen = (value) => {
        setHotelId(value)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSkip = () => {
        props.handleSetActiveStep(2)
    }
    return (
        <div id="stepTwo">
            <div className="w-100 ">
                <div className="container">
                    <Row className="w-100">
                        <Col lg={8} sm={6} xs={12} className="mb-3">
                            <div className="infoContainer w-100">
                                <h3>Choose hotel</h3>
                                <div className={`w-100 infoContainerLeft`}>
                                    <div className="infoCard">
                                        {store !== "[{}]" ? store?.map((item, index) => {
                                            return (
                                                <div key={index} className="w-100">
                                                    <div className={`infoCardItem d-flex`}>
                                                        <div className={`infoCardItemImage`}>
                                                            <img src={`data:image/jpeg;base64,${item?.image}`} alt="notifyImg" />
                                                        </div>
                                                        <div className={`infoCardItemContent`}>
                                                            <div className={`w-100 infoCardItemContentHeader d-flex`}>
                                                                <div className={`infoCardItemContentHeaderHosting d-flex`}>
                                                                    <LocationOnOutlinedIcon className='icon' />
                                                                    {convertDate(item?.lastUpdate)}
                                                                </div>
                                                            </div>
                                                            <div className={`infoCardItemContentTitle`}>
                                                                {item?.name}
                                                            </div>
                                                            <div className={`infoCardItemContentDetail`}>
                                                                {item?.description}
                                                            </div>
                                                            <Button
                                                                onClick={() => handleClickOpen(item?.hotelId)}
                                                                variant="contained"
                                                                sx={{ color: "white", textTransform: "capitalize" }}>
                                                                Check availability</Button>
                                                        </div>
                                                        {/* <div className={`infoCardItemPrice`}>
                                                            <div className="infoCardItemPriceContent  text-left">
                                                                <div>
                                                                    Price from
                                                                </div>
                                                                <div className={`price`}>
                                                                    VND 222222
                                                                </div>
                                                                <div >
                                                                    per night
                                                                </div>

                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            )
                                        }
                                        ) :
                                            <p>There are currently no hotels matching your location. Please skip this step</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} sm={6} xs={12} className="mb-3">
                            <ReviewDetail />
                            <div className="d-flex justify-content-end">
                                <Button onClick={handleSkip} className="btn-submit my-4" type="submit" variant="contained">Skip</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <ViewHotel
                open={open}
                hotelDetail={hotelDetail}
                setHotel={props?.setHotel}
                handleSetActiveStep={props?.handleSetActiveStep}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
            // tourId={tourId}
            />
        </div>
    )
}
export default StepTwo