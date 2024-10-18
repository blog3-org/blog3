"use client";

import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { u8aToHex, stringToU8a, stringToHex } from '@polkadot/util';
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { Dispatch, SetStateAction } from 'react';
import cookie from 'react-cookies';

interface SignInButtonProps {
  setIsSignIn: Dispatch<SetStateAction<boolean>>
}

export default function SigninButton(props: SignInButtonProps) {
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
      data: 'message to sign',
      type: 'bytes'
    });
    // console.log("signedMessage", signedMessage)

    const isValidSignature = signatureVerify(
      stringToHex('message to sign'),
      signedMessage.signature,
      address,
    ).isValid;

    if (isValidSignature) {
      // 发送签名和地址到服务器进行验证并获取 JWT
      const response = await fetch('/api/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature: signedMessage.signature }),
      });

      const data = await response.json();

      // console.log("response", response);
      // console.log("data", data);
      // console.log("response.ok", response.ok);
      // console.log("data.token", data.token);

      if (response.ok) {
        // 将 JWT 保存到 localStorage 或 cookie
        localStorage.setItem('jwtToken', data.token);
        cookie.save("SigninInfo", {
          address:address,
          signature: signedMessage.signature,
        }, "/");

        // console.log('jwtToken:', data.token);
        console.log('Sign successful');
        props.setIsSignIn(true)
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
    //   'message to sign',
    //   signedMessage.signature,
    //   address,
    // ));
  }
  return <button onClick={signMessageWithSubstrate}>Signin</button>
}