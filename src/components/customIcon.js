import React from 'react';

export const CustomIcon = ({Icon, size = 18, color, ...otherProps}) => {
  return <Icon size={size} color={color} {...otherProps} />;
};
