import React from 'react'

const SubmitHandler = (e) => {
    e.preventDefault()
}

const Footer = (props) => {
    return (
        <footer className="wpo-site-footer">
            <div className="upper-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="widget about-widget">
                                <div className="social-icons">
                                    <ul>
                                        <li>
                                            <a href="https://t.me/lbbchina">
                                                <i
                                                    className="ti-location-arrow"
                                                    style={{
                                                        border: "1px solid white",
                                                        borderRadius: "40px",
                                                        fontSize: "5px",
                                                        padding: "3px"
                                                    }}>
                                                </i>
                                            </a>
                                        </li>
                                        {/* <li>
                                            <Link to="/">
                                                <i className="ti-twitter-alt">
                                                </i>
                                            </Link>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
            <div className="lower-footer">
                <div className="container">
                    <div className="row">
                        <div className="separator"></div>
                        <p className="copyright">Copyright &copy; 2023 LBB. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;