import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import Link from "next/link";
import {IArticle} from "@/libs/db/dao/articleDAO";

interface DataType {
    id: string;
    author: string; // 作者地址
    title: string;  // 文章名称
    preview: string;    // 文章预览
}


const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Preview',
        dataIndex: 'preview',
        key: 'preview',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link href={"/article/view/"+record.id}>浏览</Link>
                <Link href={"/article/edit/"+record.id}>编辑</Link>
            </Space>
        ),
    },
];

interface ArticleTableProps {
    articleList: IArticle[],
}

export default function ArticleTable(props:ArticleTableProps) {
    const data:DataType[] = [];
    props.articleList.map((article) => {
        let preview=null;
        if(article.article_context.length > 50) {
            preview = article.article_context.substring(0, 50) + " ......"
        } else {
            preview = article.article_context
        }
        data.push({
            author: article.author_name,
            id: article._id,
            preview: preview,
            title: article.article_name
        })
    });
    return <Table<DataType> columns={columns} dataSource={data} />
}