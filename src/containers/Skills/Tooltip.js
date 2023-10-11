import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import "./Tooltip.css"; 

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





