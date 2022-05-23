import react from 'react';
import gpt3Logo from '../../assets/images/logo.svg';
import './footer.scss';

const TheFooter = () => {
    return (
        <footer className="landing-footer section__padding">
            <div className="landing-footer-heading">
                <h1 className="gradient__text">Do you want to step in to the future before others</h1>
            </div>

            <div className="landing-footer-btn">
                <p>Request Early Access</p>
            </div>

            <div className="landing-footer-links">
                <div className="landing-footer-links_logo">
                    {/*<img src={gpt3Logo} alt="gpt3_logo" />*/}
                    <p>Crechterwoord K12 182 DK Alknjkcb, <br /> All Rights Reserved</p>
                </div>
                <div className="landing-footer-links_div">
                    <h4>Links</h4>
                    <p>Overons</p>
                    <p>Social Media</p>
                    <p>Counters</p>
                    <p>Contact</p>
                </div>
                <div className="landing-footer-links_div">
                    <h4>Company</h4>
                    <p>Terms & Conditions </p>
                    <p>Privacy Policy</p>
                    <p>Contact</p>
                </div>
                <div className="landing-footer-links_div">
                    <h4>Get in touch</h4>
                    <p>Crechterwoord K12 182 DK Alknjkcb</p>
                    <p>085-132567</p>
                    <p>info@payme.net</p>
                </div>
            </div>

            <div className="landing-footer-copyright">
                <p>@2021 GPT-3. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default TheFooter;
