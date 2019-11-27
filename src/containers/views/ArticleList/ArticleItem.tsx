import React from 'react'
import { Divider } from 'antd'
import classnames from 'classnames'

import { markdownToHtml } from '@utils/index'
import styles from './index.scss'
import ArticleTags from '@shared/ArticleTags'
import Icon from '@shared/Icon'
import { useStateValue as useTagStateValue } from '@store/tag/index'
import { TagItem } from '@store/tag/types'
import { getTagColor } from '@utils/index'

export interface ArticleItem {
    content: string
    title: string
    id: number
    tags: TagItem[]
    createdAt: string
}

interface IProps {
    data: ArticleItem
    getTargetArticleId: (id: number) => void
}

const ArticleItem = ({ data, getTargetArticleId }: IProps) => {
    const { title, content, id, tags } = data

    const { tagList } = useTagStateValue()

    const tempTagList = getTagColor(tagList, tags)

    return (
        <div className={styles.articleItem}>
            <Divider orientation="left">
                <span onClick={() => getTargetArticleId(id)} className={styles.title}>
                    {title}
                </span>
                <span className={styles.createTime}>{data.createdAt}</span>
            </Divider>
            <div
                className={classnames(styles.description, styles.markdown)}
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
                onClick={() => getTargetArticleId(id)}
            />
            <div className={styles.otherInfo}>
                {!!tags.length && (
                    <div className={styles.tagContainer}>
                        <Icon width={16} height={16} className={styles.tagIcon} color="#838a8c" id="tags" />
                        <ArticleTags tags={tempTagList} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArticleItem
