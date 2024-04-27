import { useCallback, useState } from 'react';

export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((value) => !value);
  }, [value]);

  return {
    value,
    setValue,
    toggle
  }
}