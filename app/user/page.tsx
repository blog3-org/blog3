import {Flex} from "antd";
import React from "react";
import MyFanTable from "@/components/follow/MyFanTable";
import MyFollowTable from "@/components/follow/MyFollowTable";

export default function Page() {
  return (
    <>
      <p>User Page</p>

        <Flex wrap gap="small">
            <MyFanTable/>
            <MyFollowTable/>
        </Flex>
    </>
  )
}