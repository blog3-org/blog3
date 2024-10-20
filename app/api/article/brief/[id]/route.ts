import {articleBriefGetOneById, articleGetOneById} from "@/libs/db/dao/article/articleDAO";
import {connectDatabase} from "@/libs/db/dbUtils";
import {NextRequest, NextResponse} from "next/server";
import {articleUpdate, IArticleUpdate} from "@/libs/db/dao/article/articleUpdateDAO";
import {verifyJwtToken} from "@/libs/auth";

/* 更新article方法 */
export async function UPDATE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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
    const article:IArticleUpdate = await request.json();
    const {
        id,
        title,
        content,
        update_date
    } = article;

    // todo 参数校验&鉴权
    // console.log("id:", id)
    // console.log("params.id:", params.id)
    // if(id != params.id) {
    //     await client.close();
    //     return NextResponse.json(
    //         { message: "Invalid input." },
    //         {
    //             status: 422,
    //         }
    //     );
    // }

    // 封装传输的数据
    const updateArticle: IArticleUpdate = {
        id: id,
        title: title,
        content: content,
        update_date:update_date,
    };

    let result;

    try {
        result = await articleUpdate(client, updateArticle);
        await client.close();
        return NextResponse.json(
            {
                message: "Updated article.",
                update_article:updateArticle,
                update_result: result,
            },
            {
                status: 201,
            }
        );
    } catch {
        await client.close();
        return NextResponse.json(
            { message: "Inserting article failed!" },
            {
                status: 500,
            }
        );
    }
}

export interface IRequestGet {
    jwtToken:string, // TODO
}

/* 获取article方法 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const articleId = params.id

    // console.log("/api/articles/" + articleId);

    let client;
    try {
        client = await connectDatabase();
    } catch {
        return NextResponse.json(
            { message: "Connecting to the database failed!" },
            {
                status: 500,
            }
        );
    }

    try {
        const article = await articleBriefGetOneById(client, articleId);
        await client.close();
        return NextResponse.json(
            { article: article },
            {
                status: 200,
            }
        );
    } catch {
        await client.close();
        return NextResponse.json(
            {
                message: "Getting articles failed.",
            },
            {
                status: 500,
            }
        );
    }
}