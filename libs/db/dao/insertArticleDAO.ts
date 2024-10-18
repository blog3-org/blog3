import { MongoClient } from "mongodb";
import { getAllDocuments, getDocumentById, insertDocument } from "../dbUtils";

const collection_name = "article";

export interface IInsertArticle {
    author_id: string, // 关联user id
    author_name: string, // 钱包地址
    article_name: string,
    article_context: string,
    is_request_pay: boolean, // 是否要求付费后才能阅览
}

export async function articleInsert(
    client: MongoClient,
    article: IInsertArticle
) {
    const result = await insertDocument(client, collection_name, article);
    return result;
}