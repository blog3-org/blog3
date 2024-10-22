// import {MongoClient} from "mongodb";
// import {insertDocument} from "../../dbUtils";
//
// const collection_name = "user";
//
// export interface IUserInsert {
//     address: string,
//     name: string,
//     avatar_url: string,
//     description: string,
//     create_date: Date,
//     update_date: Date,
// }
//
// export async function userInsert(
//     client: MongoClient,
//     article: IUserInsert
// ) {
//     return await insertDocument(client, collection_name, article);
// }