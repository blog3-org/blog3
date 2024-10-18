'use client';

import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { IArticle } from "@/libs/db/dao/articleDAO";
import cookie from 'react-cookies';
import { Button } from "antd";

interface IArticleEditorProps {
    // isCreate: boolean, // 是否是新建的博文
    title?:string,
    value?:string,
}

export default function ArticleEditor(props:IArticleEditorProps) {
    const [title, setTitle] = React.useState("");
    const [value, setValue] = React.useState("");
    if(props.title) {
        setTitle(props.title);
    }
    if(props.value){
        setValue(props.value);
    }

    const uploadHandler = () => {
        let address:string = "";
        // let signature:string = ""
        const tmp = cookie.load("SigninInfo");
        if (tmp) {
            address = tmp.address;
            // signature = tmp.signature;
        }
        const article: IArticle = {
            _id: undefined,
            author_id: "1",
            author_name: address,
            article_name: title,
            article_context: value,
            is_request_pay: false,
        };
        fetch("/api/article/", {
            method: "POST",
            body: JSON.stringify(article),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <div className="container">
            <MDEditor
                value={value}
                onChange={setValue}
            />
            <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
            <Button type="primary" onClick={uploadHandler}>上传</Button>
        </div>
    );
}
