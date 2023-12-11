import { useDispatch, useSelector } from "react-redux";
import { img1 } from "../../../../assets/home";
import { Row, Col } from "reactstrap"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import { convertDate } from "../../../../utility/ConvertDate"
import { useEffect } from "react";
import { getTourById } from '../../../tour/store/action'
import { useParams } from "react-router-dom";

const ReviewDetail = () => {
    const tourDetail = useSelector(state => state.tour?.tourDetail)
    const dispatch = useDispatch()
    const state = JSON.parse(localStorage.getItem("state"))
    const { tourId } = useParams()
    useEffect(() => {
        dispatch(getTourById(tourId))
    }, [tourId])
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    return (
        <div className="review-box">
            <Row>
                <Col lg={5} sm={12}>
                    <div className="image-wrapper">
                        <img src={img1} />
                    </div>
                </Col>
                <Col lg={7} sm={12}>
                    <div className="content">
                        <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                            <PersonOutlineOutlinedIcon sx={{ mr: "10px" }} />
                            Tour Name  </div>
                        <div className="tourDetail-content" style={{ marginBottom: "10px" }}>{tourDetail?.name}</div>
                        <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                            <FlightTakeoffOutlinedIcon sx={{ mr: "10px" }} />
                            Departure Date </div>
                        <div className="tourDetail-content" style={{ marginBottom: "10px" }}>{convertDate(state?.departureDate)}</div>
                        <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                            <FlightLandOutlinedIcon sx={{ mr: "10px" }} />
                            Return Date </div>
                        <div className="tourDetail-content" style={{ marginBottom: "10px" }} >
                            {convertDate(new Date(state?.departureDate).addDays(tourDetail?.duration))}
                        </div>
                        <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                            <PersonOutlineOutlinedIcon sx={{ mr: "10px" }} />
                            Adult price: </div>
                        <div className="tourDetail-content" style={{ marginBottom: "10px" }} >{tourDetail?.adultPrice} VND</div>
                        <div className="tourDetail-name" style={{ fontSize: "25px", fontWeight: "600" }}>
                            <PersonOutlineOutlinedIcon sx={{ mr: "10px" }} />
                            Children price: </div>
                        <div className="tourDetail-content" style={{ marginBottom: "10px" }} >{tourDetail?.childPrice} VND</div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
export default ReviewDetail