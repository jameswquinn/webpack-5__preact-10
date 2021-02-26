import { useEffect, useRef } from 'preact/hooks';


const DEFAULT_USE_TITLE_OPTIONS = {
  restoreOnUnmount: true,
};

const useTitle = (title, options = DEFAULT_USE_TITLE_OPTIONS) => {
  const prevTitleRef = useRef(document.title);
  document.title = title;
  useEffect(() => {
    if (options && options.restoreOnUnmount) {
      return () => {
        document.title = prevTitleRef.current;
      };
    } else {
      return;
    }
  }, []);
}

export   { useTitle };