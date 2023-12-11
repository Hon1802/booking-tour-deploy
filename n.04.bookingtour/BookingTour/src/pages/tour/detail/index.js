import React, { useEffect } from 'react'
import Banner from '../../../components/Banner'
import { useParams } from "react-router-dom"
import { img1 } from '../../../assets/home'
import Detail from "./Detail"
import Description from './Description'
import TourPlan from "./TourPlan"
import Comments from "./comment/Comments"
import { banner } from "../../../assets"
import { useDispatch, useSelector } from 'react-redux'
import { getTourById } from '../store/action'
const TourDetail = () => {
    const { tourId } = useParams();
    const dispatch = useDispatch();
    const store = useSelector(state => state.tour?.tourDetail)

    useEffect(() => {
        if (tourId)
            dispatch(getTourById(tourId))
    }, [])

    return (
        <div id="tourDetail">
            <Banner title="Tour Detail" subtitle="tour-detail" banner={banner} />
            <div className="tourDetail-wrapper">
                <div className="tourDetail-wrapper-left">
                    <img alt="tour-image" src={store?.imageBase64Array ? `data:image/jpeg;base64, ${store?.imageBase64Array[0]}` : img1} />
                </div>
                <div className="tourDetail-wrapper-right">
                    <Detail
                        destination={store?.destination}
                        duration={store?.duration}
                        budget={store?.adultPrice}
                        openTime={store?.openTime}
                        closeTime={store?.closeTime}
                        adultPrice={store?.adultPrice}
                        childPrice={store?.childPrice}
                        tourId={tourId}
                    />
                </div>
            </div>
            <div className="tourDetail-description-wrapper">
                <Description description={store?.description} name={store?.name} imgList={store?.imageBase64Array} />
                <TourPlan plan={store?.plan} />
                {/* <Comments commentsUrl="/tour-detail/{tourId}" currentUserId={1} /> */}
            </div>

        </div>
    )
}
export default TourDetail;