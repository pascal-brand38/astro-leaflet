// Copyright (c) Pascal Brand
// MIT License

import { layerGroup as LlayerGroup } from "leaflet"
import { getMapFromElement } from '../../index'
import type { LayerGroup } from 'leaflet'
import type { AstroLeafletLayerGroupType } from '../../index'

export class CustomElementLayerGroup extends HTMLElement {
  leafletElement: LayerGroup | undefined

  constructor() {
    super()

    const props: AstroLeafletLayerGroupType = JSON.parse(this.dataset.props!)
    this.leafletElement = LlayerGroup([], props.options)

    const map = getMapFromElement(this)
    if (map) {
      this.leafletElement!.addTo(map);
    }
  }
}
