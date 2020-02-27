import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { createElement as el, Fragment } from 'react'
import { useParams } from 'react-router-dom'

import { assert } from './assert'
import { Header } from './header'
import './news-item.scss'
import { NewsItem as TNewsItem } from './types'

interface QueryResponse {
  newsItem: TNewsItem | null,
}

const QUERY = gql`
  query ($itemId: ID!) {
    newsItem(id: $itemId) {
      id
      title
      url
      img
      content
    }
  }
`

export const NewsItem = () => {
  const { itemId } = useParams()
  const { loading, error, data } = useQuery<QueryResponse>(QUERY, { variables: { itemId } })

  if (loading) {
    return el(Fragment, null,
      el(Header, { showBackButton: true }),
      el('div', null, 'Loading...'),
    )
  }

  if (error) {
    return el(Fragment, null,
      el(Header, { showBackButton: true }),
      el('div', null, 'Error: ', error.message),
    )
  }

  assert(data)

  if (!data.newsItem) {
    return el(Fragment, null,
      el(Header, { showBackButton: true }),
      el('div', null, 'News item not found'),
    )
  }

  const { id, title, url, img, content } = data.newsItem

  return el(Fragment, null,
    el(Header, { showBackButton: true, url }),
    el('div',
      { key: id, className: 'news-item' },
      el('div', { className: 'news-item__title' }, title),
      el('img', { className: 'news-item__image', src: img }),
      el('div', { className: 'news-item__content' }, content),
    ),
  )
}
