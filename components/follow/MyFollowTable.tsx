"use client";

import {Button, message, Table, type TableProps} from 'antd';
import React, {useContext, useEffect, useState} from "react";
import {FollowContext, IFollowProvider} from "@/providers/FollowProvider";
import {ISignProvider, SignContext} from "@/providers/SignProvider";
import {IPayInsert} from "@/libs/db/dao/pay/payInsertDao";

interface DataType {
    follow: string,
    address: string,
    success: () => void,
}


const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Follow',
        dataIndex: 'follow',
        key: 'follow',
    },
    {
        title: 'Pay',
        dataIndex: 'pay',
        key: 'pay',
        render: (_, record) => {
            const onClick = () => {
                const receiver = record.follow;
                const address = record.address;
                const success = record.success;
                const payInsertData: IPayInsert = {
                    amount: 10,
                    create_date: new Date(),
                    payer: address,
                    receiver: receiver
                }
                console.log("payInsertData:", payInsertData)
                fetch("/api/pay/", {
                    method: "POST",
                    body: JSON.stringify(payInsertData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then(async (data) => {
                        console.log("payInsert success:", data.follow)
                        success()
                    });
            }
            return <Button onClick={onClick}>Pay</Button>
        }
    }
];

export default function MyFollowTable() {
    const {followList} = useContext<IFollowProvider>(FollowContext);
    const {address} = useContext<ISignProvider>(SignContext);
    const [data, setData] = useState<DataType[]>([])
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Pay Success',
        });
    };

    useEffect(() => {
        const tmpData: DataType[] = [];
        followList.map((follow) => {
            tmpData.push({
                follow: follow,
                address: address,
                success: success,
            })
        });
        setData(tmpData)
    }, [followList]);

    return (
        <>
            {contextHolder}
            <Table<DataType> columns={columns} dataSource={data}/>
        </>
    )
}