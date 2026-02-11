// Copyright (c) Pascal Brand
// MIT License

import type { AstroLeafletLocateType } from '../../index'
import { getMapFromElement } from '../../index'

export class CustomElementLocate extends HTMLElement {
  constructor() {
    super()
    const props: AstroLeafletLocateType = JSON.parse(this.dataset.props!)
    const map = getMapFromElement(this)
    if (map) {
      // locate when loaded done, so that we can add an event when locate is
      // found early enough
      window.addEventListener('load', () => {
        map.locate(props.options)
      })
    }
  }
}
