import {articleGetOneById, IArticle} from "@/libs/db/dao/articleDAO";
import {connectDatabase} from "@/libs/db/dbUtils";
import {NextRequest, NextResponse} from "next/server";
import {articleInsert, IInsertArticle} from "@/libs/db/dao/insertArticleDAO";

/* todo 更新article方法 */
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
    const article:IInsertArticle = await request.json();
    const {
        author_id,
        author_name,
        article_name,
        article_context,
        is_request_pay,
    } = article;

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
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const articleId = params.id

    console.log("/api/articles/" + articleId);

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
        const article = await articleGetOneById(client, articleId);
        return NextResponse.json(
            { article: article },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Getting articles failed.",
                error:error
            },
            {
                status: 500,
            }
        );
    }
}