import { useEffect } from 'preact/hooks';

const ImgTypeMap = {
  SVG: 'image/svg+xml',
  ICO: 'image/x-icon',
  GIF: 'image/gif',
  PNG: 'image/png',
};

const useFavicon = (favUrl) => {
  useEffect(() => {
    if (!favUrl) return;

    const cutUrl = favUrl.split('.');
    const imgSuffix = cutUrl[cutUrl.length - 1].toLocaleUpperCase();

    const link =
      document.querySelector("link[rel*='icon']") || document.createElement('link');

    link.type = ImgTypeMap[imgSuffix];
    link.href = favUrl;
    link.rel = 'icon';

    document.getElementsByTagName('head')[0].appendChild(link);
  }, [favUrl]);
};

export  { useFavicon };