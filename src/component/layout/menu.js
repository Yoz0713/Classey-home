import React from 'react';

import { useState } from 'react';
import { MenuToggleButton } from '../config/svgCollection';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { playVideo } from '../redux/action/videoToggle';
import { slideChange } from '../redux/type';
import { moveToBuildingTeam } from '../redux/action/buildingTeam';
const requireSvg = require.context("../../../img/layout/svg", false, /^\.\/.*\.svg$/);
const svg = requireSvg.keys().map(requireSvg);

function Menu({ playVideo }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="menu" style={{ width: open == false ? "0%" : "100%", transitionDelay: open == true ? "0s" : "0.5s" }}>
            <ToggleButton open={open} setOpen={setOpen} />
            <ToggleButton2 open={open} setOpen={setOpen} />
            <MenuContent open={open} setOpen={setOpen} playVideo={playVideo} />
        </div>
    )
}

function MenuContent({ open, setOpen, playVideo }) {

    const title = [{
        ch: "森聯機構",
        en: "TOP"
    }, {
        ch: "林口之心",
        en: "MIDTOWN"
    }, {
        ch: "建築設計",
        en: "DESIGN"
    }, {
        ch: "百年工藝",
        en: "LANDMARK"
    }, {
        ch: "市場直擊",
        en: "NEWS"
    }]
    const item = [[{
        id: "/team/coporation/sunland",
        ch: "森築開發",
        slide: 1,
    }, {
        id: "/team/coporation/oliv",
        ch: "橄欖樹行銷團隊",
        slide: 1,
    }, {
        id: null,
        ch: "建築團隊",
        slide: 1,
    }], [{
        id: "/lifefunction",
        ch: "實景空拍",
        slide: 2,
    }, {
        id: "/urban",
        ch: "都市計畫",
        slide: 2,
    }], [{
        id: "/product",
        ch: "樓層規劃",
        slide: 4,
    }], [{
        id: 1,
        ch: "車道坡度",
        slide: 4,
    }, {
        id: 2,
        ch: "樓高3米4",
        slide: 4,
    }, {
        id: 3,
        ch: "水泥磅數",
        slide: 4,
    }, {
        id: 4,
        ch: "樓板厚度",
        slide: 4,
    }, {
        id: 5,
        ch: "隔間牆",
        slide: 4,
    }], [{
        id: "/news",
        ch: "最新消息",
        slide: 5,
    }, {
        id: "/calculator",
        ch: "房貸試算",
        slide: 5,
    }, {
        id: 3,
        ch: "市場個案",
        slide: 5,
    }]]
    return (
        <div className="menu-content" style={{ clipPath: open == false ? "polygon(100% 0, 100% 100%, 100% 100%, 100% 0)" : "polygon(100% 0, 100% 100%, 0% 100%, 0% 0)" }}>
            <div className="menu-logo">
                <Link to={"/"} onClick={() => {
                    playVideo()
                    setOpen(false);

                }}>
                    <img src={svg[1].default} />
                </Link>

            </div>
            <div className="menu-option">
                <Option setOpen={setOpen} title={title[0]} item={item[0]} />
                <Option setOpen={setOpen} title={title[1]} item={item[1]} />
                <Option setOpen={setOpen} title={title[2]} item={item[2]} />
                <Option setOpen={setOpen} title={title[3]} item={item[3]} />
                <Option setOpen={setOpen} title={title[4]} item={item[4]} />
            </div>
        </div>
    )
}
export default connect(null, {
    playVideo
})(Menu)
function Option({ title, item, setOpen }) {
    const location = useLocation()
    const dispatch = useDispatch()


    return (
        <div className="option">
            <div className="option-wrapper">
                <div className="title-box" >
                    <h2>{title.en}</h2>
                    <h2>{title.ch}</h2>
                </div>
                <ul className="nav">
                    {item.map((item, i) => {
                        return <li key={item.id} onClick={() => {
                            dispatch({ type: slideChange, payload: item.slide })
                            if (item.id == null) {
                                dispatch(moveToBuildingTeam("team3"))
                            }
                            setOpen(false)
                        }} style={{ pointerEvents: item.id == null ? "auto" : location.pathname == item.id ? "none" : "auto" }}>
                            <Link to={`${item.id == null ? "/" : item.id}`}>
                                <img src={svg[2]} />
                                <p style={{ color: item.id == null ? "#000" : location.pathname == item.id ? "#ccc" : "#000" }} >{item.ch}</p>
                            </Link>

                        </li>
                    })}
                </ul>
            </div>

        </div>
    )
}





function ToggleButton({ open, setOpen }) {
    const [enter, setEnter] = useState(false)
    const [position, setPosition] = useState(null);
    const [svgHeight, setSvgHeight] = useState(null)


    const handleMouseMove = (event) => {
        setPosition(event.clientY);
    };
    const handleClick = () => {
        setOpen(!open)

    }
    const handleMouseEnter = () => {
        setEnter(true)
    }

    return (
        <div className="toggle-button" onMouseMove={handleMouseMove} onClick={handleClick} onMouseLeave={() => setEnter(false)} onMouseEnter={handleMouseEnter} style={{ right: enter == false ? "-3.5vw" : "0", }}>
            <div className="button-container" style={{ transform: `translateY(${position - (svgHeight / 2)}px)` }}>
                <MenuToggleButton open={open} setSvgHeight={setSvgHeight} />
                <div className={`hamburger ${open == true ? "hamburger-active" : null}`}>

                </div>
            </div>

        </div>
    )
}

function ToggleButton2({ open, setOpen }) {
    const [enter, setEnter] = useState(false)
    const [position, setPosition] = useState(null);
    const [svgHeight, setSvgHeight] = useState(null)
    const handleMouseMove = (event) => {
        setPosition(event.clientY);
    };
    const handleClick = () => {
        setOpen(!open)

    }
    const handleMouseEnter = () => {
        setEnter(true)
    }

    return (
        <div className="toggle-button2" onMouseMove={handleMouseMove} onClick={handleClick} onMouseLeave={() => setEnter(false)} onMouseEnter={handleMouseEnter} style={open == false ? { left: enter == false ? "-108vw" : "-105vw" } : { left: enter == false ? "-8vw" : "-5vw" }}>
            <div className="button-container" style={{ transform: `translateY(${position - (svgHeight / 2)}px)` }}>
                <MenuToggleButton open={open} setSvgHeight={setSvgHeight} />
                <div className={`hamburger ${open == true ? "hamburger-active" : null}`}>

                </div>
            </div>

        </div>
    )
}