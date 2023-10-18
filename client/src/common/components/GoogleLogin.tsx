import { useGoogleLogin } from '@react-oauth/google';

import googleLogo from '../assets/google-logo.png';

const GoogleLoginButton = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => {
      console.log(codeResponse);
    },
    onError: error => console.log('Login Failed:', error)
  });

  return (
    <button
      className="
        inline-flex h-10 w-full items-center
        justify-center bg-black px-2
        py-2 font-medium text-white ring-offset-background transition-colors hover:border-2 hover:border-black hover:bg-white
        hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      onClick={() => googleLogin()}>
      <img className="relative right-4 h-6 w-6" src={googleLogo} alt="" />
      Sign In with Google
    </button>
  );
};

export { GoogleLoginButton };
