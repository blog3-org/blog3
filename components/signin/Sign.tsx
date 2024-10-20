"use client";

import SignInButton from "@/components/signin/SignInButton"
import SigninInfo from "./SigninInfo";
import {useContext} from "react";
import LogOutButton from "@/components/signin/LogOutButton";
import {SignContext} from "@/providers/SignProvider";

export default function SignIn() {
    const {isSignIn, address} = useContext(SignContext);
    if (isSignIn) {
        return (
            <>
                <LogOutButton/>
                <SigninInfo address={address}/>
            </>
        )
    } else {
        return <SignInButton/>
    }
}