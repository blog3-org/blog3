import {Space, Table} from 'antd';
import type {TableProps} from 'antd';
import Link from "next/link";
import {IArticle} from "@/libs/db/dao/article/articleDAO";
import FollowAuthorButton from "@/components/author/FollowAuthorButton";

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
        render: (author, data) => (
            <>
                <p>{author}</p>
                <FollowAuthorButton author={data.author}/>
            </>
        ),
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
                <Link href={"/article/view/" + record.id}>浏览</Link>
                <Link href={"/article/edit/" + record.id}>编辑</Link>
            </Space>
        ),
    },
];

interface ArticleTableProps {
    articleList: IArticle[],
}

export default function ArticleTable(props: ArticleTableProps) {
    // 构建table的data
    const data: DataType[] = [];
    props.articleList.map((article) => {
        let preview = null;
        if (article.content.length > 50) {
            preview = article.content.substring(0, 50) + " ......"
        } else {
            preview = article.content
        }
        data.push({
            author: article.author,
            id: article._id,
            preview: preview,
            title: article.title,
        })
    });
    return <Table<DataType> columns={columns} dataSource={data}/>
}