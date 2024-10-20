import {Flex} from 'antd';
import {IArticle} from "@/libs/db/dao/article/articleDAO";
import React from "react";
import ArticleCard from "@/components/article/ArticleCard";

interface ArticleCardListProps {
    articles: IArticle[],
}

export default function ArticleCardList(props:ArticleCardListProps) {
    return (
        <Flex wrap gap="small">
            {
                props.articles.map((article:IArticle) => (
                    <ArticleCard key={article._id} article={article}/>
                ))
            }
        </Flex>
    )

}