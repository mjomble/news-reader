import { createElement as el } from 'react'
import { Link } from 'react-router-dom'

import './news-item.scss'
import { NewsItemSummary as TNewsItemSummary } from './types'

interface Props {
  item: TNewsItemSummary,
}

export const NewsItemSummary = ({ item: { id, img, title } }: Props) => el(Link,
  { to: '/item/' + id },
  el('div',
    { key: id, className: 'news-item' },
    el('img', { className: 'news-item__image', src: img }),
    el('div', { className: 'news-item__title' }, title),
  ),
)
