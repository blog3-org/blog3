"use client";

import React, {useState, useEffect} from "react";
import {Button} from 'antd';
import ArticleTable from "@/components/article/ArticleTable";
import ArticleCardList from "@/components/article/ArticleCardList";

export default function FollowArticleTable() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFollowArticle = () => {
        fetch("/api/article/")
            .then((response) => response.json())
            .then((data) => {
                // console.log("data:", data)
                setIsLoading(false);
                setArticles(data.articles);
            });
    };

    useEffect(() => {
        fetchFollowArticle();
    }, []);


    return (
        <>
            {isLoading ? <p>Loading</p>
                :
                <>
                    <p><ArticleTable articleList={articles}/></p>
                </>
            }
        </>

    )
}