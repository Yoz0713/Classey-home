import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FloorNav } from './floor/chooseFloor'
import { useSelector } from 'react-redux'
import { sortData } from './floor/data/floorData'
import FancyBox from "@/src/component/config/fancyBox"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScaleDrag from "@/src/component/config/scaleDrag"
import { PatternDiagramThumbnail } from '../config/svgCollection'
export default function FloorPlan() {
    //獲取棟別
    const location = useLocation()
    const queryString = location.search
    const urlParams = new URLSearchParams(queryString);
    const building = urlParams.get('building');
    const [type, setType] = useState(building);
    //獲取樓別
    const selector = useSelector(state => state.floorReducer.floor)
    const floor = selector ? selector.toUpperCase() : "1F"
    return (
        <section className="floor-plan">
            <div className="left">
                <FloorPlanTitle floor={floor} type={type} />
                <FloorNav building={type} flag={false} />
            </div>
            <div className="right">
                <FloorPlanImg floor={floor} type={type} />
            </div>
        </section>
    )
}


function FloorPlanTitle({ floor, type }) {
    const concactFloor = ["1F", "1.5F", "2F", "B1", "B2", "B3", "B4"]

    return (
        <div className="floor-plan-title">
            <TransitionGroup>
                <CSSTransition
                    key={floor}
                    timeout={500}
                    classNames="fade"
                >
                    {!concactFloor.find((item) => item == floor) ? (
                        <h2>
                            <span className='building'>
                                {type}
                                <span className='dong'>棟</span>
                            </span>
                            <span className='floor'>{floor}</span>{floor === "5~8F" ? "標準層" : "全區平面圖"}
                        </h2>
                    ) : (
                        <h2>
                            <span className='floor'>{floor}</span>全區平面圖
                        </h2>
                    )}
                </CSSTransition>
            </TransitionGroup>
                    
        </div>
    )
}

function FloorPlanImg({ floor, type }) {
    const [carousel, setCarousel] = useState(0)
    return (
        <div className="floor-plan-img">

            <ScaleDrag maxRatio={2.5} zoomImg1={require("../../../img/urban/svg/001-plus-button.svg")} zoomImg2={require("../../../img/urban/svg/002-minus-button.svg")}>
                <TransitionGroup>
                    <CSSTransition
                        key={`${floor}2`}
                        timeout={1000}
                        classNames="fade"
                    >
                        <div className="container">
                            {sortData.map((item, i) => {
                                if (floor == item.type) {
                                    if (item.img && (item.img[type] || typeof item.img == "string")) {
                                        const imgURL = typeof item.img == "string" ? item.img : item.img[type]
                                        return (
                                            <div className="anchor-area" >
                                                <img src={imgURL} />
                                                {Array.isArray(item.anchor) > 0 ? item.anchor.map((item) => {
                                                    return (
                                                        <div className={`${item.class}`} >
                                                            <FancyBox thumbUrl={item.thumb}>
                                                                <div className="floorPlan-fancy">
                                                                    {item.fancyImg.map((item, i) => {
                                                                        return (
                                                                            <img src={item} key={i} style={{ opacity: carousel == i ? 1 : 0 }} />
                                                                        )
                                                                    })}
                                                                    <div className="title">
                                                                        <p>{`${item.title}-3D示意圖`}</p>
                                                                    </div>
                                                                    {item.fancyImg.length > 1 &&
                                                                        <NavBox carousel={carousel} setCarousel={setCarousel} limit={{ min: 0, max: item.fancyImg.length - 1 }} />
                                                                    }
                                                                </div>
                                                            </FancyBox>
                                                            <div className="radiation">
                                                                <div className="circle"></div>
                                                                <div className="circle"></div>
                                                                <div className="circle"></div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                    :
                                                    ((typeof item.anchor == "object" && item.anchor[type]) && item.anchor.configurationGraph) ? item.anchor[type].map((itemInner) => {
                                                        return (
                                                            // 以下為樓層傢配圖分棟
                                                            <FunitureFancyBox item={itemInner} configurationGraph={item.anchor.configurationGraph} />
                                                        )
                                                    })
                                                        : (typeof item.anchor == "object" && item.anchor[type]) && item.anchor[type].map((item) => {
                                                            // 以下為頂樓公設分棟
                                                            return (
                                                                <div className={`${item.class}`} >
                                                                    <FancyBox thumbUrl={item.thumb}>
                                                                        <div className="floorPlan-fancy">
                                                                            {item.fancyImg.map((item, i) => {
                                                                                return (
                                                                                    <img src={item} key={i} style={{ opacity: carousel == i ? 1 : 0 }} />
                                                                                )
                                                                            })}
                                                                            <div className="title">
                                                                                <p>{`${item.title}-3D示意圖`}</p>
                                                                            </div>
                                                                            {item.fancyImg.length > 1 &&
                                                                                <NavBox carousel={carousel} setCarousel={setCarousel} limit={{ min: 0, max: item.fancyImg.length - 1 }} />
                                                                            }
                                                                        </div>
                                                                    </FancyBox>
                                                                    <div className="radiation">
                                                                        <div className="circle"></div>
                                                                        <div className="circle"></div>
                                                                        <div className="circle"></div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })

                                                }
                                                {item.text &&
                                                    <FancyBox text={item.text}>
                                                        <img style={{ position: "absolute", right: 0, left: 0, top: 0, bottom: 0, margin: "auto", width: "auto", height: "100%" }} src={require("@/img/product/floor/floorPlan/webp/1f-colored.webp").default} />
                                                    </FancyBox>
                                                }
                                            </div>

                                        )
                                    } else {
                                        return (
                                            <p>即將公開</p>
                                        )
                                    }
                                }
                            })}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </ScaleDrag>

        </div>
    )
}


function NavBox({ carousel, setCarousel, limit }) {
    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let prevValue = carousel
        if (e.target.className == "prev") {
            if (!(limit.min == prevValue)) {
                prevValue = prevValue - 1;
            }

        } else {
            if (!(limit.max == prevValue)) {
                prevValue = prevValue + 1;
            }

        }
        setCarousel(prevValue)
    }
    return (
        <div className="navBox" onClick={() => setCarousel(0)}>
            <div className="prev" onClick={handleClick}>
                <img src={require("@/img/equipment/svg/003-arrow.svg")} />
            </div>
            <div className="next" onClick={handleClick}>
                <img src={require("@/img/equipment/svg/003-arrow.svg")} />
            </div>
        </div>
    )
}


const FunitureFancyBox = ({ item, configurationGraph }) => {
    return (
        <div className={`${item.class}`} >
            <FancyBox thumbUrl={item.thumb}>
                <div className="funiture-fancy" style={{ display: "flex" }}>
                    <div className="left">
                        <div className="titleBox">
                            <h2><span>{item.title.split(",")[0]}</span>{item.title.split(",")[1]}</h2>
                            <h4>傢俱配置參考示意圖</h4>
                        </div>
                        <PatternDiagramThumbnail data={item} configurationGraph={configurationGraph} />
                        <p>權狀:{item.ping}坪</p>
                    </div>
                    <div className="right">
                        <ScaleDrag maxRatio={2.2} zoomImg1={require("../../../img/urban/svg/001-plus-button.svg")} zoomImg2={require("../../../img/urban/svg/002-minus-button.svg")}>
                            <img src={item.fancyImg[0]} />
                        </ScaleDrag>
                    </div>
                    <p>本圖僅供俱配置示意參考,實際之格局、建材依合約附圖及建材表為準。</p>
                </div>
            </FancyBox>
            <div className="radiation">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    )
}