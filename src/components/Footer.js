import React from 'react';
import { AiOutlineLinkedin, AiOutlineWhatsApp,AiOutlineMail} from 'react-icons/ai'

const Footer = () =>{

    return (
        <footer > 
            <p>Copyright 2019-{new Date().getFullYear()} <span>&#xA9;</span>Serve Me. All rights reserved.</p> 
            <div className="footer-socials">
                <p>Created By Abhishek Dwivedi.</p>
                <a href="https://www.linkedin.com/in/abhishek-dwivedi-9803661a1/" target="_blank" rel="noopener noreferrer"><AiOutlineLinkedin/></a>
                <a href="mailto:abhishekdwivedi037@gmail.com" target="_blank" rel="noopener noreferrer"><AiOutlineMail/></a>
                <a href="https://wa.me/+918534033595" target="_blank" rel="noopener noreferrer"><AiOutlineWhatsApp/></a>
            </div>
        </footer>
    )
}

export {Footer as default}
