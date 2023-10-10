import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import './About.css';
import { NavItemEnum } from '../../constants';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState(null);

  useEffect(() => {
    async function fetchAbouts() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}v3/abouts/`);
      const data = await response.json();
      setAbouts(data);
    }
    fetchAbouts();
  }, []);


  // Function to toggle the description expansion
  const toggleDescription = (title) => {
    if (expandedDescription === title) {
      // If the clicked description is already expanded, collapse it
      setExpandedDescription(null);
    } else {
      // If a different description is clicked, expand it
      setExpandedDescription(title);
    }
  };

  return (
    <motion.div
      whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      className={'app__about'}
    >
      <React.Fragment>
        <h2 className='head-text'>
          Where Creativity Meets <span>Expertise</span>,<br />
          Success is <span>Forged</span>
        </h2>

        <div className='app__profiles'>
          {abouts.map((about, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className='app__profile-item'
              key={about.title + index}
            >
              <img src={about.imageurl} alt={about.title} />
              <h2 className='bold-text' style={{ marginTop: 20 }}>
                {about.title}
              </h2>

              <div className='p-text' style={{ marginTop: 10 }}>
                {about.description.length <= 350 ? (
                  <div dangerouslySetInnerHTML={{ __html: about.description }} />
                ) : (
                  <React.Fragment>
                    {expandedDescription === about.title ? (
                      <React.Fragment>
                        <div dangerouslySetInnerHTML={{ __html: about.description }} />
                        <span onClick={() => toggleDescription(about.title)} className="collapse-icon">
                          <IoIosArrowUp />
                        </span>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div dangerouslySetInnerHTML={{ __html: about.description.slice(0, 350) + '...' }} />
                        <span onClick={() => toggleDescription(about.title)} className="collapse-icon" >
                          <IoIosArrowDown />
                        </span>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </div>

            </motion.div>
          ))}
        </div>
      </React.Fragment>
    </motion.div>
  );
};

export default AppWrap(MotionWrap(About, 'app__about'), NavItemEnum.getName(1), 'app__whitebg');
