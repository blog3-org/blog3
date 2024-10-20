"use client";

import {useEffect, useState} from "react";
import ArticleEditor from "@/components/article/ArticleEditor";

export default function Page({ params }: { params: { id: string } }) {
    const [article, setArticle] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchArticleContent();
    }, []);

    const fetchArticleContent = () => {
        fetch("/api/article/"+params.id)
            .then((response) => response.json())
            .then((data) => {
                // console.log("data:", data)
                const article = data.article;
                // console.log("article:", article);
                setArticle(article)
                setIsLoading(false)
            });
    };

    if(isLoading){
        return (
            <p>Loading</p>
        )
    } else {
        return (
            <>
                <ArticleEditor article={article} isCreate={false}/>
            </>
        )
    }

}