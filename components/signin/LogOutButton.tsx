"use client";

import {JwtContext} from "@/providers/JwtProvider";
import {useContext} from "react";
import {Button} from "antd";
import {ISignProvider, SignContext} from "@/providers/SignProvider";
import cookie from 'react-cookies';

export default function LogOutButton() {
    const {setJwtToken} = useContext(JwtContext);
    const {setSignature, setIsSignIn, setAddress} = useContext<ISignProvider>(SignContext);

    const logOutHandler = async () => {
        setIsSignIn(false);
        setAddress("");
        setSignature("");
        setJwtToken("");
        cookie.delete("jwtToken");
    }
    return <Button onClick={logOutHandler}>LogOut</Button>
}