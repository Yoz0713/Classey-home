import React, { useState } from 'react'
import ReactDOM from 'react-dom';
export default function FancyBox({ thumbUrl, text, children }) {
    const [open, setOpen] = useState(false);



    const imgStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
    }

    return (
        <>
            <div className="thumbBox" style={{ pointerEvents: "auto", cursor: "pointer" }} onClick={() => {
                setOpen(true)
            }}>
                {thumbUrl ?
                    <img src={thumbUrl} style={imgStyle} /> :
                    text ? <p>{text}</p> : null
                }
            </div>
            {open ? <Modal open={open} setOpen={setOpen} children={children} /> : null}


        </>

    )
}

function Modal({ open, setOpen, children }) {
    const domNode = document.querySelector(".fadeIn");
    const fancyBoxStyle = {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        pointerEvents: "auto",
        opacity: open ? "1" : "0",
        pointerEvents: open ? "auto" : "none",
        transition: "0.6s",
        backgroundColor: "#f7f7f7"
    }
    const closeStyle = {

        position: "absolute",
        backgroundColor: "#c3a457",
        width: "100%", height: "1px",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: "auto"
    }
    return ReactDOM.createPortal(
        <div className="fancyBox" style={fancyBoxStyle} >
            {children}
            <div className="close" style={{ position: "absolute", right: "4vw", top: "2vw", cursor: "pointer", width: "2vw", height: "2vw" }} onClick={() => {
                setOpen(false)
            }}>
                <div className="line1" style={{ ...closeStyle, transform: "rotate(45deg)" }}></div>
                <div className="line2" style={{ ...closeStyle, transform: "rotate(-45deg)" }}></div>
            </div>
        </div>,
        domNode
    )
}
