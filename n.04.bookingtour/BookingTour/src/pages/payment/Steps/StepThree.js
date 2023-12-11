import { useState, useEffect } from "react"
import flight from "../../../assets/payment/flight.jpeg"
import { Row, Col } from "reactstrap"
import ReviewDetail from "./components/ReviewDetail"
import { Button } from '@mui/material';
import { getFlightByCity } from "../store/action";
import ConfirmBook from "./components/ConfirmBook";
import { useDispatch, useSelector } from "react-redux";
import { Briefcase, Package } from "react-feather";
// const Pagination = loadable(() => import("@/components/Common/Pagination"))
const StepThree = (props) => {
    const dispatch = useDispatch()
    const [isOpenConfirmBook, setIsOpenConfirmBook] = useState({ state: false, id: "" })
    const tourDetail = useSelector(state => state.tour?.tourDetail)
    const store = useSelector(state => state.payment?.flights)
    const state = JSON.parse(localStorage.getItem("state"))
    useEffect(() => {
        apiGetFlightByCity()
    }, [tourDetail])

    const apiGetFlightByCity = () => {
        const params = {
            originLocationCode: tourDetail?.pickUp,
            destinationLocationCode: tourDetail?.districtDes,
            departureDate: state?.departureDate,
            returnDate: state?.returnDate,
            adults: state?.numberAdult,
            max: 10
        }

        dispatch(getFlightByCity(params))
    }

    const handleSkip = () => {
        props.handleSetActiveStep(3)
    }
    const handleBook = (id) => {
        const flightDetail = store.filter((item) => item.id === id)
        props.setFlight(flightDetail[0])
        props.handleSetActiveStep(3)
    }
    return (
        <div id="stepTwo">
            <div className="w-100 ">
                <div className="container">
                    <Row className="w-100">
                        <Col lg={8} sm={6} xs={12} className="mb-3">
                            <div className="infoContainer w-100">
                                <h3>Choose flight</h3>
                                <div className={`w-100 infoContainerLeft`}>
                                    <div className="infoCard">
                                        {store !== "[{}]" ? store?.map((item, index) => {
                                            return (
                                                <div key={index} className="w-100">
                                                    <div className={`infoCardItem d-flex`}>
                                                        <div className={`infoCardItemImage`}>
                                                            <img src={flight} alt="notifyImg" />
                                                        </div>

                                                        <div className={`infoCardItemContent`}>

                                                            <div className={`w-100 infoCardItemContentHeader d-flex`}>
                                                                <div className={`infoCardItemContentHeaderHosting d-flex`}>
                                                                    <Package className='icon' />
                                                                    Class: {item?.classDeparture?.cabin}
                                                                </div>
                                                                <div className={`infoCardItemContentHeaderHosting d-flex`}>
                                                                    <Briefcase className='icon' />
                                                                    Checked Bags Weight: {item?.classDeparture?.includedCheckedBags?.weight} {item?.classDeparture?.includedCheckedBags?.weightUnit}
                                                                </div>
                                                            </div>
                                                            <div className={`infoCardItemContentTitle`}>
                                                                <p>Round 1: {item?.nameRound1}</p>

                                                            </div>
                                                            <Row className="d-flex">
                                                                <Col lg={6}>
                                                                    <div className={`infoCardItemContentDetail`}>
                                                                        Departure:  {item?.round1}
                                                                    </div>
                                                                    <div className={`infoCardItemContentDetail`}>
                                                                        At:  {item?.round1}
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className={`infoCardItemContentDetail`}>
                                                                        Number:  {item?.numberDeparture}
                                                                    </div>
                                                                    <div className={`infoCardItemContentDetail`}>
                                                                        Duration:  {item?.duration1.replace("PT", "")}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <div className={`infoCardItemContentTitle`}>
                                                                <p>Round 2: {item?.nameRound2}</p>

                                                            </div>
                                                            <Row className="d-flex">
                                                                <Col lg={6}>
                                                                    <div className={`infoCardItemContentDetail`}>
                                                                        Departure:  {item?.round2}
                                                                    </div>
                                                                    <div className={`infoCardItemContentDetail`}>
                                                                        At:  {item?.round2}
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className={`infoCardItemContentDetail`}>
                                                                        Number:  {item?.numberArrival}
                                                                    </div>
                                                                    <div className={`infoCardItemContentDetail`}>
                                                                        Duration:  {item?.duration1.replace("PT", "")}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Button
                                                                onClick={() => setIsOpenConfirmBook({ state: true, id: item?.id })}
                                                                variant="contained"
                                                                sx={{ color: "white", textTransform: "capitalize" }}>
                                                                Check availability</Button>

                                                        </div>

                                                        <div className={`infoCardItemPrice`}>
                                                            <div className="infoCardItemPriceContent  text-left">
                                                                <div>
                                                                    Price from
                                                                </div>
                                                                <div className={`price`}>
                                                                    VND {item?.priceInfo?.total}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        ) :
                                            <p>There are currently no flights</p>
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
            <ConfirmBook
                open={isOpenConfirmBook.state}
                handleOk={() => handleBook(isOpenConfirmBook.id)}
                handleClose={() => setIsOpenConfirmBook(false)}
            />
        </div>
    )
}
export default StepThree