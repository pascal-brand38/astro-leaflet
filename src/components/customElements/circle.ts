// Copyright (c) Pascal Brand
// MIT License

import { circle as Lcircle } from "leaflet"
import type { AstroLeafletCircleType } from '../../index'
import type { Circle } from 'leaflet'
import { getMapFromElement } from '../../index'

export class CustomElementCircle extends HTMLElement {
  leafletElement: Circle | undefined

  constructor() {
    super()
    const props: AstroLeafletCircleType = JSON.parse(this.dataset.props!)
    const map = getMapFromElement(this)
    if (map) {
      this.leafletElement = Lcircle(props.latlng, props.options).addTo(map!);
    }
  }
}
