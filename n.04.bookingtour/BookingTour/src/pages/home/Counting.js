import { counting } from "../../assets/home";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import LanguageIcon from '@mui/icons-material/Language';
import GroupsIcon from '@mui/icons-material/Groups';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const Counting = () => {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });

    return (
        <div id="counting" style={{ backgroundImage: `url(${counting})`, minWidth: "100%" }}>
            <div className="overlay" />
            <div className={clsx("content", inView ? "visible" : "hidden", "row w-100")} ref={ref}>
                <div className="counting-item col-lg-3">
                    <div className="counting-icon">
                        <LanguageIcon style={{ fontSize: "60px" }} />
                    </div>
                    <div className="counting-number" style={{ fontSize: "50px", color: "var(--color-hover)" }}>
                        50+
                    </div>
                    <div className="counting-name">
                        Amazing Tours
                    </div>
                </div>
                <div className="counting-item col-lg-3">
                    <div className="counting-icon">
                        <GroupsIcon style={{ fontSize: "60px" }} />
                    </div>
                    <div className="counting-number" style={{ fontSize: "50px", color: "var(--color-hover)" }}>
                        1500+
                    </div>
                    <div className="counting-name">
                        Happy Travellers
                    </div>
                </div>
                <div className="counting-item col-lg-3">
                    <div className="counting-icon">
                        <MilitaryTechIcon style={{ fontSize: "60px" }} />
                    </div>
                    <div className="counting-number" style={{ fontSize: "50px", color: "var(--color-hover)" }} >
                        25+
                    </div>
                    <div className="counting-name">
                        International Awards
                    </div>
                </div>
                <div className="counting-item col-lg-3">
                    <div className="counting-icon">
                        <ManageAccountsIcon style={{ fontSize: "60px" }} />
                    </div>
                    <div className="counting-number" style={{ fontSize: "50px", color: "var(--color-hover)" }}>
                        100+
                    </div>
                    <div className="counting-name">
                        Expert Team
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Counting;
