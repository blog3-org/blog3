'use client';

import React from "react";
import MDEditor from '@uiw/react-md-editor';
import cookie from 'react-cookies';
import {IInsertArticle} from "@/libs/db/dao/insertArticleDAO";

export default function Page() {
  const [title, setTitle] = React.useState("Article1");
  const [value, setValue] = React.useState("**Hello world!!!**");
  let address:string = "";
  let signature:string = ""
  const tmp = cookie.load("SigninInfo");
  if (tmp) {
    address = tmp.address;
    signature = tmp.signature;
  }

  const clickHandle = () => {
    const article: IInsertArticle = {
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
      <button onClick={clickHandle}>上传</button>
    </div>
  );
}
