"use client";

import {Table, type TableProps} from 'antd';
import React, {useContext, useEffect, useState} from "react";
import {FollowContext, IFollowProvider} from "@/providers/FollowProvider";

interface DataType {
    fans: string;
}


const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Fan',
        dataIndex: 'fans',
        key: 'fans',
    },
];

export default function MyFanTable() {
    const {fanList} = useContext<IFollowProvider>(FollowContext);
    const [data, setData] = useState<DataType[]>([])

    useEffect(() => {
        const tmpData: DataType[] = [];
        fanList.map((fan) => {
            tmpData.push({
                fans: fan,
            })
        });
        setData(tmpData)
    }, [fanList]);

    return <Table<DataType> columns={columns} dataSource={data}/>
}