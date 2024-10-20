"use client";

import {Table} from 'antd';
import type {TableProps} from 'antd';
import {IPay} from "@/libs/db/dao/pay/payDao";

type DataType = IPay;

const columns: TableProps<DataType>['columns'] = [
    {title: 'Id', dataIndex: '_id', key: '_id',},
    {title: 'Receiver', dataIndex: 'receiver', key: 'receiver',},
    {title: 'Payer', dataIndex: 'payer', key: 'payer',},
    {title: 'Amount', dataIndex: 'amount', key: 'amount',},
    {title: 'Create_date', dataIndex: 'create_date', key: 'create_date',},
];

interface ArticleTableProps {
    payList: IPay[],
}

export default function PayTable(props: ArticleTableProps) {
    const data: DataType[] = [];
    props.payList.map((pay) => {
        data.push(pay)
    });
    return <Table<DataType> columns={columns} dataSource={data}/>
}