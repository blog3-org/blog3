import { Card } from 'antd';
import {IArticle} from "@/libs/db/dao/article/articleDAO";
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
    if(props.article.content.length > 50) {
        preview = props.article.content.substring(0, 50) + " ......"
    } else {
        preview = props.article.content
    }
    return (
        <Link href={"/article/view/"+props.article._id}>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={ <img alt={props.article.title} src={imgUrl} />}
            >
                <Meta title={props.article.title} description={preview} />
            </Card>
        </Link>
    )

}