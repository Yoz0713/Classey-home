import React from 'react'
import { useRef, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Import animation libary
import { gsap } from "gsap";

const requireSvg = require.context("../../../img/index/svg", false, /^\.\/.*\.svg$/);
const svg = requireSvg.keys().map(requireSvg);
const requireWebp = require.context("../../../img/index/webp", false, /^\.\/.*\.webp$/);
const webp = requireWebp.keys().map(requireWebp);
function SixthPage({ reduxState }) {
    const animateRef = useRef(null);
    let animationDone = false

    useLayoutEffect(() => {
        let gg;
        let ctx;

        if (reduxState === 5) {
            ctx = gsap.context(() => {
                gg = gsap.timeline({ paused: true })
                gg.from(".sixth-page-card .card", {
                    opacity: 0,
                    filter: "blur(2px)",
                    duration: 1.8,
                    y: "2.5vw",
                    stagger: 0.5
                }).fromTo(".sixth-page-card .card .imgBox", {
                    rotateY: 60,

                }, {
                    rotateY: 0,
                    stagger: 0.5,
                    duration: 1.4
                }, "<").then(() => {
                    animationDone = true
                })
            }, animateRef)
            setTimeout(() => {
                gg.play()
            }, 800);

            return () => {
                ctx.revert()
            }
        }


    }, [reduxState])

    const handleMouseMove = function (e) {

        let gg = gsap.timeline({ paused: true })
        gg.to(".sixth-page-card .imgBox img", {
            x: `${(animateRef.current.clientWidth / 2 - e.pageX) / 35}px`
        }).to(".sixth-page-card .imgBox", {
            rotateY: (animateRef.current.clientWidth / 2 - e.pageX) / 75,
            // rotateX: (animateRef.current.clientHeight / 2 - e.pageY) / 75,
        })
        if (animationDone == true) {
            gg.play()
        }
    }
    return (
        <section className="sixth-page" ref={animateRef} onMouseMove={handleMouseMove}>
            <SixthPagePara />
            <SixthPageCard />
            <img src={svg[2]} />
        </section>
    )
}
// connect hoc方式綁定sixth-page
export default connect((state) => {
    return {
        reduxState: state.slideReducer.slide
    }
}, null)(SixthPage)

function SixthPagePara() {
    return (
        <div className="sixth-page-para">
            <div className="title-box" >
                <img src={svg[3]} />
                <h3>LATEST<br />NEWS</h3>
            </div>
        </div>
    )

}
function SixthPageCard() {
    return (
        <div className="sixth-page-card">
            <Card img={webp[20].default} num={"01."} text={"NEWS"} style={{ marginTop: "6.5vw" }} style2={{ objectPosition: "center 0%" }} />
            <Card img={webp[21].default} url={"/calculator"} num={"02."} text={"CALCULATION"} style2={{ objectPosition: "85% center" }} />
            <Card img={webp[22].default} num={"03."} text={"INFORMATION"} style={{ marginTop: "-6.5vw" }} />
        </div>
    )
}
function Card({ img, num, text, style, style2, url }) {
    return (
        <div className="card" style={style}>
            <div className="imgBox">
                <div className="box">
                    <img src={img} style={style2} />
                </div>

                <span>{num}</span>
            </div>
            <div className="paraBox">
                <h6>{text}</h6>
            </div>
            <Link to={url}></Link>
        </div>
    )
}