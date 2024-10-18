'use client';

import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { IArticle } from "@/libs/db/dao/articleDAO";

interface IArticleReaderProps {
    article?:IArticle
}

export default function ArticleReader(props:IArticleReaderProps) {
    let context = ""
    if(props.article){
        context = props.article.article_context
    }
    return (
        <div className="container">
            <MDEditor.Markdown source={context} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
    );
}
