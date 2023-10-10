import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images, NavItemEnum } from '../../constants';
import './Header.css';


const scaleVariants = {
    whileInView: {
        scale: [0, 1],
        opacity: [0, 1],
        transition: {
            duration: 1,
            ease: 'easeInOut',
        },
    },
};



const imageSliderVariants = {
    enter: {
        opacity: 0,
    },
    center: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

const Header = () => {
    const getNote = {
        welcome: "",
        detail: "",
        note: ""
    };
    const getImageWrapper = { mdImg: "", bgImg: "", smImg: "" };
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageArray, setImageArray] = useState([]);
    const [notes, setNotes] = useState(getNote);
    const [imageData, setImageWraperData] = useState([]);

    function getSelectedNote(selectedNote) {
        const matchingProperties = {};
        for (const key in selectedNote) {
            if (getNote.hasOwnProperty(key)) {
                matchingProperties[key] = selectedNote[key];
            }
        }
        return matchingProperties;
    }

    function getSelectedImageWrapper(selectedItem) {
        const arr = [];
        for (const key in selectedItem) {
            if (getImageWrapper.hasOwnProperty(key)) {
                arr.push(selectedItem[key]);
            }
        }
        [arr[0], arr[1]] = [arr[1], arr[0]];
        return arr;
    }

    useEffect(() => {
        async function fetchGallary() {
            const response = await fetch(`${process.env.REACT_APP_API_URL}v3/gallary/`);
            const data = await response.json();
            const noteResponse = await fetch(`${process.env.REACT_APP_API_URL}v3/notes/`);
            const noteData = await noteResponse.json();
            const imageWraperResponse = await fetch(`${process.env.REACT_APP_API_URL}v3/wrapperImages/`);
            const imageWraperData = await imageWraperResponse.json();

            setImageArray(data.map((gallary) => gallary.file));

            let noteRandomIndex = Math.floor(Math.random() * noteData.length);
            let selectedNote = noteData[noteRandomIndex];
            setNotes(getSelectedNote(selectedNote));
            let randomIndex = Math.floor(Math.random() * data.length);
            setCurrentImageIndex(randomIndex);

            let imageWrapperIndex = Math.floor(Math.random() * imageWraperData.length);
            let selectedImageWrapper = imageWraperData[imageWrapperIndex];
            setImageWraperData(getSelectedImageWrapper(selectedImageWrapper));
            if (data.length > 0 && noteData.length > 0) {
                const interval = setInterval(() => {
                    randomIndex = Math.floor(Math.random() * data.length);
                    setCurrentImageIndex(randomIndex);

                    noteRandomIndex = Math.floor(Math.random() * noteData.length);
                    selectedNote = noteData[noteRandomIndex];
                    setNotes(getSelectedNote(selectedNote));


                    imageWrapperIndex = Math.floor(Math.random() * imageWraperData.length);
                    selectedImageWrapper = imageWraperData[imageWrapperIndex];
                    setImageWraperData(getSelectedImageWrapper(selectedImageWrapper));
                }, 15000);

                return () => clearInterval(interval);
            }


        }

        fetchGallary();
    }, []);
    return (
        <div className='app__header app__flex'>
            <motion.div
                whileInView={{ x: [-100, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className='app__header-info'
            >
                <div className='app__header-badge'>
                    <div className='badge-cmp app__flex'>
                        <span>👋</span>
                        <div style={{ marginLeft: 20 }}>
                            <p className='p-text'>{notes.welcome}</p>
                            <h1 className='head-text'>{notes.detail}</h1>
                        </div>
                    </div>

                    <div className='tag-cmp app__flex'>
                        <p className='p-text'>{notes.note}</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className='app__header-img'
            >
                <AnimatePresence exitBeforeEnter>
                    <motion.img
                        key={currentImageIndex}
                        variants={imageSliderVariants}
                        initial='enter'
                        animate='center'
                        exit='exit'
                        className='img'
                        src={imageArray[currentImageIndex]}
                        alt='gallary'
                    />
                </AnimatePresence>;
                <motion.img
                    variants={scaleVariants}
                    whileInView={scaleVariants.whileInView}
                    src={images.circle}
                    alt='profile_circle'
                    className='overlay_circle'
                />
            </motion.div>
            {imageData && (

                <motion.div className='app__header-circles'>
                    {imageData.map(
                        (circle, index) => (
                            <motion.div
                                key={`circle-${index}`}
                                variants={scaleVariants}
                                whileInView={scaleVariants.whileInView}
                                className='circle-cmp app__flex'
                            >
                                <img src={circle} alt='home_bg' />
                            </motion.div>
                        ))}
                </motion.div>
            )}
        </div>
    );
};

export default AppWrap(Header, NavItemEnum.getName(0));