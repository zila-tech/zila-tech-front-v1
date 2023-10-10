import images from './images';
const NavItems = ['home', 'about', 'work', 'skills', 'testimonial', 'contact'];
// Create an Enum object to represent NavItems
const NavItemEnum = {};
NavItems.forEach((item, index) => {
    Object.defineProperty(NavItemEnum, item, {
        value: index,
        enumerable: true,
        writable: false,
        configurable: false,
    });
});

// Add a function to get the item name from NavItemEnum
NavItemEnum.getName = (index) => {
    const item = Object.keys(NavItemEnum).find((key) => NavItemEnum[key] === index);
    return item || null;
};


export { images, NavItems, NavItemEnum };
