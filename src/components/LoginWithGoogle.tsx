import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginWithGoogle = () => {

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
      }
    };

    if (window.google) {
      initializeGoogleSignIn();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          initializeGoogleSignIn();
        }
      }, 100);
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    const token = response.credential;
    console.log("token ", token);
    try {
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log("Login Success:", data);
      // Store token or redirect to home
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  return <div id="googleSignInDiv" className="mt-4" />;
};

export default LoginWithGoogle;