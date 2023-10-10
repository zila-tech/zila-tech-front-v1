/*
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

const Tooltip = ({ children, id, effect, arrowColor, className, description }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({});

    useEffect(() => {
        const element = ReactDOM.findDOMNode(document.getElementById(id));
        const boundingClientRect = element.getBoundingClientRect();

        setPosition({
            top: boundingClientRect.top,
            left: boundingClientRect.left,
        });
    }, [id]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const tooltipMotion = {
        initial: {
            opacity: 0,
            scale: 0.5,
            boxShadow: "none",
            border: "none",
        },
        animate: {
            opacity: 1,
            scale: 1,
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
    };

    const tooltipArrowStyle = {
        borderColor: arrowColor,
    };

    return (
        <div>
            <div
                id={id}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
            >
                {children}
            </div>

            {isOpen && (
                <motion.div
                    className={`tooltip tooltip-${effect} ${className}`}
                    style={{
                        top: position.top,
                        left: position.left,
                    }}
                    variants={tooltipMotion}
                    initial="initial"
                    animate="animate"
                >
                    <div className="tooltip-arrow" style={tooltipArrowStyle}></div>
                    {description}
                </motion.div>
            )}
        </div>
    );
};

export default Tooltip;

*/
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import "./Tooltip.css"; // Import the CSS file

const Tooltip = ({ id, position, content, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    return (
        <div className="relative cursor-pointer group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="mx-2 my-1">{children}</div>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className={`tooltip-modal`}
                        id={`tooltip-${id}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                    
                        <span className={`tooltip-content ${position}`}>{content}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;





