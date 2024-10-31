import React from "react";
import style from '../../styles/components/Footer.module.css';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.box}>
                    <ul className={style.flex}>
                        <li>Terms of Use</li>
                        <li>Privacy-Policy</li>
                        <li>Blog</li>
                        <li>FAQ</li>
                        <li>Watch List</li>
                    </ul>
                    <p>© 2022 STREAMIT. All Rights Reserved. All videos and shows on this platform are trademarks of, and all related images and content are the property of, Streamit Inc. Duplication and copy of this is strictly prohibited. All rights reserved.</p>
                </div>
                <div className={style.box}>
                    <h3>Follow Us</h3>
                    <a href="https://www.facebook.com/profile.php?id=100027486292554" target="_blank" className={style.socialIcon}><BsFacebook /></a>
                    <a href="#" className={style.socialIcon}><BsTwitter /></a>
                    <a href="#" className={style.socialIcon}><BsGithub /></a>
                    <a href="#" className={style.socialIcon}><BsInstagram /></a>
                </div>
                <div className={style.box}>
                    <h3>Streamit App</h3>
                    <div className={style['media-link']}>
                        <img src='https://img.icons8.com/color/48/000000/apple-app-store--v3.png' alt="App Store" />
                        <span>App Store</span>
                    </div>
                    <div className={style['media-link']}>
                        <img src='https://img.icons8.com/fluency/48/000000/google-play.png' alt="Google Play" />
                        <span>Google Play</span>
                    </div>
                    <br />

                </div>
            </div>
        </footer>
    );
};

export default Footer;
