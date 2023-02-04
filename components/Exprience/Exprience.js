import React, { useState, useEffect, useRef } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import swal from 'sweetalert'

const Expriences = [
    {
        date: '專屬邀請連結',
    },
]


const ExprienceSec = (props) => {
    const buttonRef = useRef(null);

    const defaultInviteLink = "尚未連接錢包";
    const [inviteLink, setInviteLink] = useState(defaultInviteLink);

    const generateLink = (value) => {
        let tempLink = window.location.origin + "/?inviter=" + value;
        setInviteLink(tempLink);
    }

    const copyLink = () => {
        if (inviteLink === defaultInviteLink) {
            swal("錯誤", "尚未連結錢包", "error")
            return;
        }
        navigator.clipboard.writeText(inviteLink).then(() => {
            swal("成功", `已成功複製連結 ${inviteLink}`, "success")
        }, (err) => {
            alert(err);
            // swal("異常", "複製失敗", "error")
        })
    }

    useEffect(() => {
        if (props.defaultAccount !== null) {
            generateLink(props.defaultAccount);
        }
    }, [props.defaultAccount])

    return (
        <div className="wpo-work-area section-padding" id="experience">
            <div className="container">
                <SectionTitle Title={'我的邀請連結'} />
                <div className="wpo-work-wrap">
                    {Expriences.map((exprience, exp) => (
                        <div className="wpo-work-item" key={exp}>
                            <ul>
                                <li className="date">{exprience.date}</li>
                                <li style={{ wordWrap: 'break-word', maxWidth: '80vw' }}>{inviteLink}</li>
                                <li className="link" ref={buttonRef} onClick={copyLink}>
                                    <a>複製連結</a>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="shape-wk">
                <svg width="1500" height="1500" viewBox="0 0 1500 1500" fill="none">
                    <g opacity="0.45" filter="url(#filter0_f_39_4214)">
                        <circle cx="750" cy="750" r="200" />
                    </g>
                    <defs>
                        <filter id="filter0_f_39_4214" x="0" y="0" width="1500" height="1500"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="275" result="effect1_foregroundBlur_39_4212" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default ExprienceSec;