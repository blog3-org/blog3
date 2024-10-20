"use client";

import {cryptoWaitReady, signatureVerify} from "@polkadot/util-crypto";
import {web3Accounts, web3Enable, web3FromAddress} from "@polkadot/extension-dapp";
import {stringToHex} from "@polkadot/util";
// @ts-ignore
import cookie from 'react-cookies';
import {JwtContext, IJwtProvider} from "@/providers/JwtProvider";
import {useContext} from "react";
import {Button} from "antd";
import {IFollow} from "@/libs/db/dao/follow/followDao";
import {ISignProvider, SignContext} from "@/providers/SignProvider";
import {FollowContext, IFollowProvider} from "@/providers/FollowProvider";

export default function SignInButton() {
    const {setJwtToken} = useContext<IJwtProvider>(JwtContext);
    const {setIsSignIn, setAddress, setSignature} = useContext<ISignProvider>(SignContext);
    const {setFanList, setFollowList} = useContext<IFollowProvider>(FollowContext);

    const signMessageWithSubstrate = async () => {
        if (!window) {
            throw new Error("window not exist")
        }
        // const {web3Accounts, web3Enable, web3FromAddress} = await import("@polkadot/extension-dapp");
        await cryptoWaitReady();

        const extensions = await web3Enable('MyDApp');
        if (extensions.length === 0) {
            throw new Error('No wallet extension found');
        }

        const accounts = await web3Accounts();
        const address = accounts[0].address;

        // const message = `Sign in with address: ${address}`;
        // const u8aMessage = stringToU8a(message);

        const injector = await web3FromAddress(address);
        const signedMessage = await injector.signer!.signRaw!({
            address,
            // data: stringToHex(message),
            data: 'message to sign', // todo
            type: 'bytes'
        });
        // console.log("signedMessage", signedMessage)

        const isValidSignature = signatureVerify(
            stringToHex('message to sign'), // todo
            signedMessage.signature,
            address,
        ).isValid;

        if (isValidSignature) {
            // 发送签名和地址到服务器进行验证并获取 JWT
            const response = await fetch('/api/sign', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    signedMessage:signedMessage,
                    address:address,
                    signature: signedMessage.signature
                }),
            });
            // console.log("signin button response:", response)

            const data = await response.json();

            // console.log("response", response);
            // console.log("data", data);
            // console.log("response.ok", response.ok);
            // console.log("data.token", data.token);

            if (response.ok) {
                // 将 JWT 保存到 localStorage 或 cookie
                // localStorage.setItem('jwtToken', data.token);
                cookie.save("jwtToken", data.token, "/");

                // cookie.save("SigninInfo", {
                //     address: address,
                //     signature: signedMessage.signature,
                // }, "/");

                // console.log('jwtToken:', data.token);
                console.log('Sign successful');

                // 获取关注列表
                let followList: string[] = [];
                let fanList: string[] = [];
                await fetch("/api/user/follow_list/" + address)
                    .then((response) => response.json())
                    .then((data) => {
                        followList = data.data.map((follow:IFollow)=>{
                            return follow.author
                        })
                        // console.log("/api/user/follow_list/ followList:", followList);
                    });
                await fetch("/api/user/fan_list/" + address)
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log("/api/user/fan_list/ data:", data)
                        fanList = data.data.map((follow:IFollow)=>{
                            return follow.fans
                        })
                    });
                setFollowList(followList)
                setFanList(fanList)
                setIsSignIn(true);
                setSignature(signedMessage.signature);
                setJwtToken(data.token)
                setAddress(address);

                return true;
            } else {
                console.log('Sign failed: response not ok');
                return false;
            }
        } else {
            console.log('Sign failed: InvalidSignature');
            return false;
        }

        // console.log("isValidSignature:", isValidSignature(
        //   'message to sign', // todo
        //   signedMessage.signature,
        //   address,
        // ));


    }
    return <Button onClick={signMessageWithSubstrate}>SignIn</Button>
}