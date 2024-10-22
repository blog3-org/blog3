import {User} from "@nextui-org/react";
import {default_avatar_url, IUser} from "@/libs/db/dao/user/userDao";
import {shortAddress} from "@/libs/helper";

export interface IUserCardProps {
    user: IUser,
}

export default function UserCard(props: IUserCardProps): JSX.Element {
    const {name, address, avatar_url} = props.user;
    const title = name?name:shortAddress(address as `0x${string}`)
    const url = avatar_url?avatar_url:default_avatar_url;
    return (
        <div className="flex flex-grow gap-2 items-center">
            <User
                className="text-white"
                name="Author"
                description={props.user.name}
                avatarProps={{
                    src: url
                }}
                title={title}
            />
        </div>
    )
}