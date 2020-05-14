import React from 'react';
import { Platform } from 'react-native';
import {
  HeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../constants/colors';

interface CustomHeaderButtonProps extends HeaderButtonProps {}

export const CustomHeaderButton: React.FC<CustomHeaderButtonProps> = (
  props
) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : colors.primary}
    />
  );
};
