import { createElement as el } from 'react'
import { Link } from 'react-router-dom'

import imgBack from './back.png'
import './header.scss'
import imgOpen from './open.png'

interface Props {
  showBackButton: boolean,
  url?: string,
}

const renderBackButton = (isVisible: boolean) => {
  return isVisible ? el(Link, { to: '/' }, el('img', { src: imgBack })) : null
}

const renderExternalLink = (url: string | undefined) => {
  if (!url) {
    return null
  }

  return el('a',
    { href: url, target: '_blank', rel: 'nofollow noopener noreferrer' },
    el('img', { src: imgOpen }),
  )
}

export const Header = ({ showBackButton, url }: Props) => el('div',
  { className: 'header' },
  el('div', { className: 'header__button' }, renderBackButton(showBackButton)),
  el('div', { className: 'header__title' }, 'News reader'),
  el('div', { className: 'header__button' }, renderExternalLink(url)),
)
