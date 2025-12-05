import React, { useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';

export default function VKLoginButton() {
  const containerRef = useRef(null);

  useEffect(() => {
    VKID.Config.set({
      app: 524941786, 
      redirectUrl: 'http://localhost:5173/login', 
      mode: VKID.ConfigAuthMode.InNewTab, // 
    });


    const oneTap = new VKID.OneTap();

    if (containerRef.current) {
      oneTap.render({
        container: containerRef.current,
        scheme: VKID.Scheme.Light, 
        lang: VKID.Languages.RUS,  
      });
    }

    return () => oneTap.close();
  }, []);

  return (
    <div ref={containerRef} />
  );
}