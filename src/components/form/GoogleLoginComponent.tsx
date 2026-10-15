

import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { toast } from "../ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { useRouter } from "next/navigation";

export default function GoogleLoginComponent() {
  const { mutate: googleLogin } = useGoogleOAuth();

  const router = useRouter();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Authentication failed",
        description:
          "We couldn't connect to your Google account. Please check your connection.",
        type: "error",
      });

      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          router.push("/");

          toast.add({
            title: "Logged in successfully.....",
            description:
              "Welcome back! You have successfully signed in with Google.",
            type: "success",
          });
        },

        onError: (error) => {
          toast.add({
            title: "Login failed",
            description:
              error.message ||
              "Something went wrong while signing in with Google. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google Login failed",
      description:
        "Something went wrong while signing in with Google. Please try again.",
      type: "error",
    });
  };
  return (
    <GoogleLogin
      text={"continue_with"}
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  );
}
