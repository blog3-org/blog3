import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import {IUser} from "@/libs/db/dao/user/userDao";
import {shortAddress} from "@/libs/helper";

export interface UserDetailProps {
    user: IUser;
}


export default function UserDetail(props: UserDetailProps) {
    const [isFollowed, setIsFollowed] = React.useState(false);
    const {name, address, avatar_url, description} = props.user;

    return (
        <></>
        // <Card className="max-w-[340px]">
        //     <CardHeader className="justify-between">
        //         <div className="flex gap-5">
        //             <Avatar isBordered radius="full" size="md" src={avatar_url}/>
        //             <div className="flex flex-col gap-1 items-start justify-center">
        //                 <h4 className="text-small font-semibold leading-none text-default-600">{name}</h4>
        //                 <h5 className="text-small tracking-tight text-default-400"
        //                     title={address}>@{shortAddress(address as `0x${string}`)}</h5>
        //             </div>
        //         </div>
        //         <Button
        //             className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
        //             color="primary"
        //             radius="full"
        //             size="sm"
        //             variant={isFollowed ? "bordered" : "solid"}
        //             onPress={() => setIsFollowed(!isFollowed)}
        //         >
        //             todo
        //             {/*{isFollowed ? "Unfollow" : "Follow"}*/}
        //         </Button>
        //     </CardHeader>
        //     <CardBody className="px-3 py-0 text-small text-default-400">
        //         <p>
        //             {description}
        //         </p>
        //         <span className="pt-2">
        //   #FrontendWithZoey
        //   <span className="py-2" aria-label="computer" role="img">
        //     💻
        //   </span>
        // </span>
        //     </CardBody>
        // </Card>
    );
}
