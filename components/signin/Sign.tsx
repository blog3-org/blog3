"use client";

import SigninButton from "@/components/signin/SigninButton"
import { useState } from "react";
import SigninInfo from "./SigninInfo";

export default function Signin() {
  const [isSignin, setIsSignIn] = useState(false);
  if (isSignin) {
    return <SigninInfo />
  } else {
    return <SigninButton setIsSignIn={setIsSignIn} />
  }
}