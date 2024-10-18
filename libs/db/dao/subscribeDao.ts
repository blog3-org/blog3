interface article {
    user_id: string, // 关联user
    article_id: string, // 关联article
    is_payed: boolean, // 是否付款
    pay_amount: bigint, // 付款金额
}