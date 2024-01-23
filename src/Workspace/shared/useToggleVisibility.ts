import { useState } from 'react';

export const useExpandingToggle = (defaultValue = false) => {
  const [isExpanded, setIsExpanded] = useState(defaultValue);

  const handleExpandClick = () => {
    setIsExpanded(prevValue => !prevValue);
  };

  return {
    isExpanded,
    handleExpandClick
  };
};
