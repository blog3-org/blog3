import { Card } from 'antd';
import {IArticle} from "@/libs/db/dao/articleDAO";
import Link from "next/link";
const { Meta } = Card;


interface ArticleCardProps {
    article: IArticle,
    img_url?: string,
}

const defaultImgUrl = "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png";

export default function ArticleCard(props:ArticleCardProps) {
    const imgUrl = props.img_url? props.img_url : defaultImgUrl;
    let preview=null;
    if(props.article.article_context.length > 50) {
        preview = props.article.article_context.substring(0, 50) + " ......"
    } else {
        preview = props.article.article_context
    }
    return (
        <Link href={"/article/view/"+props.article._id}>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={props.article.article_name} src={imgUrl} />}
            >
                <Meta title={props.article.article_name} description={preview} />
            </Card>
        </Link>
    )

}