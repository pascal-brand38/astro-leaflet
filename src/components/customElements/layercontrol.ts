// Copyright (c) Pascal Brand
// MIT License

import { control as Lcontrol } from "leaflet/dist/leaflet-src.esm"
import { getMapFromElement } from '../../index'
import type { Control } from 'leaflet'

export class CustomElementLayerControl extends HTMLElement {
  leafletElement: Control.Layers | undefined

  constructor() {
    super()

    this.leafletElement = Lcontrol.layers()

    const map = getMapFromElement(this)
    if (map) {
      this.leafletElement!.addTo(map);
    }
  }
}
