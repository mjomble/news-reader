import { createElement as el, Fragment } from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { assert } from './assert'
import { Header } from './header'
import { NewsItemSummary } from './news-item-summary'
import { NewsItemSummary as TNewsItemSummary } from './types'

interface QueryResponse {
  newsList: {
    rows: TNewsItemSummary[],
  },
}

const QUERY = gql`
  {
    newsList(skip: 0, limit: 10) {
      rows {
        id
        title
        img
      }
    }
  }
`

export const NewsList = () => {
  const { loading, error, data } = useQuery<QueryResponse>(QUERY)

  if (loading) {
    return el(Fragment, null,
      el(Header, { showBackButton: false }),
      el('div', null, 'Loading...'),
    )
  }

  if (error) {
    return el(Fragment, null,
      el(Header, { showBackButton: false }),
      el('div', null, 'Error: ', error.message),
    )
  }

  assert(data)

  return el(Fragment, null,
    el(Header, { showBackButton: false }),
    data.newsList.rows.map((item) => el(NewsItemSummary, { key: item.id, item })),
  )
}
