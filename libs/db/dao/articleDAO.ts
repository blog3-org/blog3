import {MongoClient, ObjectId} from "mongodb";
import {getAllDocuments, getDocumentById, getOneDocumentById} from "../dbUtils";

const collection_name = "article";

export interface IArticle {
    _id: any,
    author_id: string, // 关联user id
    author_name: string, // 钱包地址
    article_name: string,
    article_context: string,
    is_request_pay: boolean, // 是否要求付费后才能阅览
}

export async function articleGetAll(
    client: MongoClient
) {
    return await getAllDocuments(client, collection_name, {_id: -1});
}

export async function articleGetById(
    client: MongoClient,
    id: string
) {
    return await getDocumentById(client, collection_name, id, {_id: -1});
}

export async function articleGetOneById(
    client: MongoClient,
    id: string
) {
    return await getOneDocumentById(client, collection_name, id);
}