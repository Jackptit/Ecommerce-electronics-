import React, { useEffect } from 'react';

const Livechat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://embed.tawk.to/674dcd3a4304e3196aeb6702/1ie3ujbv6';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
  }, []);

  return null; 
};

export default Livechat;




