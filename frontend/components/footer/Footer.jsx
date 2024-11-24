import styles from './footer.module.css'
import footerlogo from '../../src/assets/footerlogo.png';
import download from '../../src/assets/download.png'
import fb from '../../src/assets/fb.png'
import insta from '../../src/assets/insta.png'
import tiktok from '../../src/assets/tiktok.png'
import snapchat from '../../src/assets/snapchat.png'
import { toast } from 'react-toastify'

function footer({width}) {
  return (
    <div className={styles.container}>
        <div className={width > 720 ? styles.content : styles.contentMobile}>
            <div className={styles.left}>
                <img className={styles.logo} src={footerlogo} alt="OrderIn" />
                <img className={styles.download} src={download} alt="download"/>
                <p>Company #490039-445, Registered with House of companies.</p>
            </div>
            <div className={styles.middle}>
                <h3>Get Exclusive Deals in your Inbox</h3>
                <span className={styles.subscribe}>
                    <input type='text' placeholder='youremail@gmail.com'/>
                    <button onClick={()=>{toast.success("Subscribed successfully.")}}>Subscribe</button>
                </span>
                <p>we wont spam, read our <u>email policy</u></p>
                <div className={styles.socials}>
                    <img src={fb} alt="facebook"/>
                    <img src={insta} alt="instagram"/>
                    <img src={tiktok} alt="tiktok"/>
                    <img src={snapchat} alt="snapchat"/>
                </div>
            </div>
            <div className={styles.rightOne}>
                <h3>Legal Pages</h3><br/>
                <u>Terms and conditions</u><br/>
                <u>Privacy</u><br/>
                <u>Cookies</u><br/>
                <u>Modern Slavery Statement</u><br/>
            </div>
            <div className={styles.rightTwo}>
                <h3>Important Links</h3><br/>
                <u>Get help</u><br/>
                <u>Add your restaurant</u><br/>
                <u>Sign up to deliver</u><br/>
                <u>Create a business account</u><br/>
            </div>
        </div>
      <div className={width > 720 ? styles.footnote : styles.footnoteMobile}>
        <span className={styles.leftFootnote}>
            Order.in Copyright 2024, All Rights Reserved.
        </span>
        {width > 720 ? (
        <span className={styles.rightFootnote}>
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>Pricing</span>
            <span>Do not sell or share my personal information</span>
        </span>
        ): (null)}
      </div>
    </div>
  )
}

export default footer
