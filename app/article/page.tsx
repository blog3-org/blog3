"use client";

import { useState, useEffect } from "react";
import { Flex } from 'antd';
import ArticleTable from "@/components/article/ArticleTable";
import ArticleCard from "@/components/article/ArticleCard";

export default function Page() {
  const [articles, setarticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLatestArticle = () => {
    fetch("/api/article/")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setarticles(data.articles);
      });
  };

  useEffect(() => {
    fetchLatestArticle();
  }, [])

  return (
      <>
          <Flex wrap gap="small">
          {
              articles.map((article) => (
                  <ArticleCard article={article}/>
              ))
          }
          </Flex>
          <p><ArticleTable articleList={articles}/></p>
      </>
  );
}