
import { img1, img2, img3, img4, img6, img7, img9 } from '../../assets/home'
import { Link } from 'react-router-dom';
const tours = [
    {
        name: "Northern Vietnam",
        src: img1,
        link: "/tour?region=Northern+Vietnam",
    },
    {
        name: "Central Vietnam",
        src: img2,
        link: "/tour?region=Central+Vietnam",
    },
    {
        name: "Southern Vietnam",
        src: img3,
        link: "/tour?region=Southern+Vietnam",
    }]

const TourList = () => {
    return (
        <div className='wrapper'>
            <div className="tourlist-wrapper">
                <div className="tourlist-title">Tour List</div>
                <div className="tourlist-list">
                    {tours.map((tour, index) => {
                        return (
                            <div className="tourlist-item" key={index}>
                                <Link to={tour?.link}>
                                    <div className="img-overlay" />

                                    <img src={tour?.src} alt="logo" />
                                    <div className="tourlist-item-title">
                                        {tour?.name}
                                    </div>
                                </Link>
                            </div>

                        );
                    })}

                </div>
            </div >
        </div>
    );
}
export default TourList