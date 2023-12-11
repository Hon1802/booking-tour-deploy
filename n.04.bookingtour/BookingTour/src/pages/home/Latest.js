import { useState, useEffect } from 'react'
import { format } from "date-fns"
import { getLatestTour } from '../tour/store/action'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Latest = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.tour)
    const data = store?.tourLatest?.slice(0, 5)

    useEffect(() => {
        dispatch(getLatestTour())
    }, [])
    return (
        <div className="latest-wrapper">
            <div className="latest-title">
                LATEST TOURS
            </div>
            <div className="latest-list">
                <div className="img-overlay"></div>

                <div className="latest-item-change cursor-pointer" >
                    <Link to={`/tour-detail/${store?.tourLatest[0]?._id}`}>
                        <img src={`data:image/jpeg;base64, ${store?.tourLatest[0]?.urlImageN1}`} />
                        <div className="latest-item-title">
                            {store?.tourLatest[0]?.name}
                        </div>
                        <div className="latest-item-price">
                            {/* edit0712 */}
                            Cost: {new Intl.NumberFormat('vi-VN').format(store?.tourLatest[0]?.adultPrice)} VND
                            {/* Cost:  {store?.tourLatest[0]?.adultPrice} */}
                        </div>
                    </Link>
                </div>

                {data && data?.map((item, index) => {
                    if (index !== 0)
                        return (
                            <Link to={`/tour-detail/${item?._id}`}>
                                <div className="latest-item cursor-pointer" key={index}>
                                    <img src={`data:image/jpeg;base64, ${item?.urlImageN1}`} />
                                    <div className="latest-item-title">
                                        {item?.name}
                                    </div>
                                    <div className="latest-item-price">
                                        {/* edit0712 */}
                                        Cost: {new Intl.NumberFormat('vi-VN').format(item?.adultPrice)} VND
                                        {/* Cost: {item?.adultPrice} */}
                                    </div>
                                </div>
                            </Link>
                        )
                })}
            </div>
        </div>
    )
}

export default Latest;