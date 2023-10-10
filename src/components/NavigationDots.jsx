import React from 'react';
import { NavItems } from '../constants';

const NavigationDots = ({ active }) => (
  <div className="app__navigation">
    {NavItems.map((item, index) => (
      <a
        href={`#${item}`}
        key={item + index}
        className="app__navigation-dot"
        style={active === item ? { backgroundColor: '#313BAC' } : {}}
      />
    ))}
  </div>
);

export default NavigationDots;
