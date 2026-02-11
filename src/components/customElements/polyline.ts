// Copyright (c) Pascal Brand
// MIT License

import { polyline as Lpolyline } from "leaflet"
import type { AstroLeafletPolylineType } from '../../index'
import type { Polyline } from 'leaflet'
import { getMapFromElement } from '../../index'

export class CustomElementPolyline extends HTMLElement {
  leafletElement: Polyline | undefined

  constructor() {
    super()
    const props: AstroLeafletPolylineType = JSON.parse(this.dataset.props!)
    const map = getMapFromElement(this)
    if (map) {
      this.leafletElement = Lpolyline(props.latlngs, props.options).addTo(map!);
    }
  }
}
