import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';

const Card = (props) => {
    const item = props.item
    return (
        <>
            <div className="tour-item px-0 mb-4">
                <div className="image">
                    <img alt="tour-image" src={`data:image/jpeg;base64 ,${item?.urlImageN1}`} />
                    <div className="price">
                    {/* edit0712 */}
                    {/* {item?.adultPrice} */}
                        {new Intl.NumberFormat('vi-VN').format(item?.adultPrice)} VND
                    </div>
                </div>
                <div className="content">
                    <div className="redirect-link">
                        <a href={`/tour-detail/${item?._id}`}>{item?.name}</a>
                    </div>
                    <div className="detail">
                        <h3>
                            <CalendarTodayIcon className='icon' />
                            <span>{item?.duration} days</span>
                        </h3>
                        <h3>
                            <OutlinedFlagIcon className='icon' />
                            <span>{item?.region}</span>
                        </h3>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card