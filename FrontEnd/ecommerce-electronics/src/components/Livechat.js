import React, { useEffect } from 'react';

const Livechat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://embed.tawk.to/6746d8072480f5b4f5a4910b/1idmbno9l';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
  }, []);

  return null; 
};

export default Livechat;

