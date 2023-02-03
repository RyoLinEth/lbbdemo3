import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { ethers } from 'ethers'
import { useRouter } from 'next/router';
import Loading from '../Loading';

const defaultInviter = "0x3Da22618ABd874623cA479CA1FB49674174EA970";

const About = (props) => {
    const [inviterAddress, setInviterAddress] = useState(defaultInviter)
    const [isInviterSet, setIsInviterSet] = useState(false)

    const [isJoined, setIsJoined] = useState(false);
    const [isIDOActive, setIsIDOActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGetOnce, setIsGetOnce] = useState(false);

    useEffect(() => {
        const getContractValue = async () => {
            if (props.contract === null) return;

            let tempJoin = await props.contract.isAddressJoined(props.defaultAccount);
            console.log("The address has joined? " + tempJoin)
            setIsJoined(tempJoin);

            let tempIDOActive = await props.contract.isIDOActive();
            console.log("The ido is active? " + tempIDOActive)
            setIsIDOActive(tempIDOActive);

            console.log(
                `
            isJoined : ${tempJoin}
            isIDOActive : ${tempIDOActive}
            `
            )
        }

        getContractValue()
    }, [props.defaultAccount, props.contract])

    const checkBalance = async () => {
        let tempBalanceHex = await props.usdtContract.balanceOf(props.defaultAccount);
        let tempBalance = ethers.utils.formatEther(`${tempBalanceHex}`)
        console.log("My balance is " + tempBalance);
        return tempBalance;
    }

    const checkAllowance = async () => {
        console.log("Checking Allowance...");
        let allowance = await props.usdtContract.allowance(props.defaultAccount, props.contract.address);
        const allowanceAmount = ethers.utils.formatEther(`${allowance}`)
        return allowanceAmount;
    }

    const checkAllowanceAgain = async (value) => {
        let result = await checkAllowance()
        console.log("In check allowance again : " + result);

        if (result < value) {
            setIsLoading(true);
            setTimeout(async () => {
                await checkAllowanceAgain(value)
                return;
            }, 3000)
        }
        else
            handleContribute(value);
    }

    const handleContribute = async (value) => {
        setIsLoading(false);
        try {
            let etherAmount;
            etherAmount = ethers.utils.parseEther(`${value}`);
            console.log("In handle contribute")
            console.log(`
            Inviter : ${inviterAddress}
            USDT Amount : ${etherAmount}`)
            let result = await props.contract.makeIDO(
                inviterAddress, etherAmount, { gasLimit: "1000000" }
            );

            if (!result) {
                swal("錯誤", "認購失敗", "error");
            } else {
                setIsJoined(true);
                if (value === 50)
                    swal("成功", "成功認購 50 USDT", "success");
                if (value === 100)
                    swal("成功", "成功認購 100 USDT", "success");
            }
        } catch (err) {
            console.log(err)
        }

    }

    const joinIDO = async (value) => {
        console.log(isJoined)
        if (props.defaultAccount === null) {
            swal("錯誤", "請先連結錢包", "error");
            return;
        }
        if (isIDOActive === false) {
            swal("錯誤", "IDO 未開啟", "error");
            return;
        }
        if (isJoined === true) {
            swal("錯誤", "您已參加過IDO", "error");
            return;
        }
        let balance = await checkBalance()

        if (value > balance) {
            swal("錯誤", "您沒有足夠的USDT", "error");
            return;
        }

        let result = await checkAllowance()
        const approveAmount = ethers.utils.toWei(`${value}`, 'ether');

        if (result >= value) {

            console.log(`Allowance ${result}`)
            console.log(`ApproveAmount ${approveAmount}`)
            console.log(`Allowance is enought for ${value} USDT`)
            handleContribute(value)
        }
        else
            try {
                console.log(`Allowance is NOT enought for ${value} USDT`)
                let result2 = await props.usdtContract.approve(props.contract.address, approveAmount);
                if (result2)
                    checkAllowanceAgain(value);
            } catch {
                swal("錯誤", "授權USDT失敗", "error");
            }
    }

    const router = useRouter();
    const { pathname, query } = router;

    const analyzeLink = () => {
        if (inviterAddress !== defaultInviter) return;
        if (isInviterSet === true) return;
        let tempInviter = query['inviter']
        
        if (tempInviter !== undefined) {
            try {
                let checkSumAddress = ethers.utils.getChecksumAddress(tempInviter)
                setInviterAddress(checkSumAddress);
                console.log("The Inviter Set to : " + checkSumAddress);
            } catch (err) {
                console.log(`Address : ${tempInviter} cannot be transformed into a checksum address`)
            }
        }
    }


    analyzeLink()


    return (
        <div className="wpo-about-area section-padding" id='about'>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-12 col-sm-12">

                        <div onClick={() => setIsLoading(false)}>
                            {
                                isLoading &&
                                <Loading />
                            }
                        </div>
                        <div className="wpo-about-exprience-wrap">
                            <div className="wpo-about-exprience">
                                <h2>IDO</h2>
                                <span>參與IDO</span>
                            </div>
                            <div className="client">
                                <h3><span data-count="100">100</span>%</h3>
                                <p>智能合約<br />自動執行</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1 col-md-12 col-sm-12">
                        <div className="wpo-about-content">
                            <div className="wpo-about-title">
                                <h2>LBB - 三代返傭</h2><br />
                            </div>

                            <h5>三代IDO USDT實時返傭</h5>
                            <div className="wpo-about-funfact">
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div className="grid">
                                        <div className="grid-inner">
                                            <h3><span data-count="98">6</span>%</h3>
                                            <p>一代</p>
                                        </div>
                                    </div>
                                    <div className="grid">
                                        <div className="grid-inner">
                                            <h3><span data-count="92">2</span>%</h3>
                                            <p>二代</p>
                                        </div>
                                    </div>
                                    <div className="grid">
                                        <div className="grid-inner">
                                            <h3><span data-count="88">1</span>%</h3>
                                            <p>三代</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>IDO額度 50 / 100 USDT</h5>
                            <div className="wpo-about-funfact">
                                <div className="grid" style={{ cursor: "pointer" }}>
                                    <div className="grid-inner" onClick={() => joinIDO(50)}>
                                        <h3><span data-count="72">50</span></h3>
                                        <p>USDT</p>
                                    </div>
                                </div>
                                <div className="grid" style={{ cursor: "pointer" }}>
                                    <div className="grid-inner" onClick={() => joinIDO(100)}>
                                        <h3><span data-count="43">100</span></h3>
                                        <p>USDT</p>
                                    </div>
                                </div>
                            </div>
                            <h5 style={{ color: 'red' }}>** 點擊上方按鈕直接參加IDO **</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ab-shape">
                <svg width="995" height="1495" viewBox="0 0 995 1495" fill="none">
                    <g opacity="0.3" filter="url(#filter0_f_39_4267)">
                        <circle cx="247.5" cy="747.5" r="247.5" fill="#FFE500" />
                    </g>
                    <defs>
                        <filter id="filter0_f_39_4267" x="-500" y="0" width="1495" height="1495"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_39_4267" />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className="ab-shape-s2">
                <svg width="1252" height="1901" viewBox="0 0 1252 1901" fill="none">
                    <g opacity="0.15" filter="url(#filter0_f_39_4265)">
                        <circle cx="950" cy="950.004" r="450" />
                    </g>
                    <defs>
                        <filter id="filter0_f_39_4265" x="-0.00012207" y="0.00402832" width="1900" height="1900"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_39_4265" />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className="line-shape-1">
                <img src="images/about/shape1.png" alt="" />
            </div>
            <div className="line-shape-2">
                <img src="images/about/shape2.png" alt="" />
            </div>
        </div >
    )
}

export default About;