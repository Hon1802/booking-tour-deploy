import Slider from "react-slick"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TourCard from "./TourCard"
import { useMeasurements } from "../../utility/hooks/useMeasurements"
import LeftArrow from "../../assets/left-arrow.svg"
import RightArrow from "../../assets/right-arrow.svg"
import { getHotTour } from "../../pages/tour/store/action"

const Hot = () => {
    const { isMobile } = useMeasurements()
    const dispatch = useDispatch()
    const data = useSelector(state => state.tour.tourHot)
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={LeftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={RightArrow} alt="nextArrow" {...props} />
    );
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: !isMobile ? <SlickArrowLeft /> : null,
        nextArrow: !isMobile ? <SlickArrowRight /> : null,
    };
    useEffect(() => {
        dispatch(getHotTour())
    }, [])
    return (
        <div className="container">
            <div className="hot-wrapper" style={{ 'padding': '5px', position: 'relative' }}>
                <h1>HOT TOURS THIS MONTH</h1>
                <Slider {...settings}>
                    {data?.map((item) => {
                        return (
                            <a href={`/tour-detail/${item._id}`}>
                                <TourCard tour={item} />
                            </a>
                        );
                    })}
                </Slider>
            </div>
        </div>

    );
}
export default Hot;