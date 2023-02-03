import React from 'react'
import { Link} from 'react-scroll'
import NavLink  from 'next/link'
import MobileMenu from '../MobileMenu/MobileMenu'


const Header = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <header id="header" className="wpo-header-style-1">
            <div className="wpo-site-header">
                <nav className="navigation navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                                <MobileMenu/>
                            </div>
                            <div className="col-lg-2 col-md-6 col-6">
                                <div className="navbar-header">
                                    <Link onClick={ClickHandler} className="navbar-brand site-logo" to="/"><img
                                        src="images/logo.png" alt="" />Elito.</Link>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-1 col-1">
                                <div id="navbar" className="collapse navbar-collapse navigation-holder">
                                    <button className="menu-close"><i className="ti-close"></i></button>
                                    <ul className="nav navbar-nav mb-2 mb-lg-0">
                                        <li className="menu-item-has-children">
                                            <a href="/">Home</a>
                                            <ul className="sub-menu">
                                                <li><NavLink className="active" href="/">Home Style 1</NavLink></li>
                                                <li><NavLink href="/home2">Home Style 2</NavLink></li>
                                                <li><NavLink href="/home3">Home Style 3</NavLink></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link activeClass="active" to="about" spy={true} smooth={true}  duration={500}>About</Link>
                                        </li>
                                        <li><Link activeClass="active" to="service" spy={true} smooth={true}  duration={500}>Service</Link></li>
                                        <li>
                                            <Link activeClass="active" to="portfolio" spy={true} smooth={true}  duration={500} onClick={ClickHandler}>Portfolio</Link>
                                        </li>
                                        <li>
                                            <Link activeClass="active" to="contact" spy={true} smooth={true}  duration={500}>Contact</Link>
                                        </li>
                                        <li>
                                            <Link activeClass="active" to="blog" spy={true} smooth={true}  duration={500}>Blog</Link>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-2">
                                <div className="header-right">
                                    <div className="header-btn">
                                        <a onClick={ClickHandler} className="theme-btn" download="My Cv" href="images/cv.jpg"
                                            title="ImageName">
                                            <img className="hide-img" alt="ImageName" src="images/cv.jpg" />
                                            Resume
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;