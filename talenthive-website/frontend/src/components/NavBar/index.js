import React from 'react'
import { useNavigate } from "react-router-dom";
import style from '../../styles/components/NavBar.module.css'


const NavBar = () => {

    const navigate = useNavigate();

    return (
        <div className={style["navbar-container"]}>
            <div className={style['logo-container']} onClick={() => navigate('/')} >
                <img src="/logo192.png" alt="TalentHive" className={style["logo"]} />
                <p>TalentHive</p>
            </div>
            <div className={style['navbar-cta']}>
                <div className={style['text']} onClick={() => navigate('/about-us')}><p>About Us</p> </div>
                <div className={style['text']} onClick={() => navigate('/signin')}><p>Sign in</p></div>
            </div>

        </div>
    )
}

export default NavBar