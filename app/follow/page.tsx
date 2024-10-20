"use client";

import {useEffect, useState} from "react";
import FollowTable from "@/components/follow/FollowTable";
import {IFollow} from "@/libs/db/dao/follow/followDao";

export default function Page() {
    const [followList, setFollowList] = useState<IFollow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchFollowContent();
    }, []);

    const fetchFollowContent = () => {
        fetch("/api/follow/")
            .then((response) => response.json())
            .then((data) => {
                // console.log("data:", data)
                const follows = data.follows;
                // console.log("article:", article);
                setFollowList(follows)
                setIsLoading(false)
            });
    };

    return (
        <>
            {isLoading?<p>Loading</p>:<FollowTable followList={followList}/>}
        </>
    )
}