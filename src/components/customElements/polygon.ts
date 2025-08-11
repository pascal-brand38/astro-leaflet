// Copyright (c) Pascal Brand
// MIT License

import { polygon as Lpolygon } from "leaflet/dist/leaflet-src.esm"
import type { AstroLeafletPolygonType } from '../../index'
import type { Polygon } from 'leaflet'
import { getMapFromElement } from '../../index'

export class CustomElementPolygon extends HTMLElement {
  leafletElement: Polygon | undefined

  constructor() {
    super()
    const props: AstroLeafletPolygonType = JSON.parse(this.dataset.props!)
    const map = getMapFromElement(this)
    if (map) {
      this.leafletElement = Lpolygon(props.latlngs, props.options).addTo(map!);
    }
  }
}
