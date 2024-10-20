"use client";

import {useContext, useEffect, useState} from "react";
import { Button } from "antd";
import {IFollowInsert} from "@/libs/db/dao/follow/followInsertDao";
import {FollowContext, IFollowProvider} from "@/providers/FollowProvider";
import {SignContext} from "@/providers/SignProvider";
import {updateFollowList} from "@/libs/follow/follow";

interface IArticleEditorProps {
    author: string,
}

export default function FollowAuthorButton(props:IArticleEditorProps) {
    const [disabled, setDisabled] = useState(true)
    const {followList, setFollowList} = useContext<IFollowProvider>(FollowContext);
    const {address, isSignIn} = useContext(SignContext);

    const handler = () => {
        // console.log("address:",address)
        // console.log("followList:",followList)
        // console.log("props.author:",props.author)
        if(!isSignIn) {
            setDisabled(true)
        } else {
            setDisabled(followList.indexOf(props.author) != -1)
        }
    }

    useEffect(() =>{
        handler()
    }, [address, isSignIn, followList])

    const onClick = async () => {
        const followInsert: IFollowInsert = {
            fans: address,
            author: props.author,
            create_date: new Date(),
        };
        console.log("followInsert:", followInsert)
        fetch("/api/follow/", {
            method: "POST",
            body: JSON.stringify(followInsert),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then(async (data) => {
                console.log("followInsert success:", data.follow)
                const newFollowList = await updateFollowList(address)
                setFollowList(newFollowList);
                // success()
            });
    }
    return (
        <Button type="primary" disabled={disabled} onClick={onClick}>关注</Button>
    );
}
