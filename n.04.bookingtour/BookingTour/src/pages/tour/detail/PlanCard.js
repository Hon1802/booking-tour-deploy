import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
const Card = (props) => {
    const { date, heading, title, desc } = props;
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });
    return (
        <div className={clsx("cardx", inView ? "visible" : "hidden")} ref={ref}>
            <div className="icon">
                <LocationOnRoundedIcon icon="location" />
            </div>
            <div className="content">
                <h4 className="date">{date}</h4>
                <h2 className="heading">{heading}</h2>
                <h3 className="title">{title}</h3>
                <p className="desc">{desc}</p>
            </div>
        </div>
    );
};

export default Card;