// Copyright (c) Pascal Brand
// MIT License

import { getMapFromElement } from '../../index'
import type { CustomElementLeafletGeneric } from './generic'

export class CustomElementFitBounds extends HTMLElement {
  constructor() {
    super()
    const map = getMapFromElement(this)
    if (map) {
      // take the parent. cast to a CustomElementLeafletGeneric, even if not, just to check access to leafletElement
      const parent = this.parentElement as CustomElementLeafletGeneric | undefined
      if (parent && parent.leafletElement && parent.leafletElement.getBounds) {
        map.fitBounds(parent.leafletElement.getBounds())
      } else {
        console.error('astro-leaflet <FitBounds/>: no getbounds in parent')
      }
    } else {
      console.error('astro-leaflet <FitBounds/>: no map in parent')
    }
  }
}
