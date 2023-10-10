import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { images, NavItems } from '../../constants';

export const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [firmData, setFirmData] = useState({});
    useEffect(() => {
        async function fetchFirmData() {
            const response = await fetch(`${process.env.REACT_APP_API_URL}v3/firmLogos/`);
            const data = await response.json();
            console.log(data[0]);
            setFirmData(data[0]);
        }
        fetchFirmData();
    }, [firmData]);
    return (
        <nav className='app__navbar'>
            <div className='app__navbar-logo'>
                <img src={images.logo} alt='logo' />
            </div>
            <ul className='app__navbar-links'>
                {NavItems.map((item) => (
                    <li className='app__flex p-text' key={`link-${item}`}>
                        <div />
                        <a href={`#${item}`}>{item}</a>
                    </li>
                ))}
            </ul>

            <div className='app__navbar-menu'>
                <HiMenuAlt4 onClick={() => setToggle(true)} />

                {toggle && (
                    <motion.div
                        whileInView={{ x: [300, 0] }}
                        transition={{ duration: 0.85, ease: 'easeOut' }}>
                        <HiX onClick={() => setToggle(false)} />
                        <ul>
                            {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item}`} onClick={() => setToggle(false)}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};
