"use client";

import {Table} from 'antd';
import type {TableProps} from 'antd';
import {IFollow} from "@/libs/db/dao/follow/followDao";
import {ObjectId} from "mongodb";

interface DataType {
    id: ObjectId | undefined;
    author: string; // 作者地址
    fans: string;
    create_date: Date;
}


const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        // render: (text) => (
        //     <>
        //         <p>{text}</p>
        //         <FollowAuthorButton author={text.author} user={text.user} disabled={text.follow_button_disabled}/>
        //     </>
        // ),
    },
    {
        title: 'Fan',
        dataIndex: 'fans',
        key: 'fans',
    },
];

interface ArticleTableProps {
    followList: IFollow[],
}

export default function FollowTable(props: ArticleTableProps) {
    const data: DataType[] = [];
    props.followList.map((follow) => {
        data.push({
            id: follow._id,
            author: follow.author,
            fans: follow.fans,
            create_date: follow.create_date,
        })
    });
    return <Table<DataType> columns={columns} dataSource={data}/>
}