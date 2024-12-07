import React, { useEffect } from 'react';

const Livechat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://embed.tawk.to/675454c14304e3196aee4690/1iegmm5mc';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
  }, []);

  return null; 
};

export default Livechat;






