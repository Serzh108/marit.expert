const limitWidth = 420;

const hideIcon = () => {
  const screenWidth = window.screen.width;
  return screenWidth > limitWidth ? true : false;
};

export default hideIcon;
