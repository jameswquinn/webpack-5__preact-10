import { useEffect } from 'preact/hooks';


const useDescription = (_Description) => {
  useEffect(() => {
   
    const meta =
      document.querySelector(['Meta[name="description"']) || document.createElement('meta');
      meta.name="description"
    meta.content = _Description;

 

    document.getElementsByTagName('head')[0].appendChild(meta);
  }, [_Description]);
};

export  { useDescription };