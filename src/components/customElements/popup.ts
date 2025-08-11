// Copyright (c) Pascal Brand
// MIT License

import { popup as Lpopup } from "leaflet/dist/leaflet-src.esm"
import type { AstroLeafletPopupType } from '../../index'
import type { Popup} from 'leaflet'
import { getMapFromElement } from '../../index'
import type { CustomElementLeafletGeneric } from './generic'

export class CustomElementPopup extends HTMLElement {
  leafletElement: Popup | undefined

  constructor() {
    super()
    const props: AstroLeafletPopupType = JSON.parse(this.dataset.props!)

    if (props.latlng) {
      // this popup is not bind to an element.
      const map = getMapFromElement(this)
      if (map) {
        this.leafletElement = Lpopup(props.latlng, props.options)
          .setContent(props.content)
          .openOn(map)
      }
    } else {
      // no position, so bind it to the parent element
      const parent = this.parentElement as CustomElementLeafletGeneric | undefined
      if (parent && parent.leafletElement && parent.leafletElement.bindPopup) {
        this.leafletElement = parent.leafletElement.bindPopup(props.content)
      }
    }

    if (props.open && this.leafletElement) {
      this.leafletElement.openPopup()
    }
  }
}
