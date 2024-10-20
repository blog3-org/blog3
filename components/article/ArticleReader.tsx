'use client';

import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { IArticle } from "@/libs/db/dao/article/articleDAO";

interface IArticleReaderProps {
    article?:IArticle
}

export default function ArticleReader(props:IArticleReaderProps) {
    let context = ""
    if(props.article){
        context = props.article.content
    }
    return (
        <div className="container">
            <div>Article Title: {props.article?.title}</div>
            <MDEditor.Markdown source={context} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
    );
}
