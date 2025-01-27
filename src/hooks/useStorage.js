import { useEffect, useState } from 'react';

function useStorage(initialValue, key) {
  const [value, setValue] = useState(function () {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value]
  );
  return [value, setValue];
}

export default useStorage;
