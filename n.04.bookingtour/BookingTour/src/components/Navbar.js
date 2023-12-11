import { useState, useRef } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const navs = [
    {
        id: "/",
        value: "Home",

    },
    {
        id: "/about",
        value: "About",

    },
    {
        id: "/tour",
        value: "Tour",
        submenu: [
            {
                title: 'Northern Vietnam',
                url: '/tour?region=Northern+Vietnam',
            },
            {
                title: 'Central Vietnam',
                url: '/tour?region=Central+Vietnam',
            },
            {
                title: 'Southern Vietnam',
                url: '/tour?region=Southern+Vietnam',
            }
        ],

    },
    {
        id: "/price-list",
        value: "Price List",
    },
    {
        id: "/contact",
        value: "Contact",
    }
]

//Mobile expand button

const Navbar = () => {
    const [btnState, setBtnState] = useState(false);

    function clickMenuBtn() {
        if (!btnState) {
            setBtnState(true);
        }

        else if (btnState) {
            setBtnState(false);
        }
    }

    return (
        <div id="ftc-nav">
            <div className="navbar-navb-mobile-btn" style={{ backgroundPosition: btnState ? "center left 50px, center" : "center, center left 50px" }} onClick={clickMenuBtn}></div>
            <ul className="navbar-navb  display">
                {navs.map((nav, index) => {
                    return (
                        <>
                            {nav.submenu ? (
                                <li className="navb-item" key={index} style={{ cursor: "pointer" }}>
                                    <a className="navb-link" >
                                        <span>{nav.value} <ArrowDropDownIcon /></span>
                                    </a>
                                    <ul className="dropdown">
                                        {nav.submenu.map((submenu, index) => (
                                            <li key={index} className="dropdown-item">
                                                <a href={submenu.url}>{submenu.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li >
                            ) : (
                                <li className="navb-item" key={index} >
                                    <a href={nav.id} className="navb-link" >
                                        <span>{nav.value}</span>
                                    </a>
                                </li>
                            )
                            }
                        </>
                    );
                })}
            </ul>
            <div className="navbar-navb-mobile" style={{ display: btnState ? "block" : "none" }}>
                <ul className="navb-list-mobile">
                    {navs.map((nav, index) => {
                        return (
                            <>
                                {nav.submenu ? (
                                    <li className="navb-item-mobile-tour" key={index} style={{ cursor: "pointer" }}>
                                        <span>{nav.value} <ArrowDropDownIcon /></span>
                                        <ul className="dropdown-mobile">
                                            {nav.submenu.map((submenu, index) => (
                                                <li key={index} className="dropdown-item-mobile">
                                                    <a href={submenu.url}>{submenu.title}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li >
                                ) : (
                                    <li className="navb-item-mobile" key={index} >
                                        <a href={nav.id} className="navb-link-mobile" >
                                            <span>{nav.value}</span>
                                        </a>
                                    </li>
                                )
                                }
                            </>
                        );
                    })}
                </ul>
            </div>

        </div>
    );
}


export default Navbar;