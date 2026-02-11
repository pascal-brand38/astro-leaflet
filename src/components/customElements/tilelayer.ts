// Copyright (c) Pascal Brand
// MIT License

import { tileLayer as LtileLayer } from "leaflet"
import type { AstroLeafletTileLayerType } from '../../index'
import type { TileLayer } from 'leaflet'
import { getMapFromElement } from '../../index'

export class CustomElementTileLayer extends HTMLElement {
  leafletElement: TileLayer | undefined

  constructor() {
    super()
    const props: AstroLeafletTileLayerType = JSON.parse(this.dataset.props!)
    const map = getMapFromElement(this)
    if (map) {
      this.leafletElement = LtileLayer(props.urlTemplate, props.options).addTo(map!);
    }
  }
}
