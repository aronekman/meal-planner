import { useGoogleLogin } from "@react-oauth/google";   
import googleLogo from '../assets/google-logo.png'
const GoogleLoginButton = () => {
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => { console.log(codeResponse)},
        onError: (error) => console.log("Login Failed:", error),
    });

  return (

    <button className="
        w-full h-10 px-2 py-2
        bg-black text-white font-medium
        ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        hover:bg-white hover:text-black hover:border-2 hover:border-black
        inline-flex items-center justify-center" 
        onClick={() => 
        googleLogin()}>
        <img className="w-6 h-6 relative right-4"src={googleLogo} alt="" />
        Sign In with Google
    </button>

  );
 };

export { GoogleLoginButton };