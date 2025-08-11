// Copyright (c) Pascal Brand
// MIT License

import { control as Lcontrol } from "leaflet/dist/leaflet-src.esm"
import { getMapFromElement, getControlLayerFromElement, getLayerGroupOrTileLayerFromElement } from '../../index'
import type { Control } from 'leaflet'
import type { AstroLeafletBaseLayerType, AstroLeafletOverlayType } from 'astro-leaflet'

export class CustomElementControlLayer extends HTMLElement {
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

export class CustomElementBaseLayer extends HTMLElement {
  constructor() {
    super()

    const props: AstroLeafletBaseLayerType = JSON.parse(this.dataset.props!)

    const controllayer = getControlLayerFromElement(this)
    const layer = getLayerGroupOrTileLayerFromElement(this)
    if (controllayer && layer) {
      controllayer.addBaseLayer(layer, props.name)
    }
  }
}

export class CustomElementOverlay extends HTMLElement {
  constructor() {
    super()

    const props: AstroLeafletOverlayType = JSON.parse(this.dataset.props!)

    const controllayer = getControlLayerFromElement(this)
    const layer = getLayerGroupOrTileLayerFromElement(this)
    if (controllayer && layer) {
      controllayer.addOverlay(layer, props.name)
    }
  }
}
