import { articleGetAll, IArticle } from '@/libs/db/dao/articleDAO';
import { articleInsert, IInsertArticle } from '@/libs/db/dao/insertArticleDAO';
import {
    connectDatabase,
} from '@/libs/db/dbUtils';
import { NextRequest, NextResponse } from "next/server";

/* 新增article方法 */
export async function POST(request: NextRequest) {
    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        return NextResponse.json(
            { message: "Connecting to the database failed!" },
            {
                status: 500,
            }
        );
    }
    const tmp = await request.json();
    console.log("tmp:", tmp)
    const {
        author_id,
        author_name,
        article_name,
        article_context,
        is_request_pay,
    } = tmp;

    // 参数校验
    // if (
    //     !email.includes("@") ||
    //     !name ||
    //     name.trim() === "" ||
    //     !text ||
    //     text.trim() === ""
    // ) {
    //     client.close();
    //     return NextResponse.json(
    //         { message: "Invalid input." },
    //         {
    //             status: 422,
    //         }
    //     );
    // }

    // 封装传输的数据
    const insertArticle: IInsertArticle = {
        author_id: author_id,
        author_name: author_name,
        article_name: article_name,
        article_context: article_context,
        is_request_pay: is_request_pay
    };

    let result;

    try {
        result = await articleInsert(client, insertArticle);
        // console.log("result:", result)
        const newArticle:IArticle= {
            _id: result.insertedId,
            author_id: insertArticle.author_id,
            author_name: insertArticle.author_name,
            article_name: insertArticle.article_name,
            article_context: insertArticle.article_context,
            is_request_pay: insertArticle.is_request_pay
        };
        return NextResponse.json(
            { message: "Added article.", comment: newArticle },
            {
                status: 201,
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Inserting article failed!" },
            {
                status: 500,
            }
        );
    }
}

/* 获取article方法 */
export async function GET() {
    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        return NextResponse.json(
            { message: "Connecting to the database failed!" },
            {
                status: 500,
            }
        );
    }
    try {
        const articles = await articleGetAll(client);
        return NextResponse.json(
            { articles: articles },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Getting articles failed." },
            {
                status: 500,
            }
        );
    }
}