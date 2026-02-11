// Copyright (c) Pascal Brand
// MIT License

import { control as Lcontrol, Control as LControl } from "leaflet"
import { getMapFromElement, getControlLayerFromElement, getLayerGroupOrTileLayerFromElement } from '../../index'
import type { Control } from 'leaflet'
import type { AstroLeafletControlType, AstroLeafletBaseLayerType, AstroLeafletOverlayType } from 'astro-leaflet'

export class CustomElementControl extends HTMLElement {
  leafletElement: Control | undefined

  constructor() {
    super()

    const props: AstroLeafletControlType = JSON.parse(this.dataset.props!)
    this.leafletElement = new LControl(props.options)

    const map = getMapFromElement(this)
    if (map) {
      const children = this.children
      if (!children || children.length!==1) {
        console.error('astro-leaflet <Control>: must have one and only one <div> in the slot')
      }
      if (children) {
        this.leafletElement!.onAdd = (map) => children[0] as HTMLElement
        this.leafletElement!.addTo(map);
      }
    }
  }
}

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
