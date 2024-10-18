"use client";

import { decodeJwt } from 'jose';
import { useEffect, useState } from 'react';

export default function SigninInfo() {
    const [address, setAddress] = useState("null");
    const [signature, setSignature] = useState("null");

    const updateSigninInfo = async () => {
        const token = localStorage.getItem("jwtToken") ?? "";

        const claims = decodeJwt(token)
        console.log("claims:", claims)
        // @ts-ignore
        setAddress(claims.address);
        // @ts-ignore
        setSignature(claims.signature);
    }

    useEffect(() => {
        // console.log("useEffect updateSigninInfo")
        updateSigninInfo();
        // console.log("useEffect address:", address)
        // console.log("useEffect signature:", signature)
    }, [address, signature]);

    return (
        <>
            <p>address: {address}</p >
            {/*<p>signature: {signature}</p>*/}
            {/* <p>Cookie: {cookieStore.get("token").value}</p> */}
        </>
    )
}