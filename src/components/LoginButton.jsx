import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const LoginButton = () => {
  useEffect(() => {
    netlifyIdentity.on('login', (user) => {
      console.log('Logged in as:', user);
    });

    netlifyIdentity.on('logout', () => {
      console.log('Logged out');
    });

    netlifyIdentity.init();
  }, []);

  return (
    <button onClick={() => netlifyIdentity.open()}>
      Login with GitHub
    </button>
  );
};

export default LoginButton;
