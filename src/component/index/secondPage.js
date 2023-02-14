import React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { HomeSecondPageSvgTree, HomeSecondPageSunlandLogo } from '../config/svgCollection';
// Import animation libary
import { gsap } from "gsap";
const requireSvg = require.context("../../../img/index/svg", false, /^\.\/.*\.svg$/);
const svg = requireSvg.keys().map(requireSvg);
const requireWebp = require.context("../../../img/index/webp", false, /^\.\/.*\.webp$/);
const webp = requireWebp.keys().map(requireWebp);
const requirePng = require.context("../../../img/index/png", false, /^\.\/.*\.png$/);
const png = requirePng.keys().map(requirePng);

export default function SecondPage() {
    const secondPage = useRef();
    const [type, setType] = useState(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (type == "team3") {
                let gg = gsap.timeline()
                gg.to(`.${type} :nth-child(1)`, {
                    color: "#c3a457",
                    duration: 0.001
                }, "<").from(`.building-team`, {
                    x: 50,
                    opacity: 0,
                    duration: 0.8
                }, "<").from(`.building-team .thumb img`, {
                    y: 25,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.2
                }, "<+0.6")
            } else {
                let gg = gsap.timeline()

                gg.to(`.${type} :nth-child(1)`, {
                    color: "#c3a457",
                    duration: 0.001
                }, "<").fromTo("svg path", {
                    strokeDashoffset: 2200,
                    strokeDasharray: 2200,
                }, {
                    strokeDashoffset: type == "team1" ? 0 : type == "team2" ? 1650 : 450,
                    duration: 3,
                }).to("svg", {
                    opacity: 0,
                    duration: 0.9,
                }, "<+1").from(".cover-logo .imgBox > img", {
                    opacity: 0,
                    duration: 0.9,
                }, "<").from(".cover-logo .imgBox > img", {
                    scale: 1.6,
                    duration: 20,
                }, "<")
            }

        }, secondPage)
        return () => ctx.revert(); // cleanup
    }, [type])
    const handleClick = ((e) => {
        setType(e.target.className)
    })
    return (
        <section className="second-page" ref={secondPage}>
            <CoverLogo type={type} />
            <SectionNav handleClick={handleClick} />
        </section>
    )
}

function CoverLogo({ type }) {

    return (
        <div className="cover-logo">
            <HomeSecondPageSunlandLogo type={type} />
            <HomeSecondPageSvgTree type={type} />

            <div className={`imgBox ${type}`} >
                <img src={webp[3].default} style={{ display: type == "team1" ? "block" : "none" }} />
                <img src={webp[4].default} style={{ display: type == "team2" ? "block" : "none" }} />
                <BuildingTeam type={type} />
            </div>

        </div>
    )
}

function SectionNav({ handleClick }) {
    let team = [{
        id: 1,
        ch: "森聯建設",
        en: "SUNLAND DEVELOPMENT"
    }, {
        id: 2,
        ch: "橄欖樹行銷團隊",
        en: "OLIVE TREE TEAM"
    }, {
        id: 3,
        ch: "建築團隊",
        en: "BUILDING TEAM"
    },]
    return (
        <div className="section-nav">
            <div className="title-box" >
                <img src={svg[3]} />
                <h3>PROFESSIONAL<br />TEAM</h3>
            </div>
            <ul className="nav">
                {team.map((item, i) => {
                    return <li key={item.id} className={`team${i + 1}`} onClick={handleClick}><p >{item.ch}</p><p>{item.en}</p></li>
                })}
            </ul>
        </div>
    )
}

function BuildingTeam({ type }) {
    const [thumb, setThumb] = useState("thumb1");
    const handleClick = (e) => {
        let gg = gsap.timeline()
        gg.to(".building-team > img", {
            x: 50,
            opacity: 0,
        }).then(() => {
            setThumb(e.target.className)
        })

    }
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let gg = gsap.timeline()
            gg.from(".building-team > img", {
                x: 50,
                opacity: 0,
                duration: 0.8
            })

        })
        return () => ctx.revert(); // cleanup
    }, [thumb])
    return (
        <div className="building-team" style={{ display: type == "team3" ? "flex" : "none" }}>
            <img src={png[0].default} style={{ display: thumb == "thumb1" ? "block" : "none" }} />
            <img src={webp[7].default} style={{ display: thumb == "thumb2" ? "block" : "none" }} />
            <img src={webp[8].default} style={{ display: thumb == "thumb3" ? "block" : "none" }} />
            <img src={png[1].default} style={{ display: thumb == "thumb4" ? "block" : "none" }} />
            <div className="thumb">
                <img onClick={handleClick} className='thumb1' src={png[0].default} style={{ filter: thumb == "thumb1" ? "brightness(0.3)" : "brightness(1)" }} />
                <img onClick={handleClick} className='thumb2' src={webp[7].default} style={{ filter: thumb == "thumb2" ? "brightness(0.3)" : "brightness(1)" }} />
                <img onClick={handleClick} className='thumb3' src={webp[8].default} style={{ filter: thumb == "thumb3" ? "brightness(0.3)" : "brightness(1)" }} />
                <img onClick={handleClick} className='thumb4' src={png[1].default} style={{ filter: thumb == "thumb4" ? "brightness(0.3)" : "brightness(1)" }} />
            </div>
        </div>
    )
}
