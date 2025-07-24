// Copyright (c) Pascal Brand
// MIT License

import type { LatLngExpression, MarkerOptions, DivIconOptions, Map } from 'leaflet'
import type { HTMLAttributes } from 'astro/types'

export interface AstroLeafletCreateIconType {
  name: string,
  options: Omit<DivIconOptions, 'icon'>,
}

export interface AstroLeafletMarkerType {
  latlng: LatLngExpression,
  options?: MarkerOptions,
  astroIconName?: string,
}

export interface AstroLeafletOptionsType {
  center?: LatLngExpression,
  zoom?: number,
  tileLayer?: string
  /** Most tile servers require attribution. */
  attribution?: string
  markers?: AstroLeafletMarkerType[]
}

export interface AstroLeafletType extends HTMLAttributes<"div"> {
  options?: AstroLeafletOptionsType
}


declare class CustomElementAstroLeaflet extends HTMLElement {
  map: Map | undefined    // saved map
}

/** leaflet maps once document is loaded, for each id */
export function getMap(id: string): Map |undefined {
  let el = document.getElementById(id)
  if (!el || !el.parentElement) {
    return undefined
  } else {
    const customElementLeafletMap: CustomElementAstroLeaflet = (el.parentElement as CustomElementAstroLeaflet)
    return customElementLeafletMap.map
  }
}

export { default as Leaflet } from './components/Leaflet.astro'
export { default as CreateLeafletIcon } from './components/CreateLeafletIcon.astro'
