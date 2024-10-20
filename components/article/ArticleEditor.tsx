'use client';

import React, {useContext, useState} from "react";
import MDEditor from '@uiw/react-md-editor';
import {IArticle} from "@/libs/db/dao/article/articleDAO";
import {Button, message, Input} from "antd";
import {IArticleUpdate} from "@/libs/db/dao/article/articleUpdateDAO";
import {IArticleInsert} from "@/libs/db/dao/article/articleInsertDAO";
import {SignContext} from "@/providers/SignProvider";

interface IArticleEditorProps {
    isCreate: boolean, // 是否是新建的博文
    article?: IArticle
}

export default function ArticleEditor(props: IArticleEditorProps) {
    const [title, setTitle] = useState(props.article ? props.article.title : "New Article");
    const [value, setValue] = useState(props.article ? props.article.content : "# New Article\n## Content");
    const articleId = props.article ? props.article._id.toString() : "undefined";
    const [messageApi, contextHolder] = message.useMessage();
    const {address} = useContext(SignContext);
    const {isCreate} = props;

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Upload Success',
        });
    };

    const createHandler = () => {
        const articleInsert: IArticleInsert = {
            author: address,
            title: title,
            content: value,
            is_request_pay: false,
            create_date: new Date(),
            update_date: new Date(),
        };
        console.log("articleInsert:", articleInsert)
        fetch("/api/article/", {
            method: "POST",
            body: JSON.stringify(articleInsert),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                success()
            });
    }
    const updateHandler = () => {
        const {article} = props;
        const updateArticle: IArticleUpdate = {
            content: value,
            title: title,
            id: article?._id,
            update_date: new Date(),
        }
        fetch("/api/article/" + updateArticle.id, {
            method: "UPDATE",
            body: JSON.stringify(updateArticle),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                success()
            });
    }
    const uploadHandler = isCreate ? createHandler : updateHandler;

    return (
        <>
            {contextHolder}
            <div className="container">
                <div>Article Id: {articleId}</div>
                {/*<div>Article Title: {title}</div>*/}
                <Input placeholder="Title" value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }}/>
                <MDEditor
                    value={value}
                    onChange={(e) => {
                        setValue(e ? e : "")
                    }}
                />
                <Button type="primary" onClick={uploadHandler}>上传</Button>
            </div>
        </>
    );
}
