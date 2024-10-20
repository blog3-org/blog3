"use client";

import {JwtProvider} from "@/providers/JwtProvider";
import {SignProvider} from "@/providers/SignProvider";
import {FollowProvider} from "@/providers/FollowProvider";
import {PayProvider} from "@/providers/PayProvider";

export function Provider({children}: {
    children: React.ReactNode
}){

    return(
        <JwtProvider>
            <SignProvider>
                <FollowProvider>
                    <PayProvider>
                        {children}
                    </PayProvider>
                </FollowProvider>
            </SignProvider>
        </JwtProvider>
    )
}