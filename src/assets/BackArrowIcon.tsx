import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {ColorPalates} from '@themes';

const BackArrowIcon: React.FC<SvgProps> = () => {
  return (
    <Svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <Path
        d="M7 13L1 7l6-6"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={ColorPalates.text}
      />
    </Svg>
  );
};

export {BackArrowIcon};
