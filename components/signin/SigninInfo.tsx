"use client";

interface SigninInfoProps {
    address:string,
}

export default function SigninInfo(props:SigninInfoProps) {
    return (
        <p>address: {props.address}</p>
    )
}