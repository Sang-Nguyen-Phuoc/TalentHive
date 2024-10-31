import React from 'react'
import NavBar from '../NavBar'
import Search from '../Search'
import style from '../../styles/components/Header.module.css'
const Header = () => {
    return (
        <div className={style["header-container"]}>
            <NavBar />
            <Search />
        </div>
    )
}

export default Header