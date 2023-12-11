import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const Banner = ({ title, subtitle, banner }) => {
    return (
        <div id="banner">
            <div className="banner-wrapper" >
                <div className="banner-overlay"></div>
                <img src={banner} ></img>
                {title &&
                    <div className="banner-title">
                        <h2>
                            {title}
                            <div className="banner-content" style={{ marginTop: "20px", fontSize: "30px" }}>
                                <HomeIcon />
                                <NavigateNextIcon />
                                <NavigateNextIcon style={{ marginLeft: "-20px" }} />
                                <div style={{ color: "var(--color-hover)", display: "inline-block" }}>{subtitle}</div>
                            </div>
                        </h2>
                    </div>
                }

            </div >
        </div>
    )
}
export default Banner;