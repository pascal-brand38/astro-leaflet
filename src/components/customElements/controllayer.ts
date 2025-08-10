// Copyright (c) Pascal Brand
// MIT License

import { control as Lcontrol } from "leaflet/dist/leaflet-src.esm"
import { getMapFromElement, getMapOrLayoutGroupFromElement, getControlLayerFromElement, getLayerGroupFromElement } from '../../index'
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
    const layergroup = getLayerGroupFromElement(this)
    if (controllayer && layergroup) {
      controllayer.addBaseLayer(layergroup, props.name)
    }
  }
}

export class CustomElementOverlay extends HTMLElement {
  constructor() {
    super()

    const props: AstroLeafletBaseLayerType = JSON.parse(this.dataset.props!)

    console.log('CustomElementOverlay')
    const controllayer = getControlLayerFromElement(this)
    const layergroup = getLayerGroupFromElement(this)
    if (controllayer && layergroup) {
      console.log('controllayer= ', controllayer)
      console.log('layergroup= ', layergroup)
      controllayer.addOverlay(layergroup, props.name)
    }
  }
}
