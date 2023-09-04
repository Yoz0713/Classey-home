import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap';
import { EquipmentTitle } from '.'

export default function Cement() {
    const animateRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let gg = gsap.timeline()
            gg.from(".titleBox h2 span", {
                stagger: 0.05,
                opacity: 0,
                x: 30
            }).from(".content h4 ", {
                opacity: 0,
                x: 30
            }, "<+0.8").from(".content p", {
                opacity: 0,
                x: 30
            }, "<+0.3").from(".content .left img", {
                opacity: 0,
                x: 30
            }, "<").from(".content .left .more", {
                opacity: 0,
                x: 30
            }, "<+0.3").from(".content .right img", {
                opacity: 0,
                y: 30,
                duration: 1.5
            }, "<")
        }, [animateRef]);
        return () => ctx.revert();
    }, [])
    return (
        <section className='cement' ref={animateRef}>
            <div className="left">
                <EquipmentTitle />
                <h4>水泥磅數</h4>
                <p>結構體使用高品質混凝土，<br />
                    <span style={{ fontWeight: 800, fontFamily: `"Microsoft JhengHei", serif` }}>
                        B4~4F 6000磅<br />
                        4F~10F 5000磅<br />
                        10F~屋突層 4000磅，<br />
                    </span>
                    穩定基本結構安全，保障建築最根本的安全堡壘!</p>
            </div>
            <div className="right" style={{ width: "60%", height: "90%" }}>
                <img src={require("../../../img/equipment/webp/004-cement-bg.webp").default} style={{ height: "100%", width: "auto" }} />
            </div>
        </section>
    )
}
