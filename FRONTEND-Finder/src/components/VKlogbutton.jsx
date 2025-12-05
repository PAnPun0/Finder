import React, { useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';
import API_URL from '../api/url';
import Cookies from 'js-cookie';
export default function VKLoginButton() {
  const containerRef = useRef(null);

  useEffect(() => {
    VKID.Config.init({
      app: 54386244,
      redirectUrl: 'http://localhost/finder',
      responseMode: VKID.ConfigResponseMode.Callback,
      source: VKID.ConfigSource.LOWCODE,
      scope: '', // Заполните нужными доступами по необходимости
    });


    const oneTap = new VKID.OneTap().on(VKID.WidgetEvents.ERROR, vkidOnError).on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
      const code = payload.code;
      const deviceId = payload.device_id;
      VKID.Auth.exchangeCode(code, deviceId)
        .then(vkidOnSuccess)
        .catch(vkidOnError);
    });

    if (containerRef.current) {
      oneTap.render({
        container: containerRef.current,
        scheme: VKID.Scheme.Light, 
        lang: VKID.Languages.RUS,  
      });
    }

    return () => oneTap.close();
  }, []);

  const vkidOnSuccess = async (data) => {

      const response = await fetch(`${API_URL}/login-vk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: data.access_token, userId: data.user_id}),
      });
      const result = await response.json();
      
      if (response.status === 201) {
        throw new Error(result.error);
      }
      Cookies.set('userid', result.ID);
      console.log((await VKID.Auth.userInfo(data.access_token)).user);


  };

  const vkidOnError = (error) => {
   console.log(error);
  };
  return (
    <div ref={containerRef} />
  );
}