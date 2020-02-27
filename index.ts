import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { createBrowserHistory } from 'history'
import { createElement as el, Component } from 'react'
import { render } from 'react-dom'
import { Route, Router, Switch } from 'react-router-dom'

import './index.scss'
import { NewsItem } from './news-item'
import { NewsList } from './news-list'

interface State { error?: Error }

const API_URI = 'https://news-reader.stagnationlab.dev/graphql'

const client = new ApolloClient({ uri: API_URI })
const history = createBrowserHistory()

class App extends Component {

  state: State = { error: undefined }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return el('div', null, 'Error: ', this.state.error.message)
    }

    return el(ApolloProvider,
      // @ts-ignore invalid typedef for ApolloProviderProps
      { client },
      el(Router,
        { history },
        el(Switch, null,
          el(Route, { path: '/item/:itemId' }, el(NewsItem)),
          el(Route, { path: '/' }, el(NewsList)),
        ),
      ),
    )
  }

}

render(el(App), document.getElementById('root'))
