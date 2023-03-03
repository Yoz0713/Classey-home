import React from 'react';
import MoveBack from '../config/moveBack';
import Header from "./header"
import Menu from './menu';
export default function Layout() {
    return (
        <>
            <MoveBack z={20} />
            <Header />
            <Menu />
        </>

    )
}