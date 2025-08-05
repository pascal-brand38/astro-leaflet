// Copyright (c) Pascal Brand
// MIT License

import { imageOverlay as LimageOverlay } from "leaflet/dist/leaflet-src.esm"
import type { AstroLeafletImageOverlayType } from '../../index'
import type { ImageOverlay } from 'leaflet'
import { getMapFromElement } from '../../index'

export class CustomElementImageOverlay extends HTMLElement {
  leafletElement: ImageOverlay | undefined

  constructor() {
    super()
    const props: AstroLeafletImageOverlayType = JSON.parse(this.dataset.props!)
    const map = getMapFromElement(this)
    if (map) {
      this.leafletElement = LimageOverlay(props.imageUrl, props.bounds, props.options).addTo(map!);
    }
  }
}
