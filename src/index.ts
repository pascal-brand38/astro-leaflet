// Copyright (c) Pascal Brand
// MIT License

import type { LatLngExpression, MarkerOptions, Map, Icon, DivIcon } from 'leaflet'
import type { HTMLAttributes } from 'astro/types'

export interface AstroLeafLetMarkerType {
  latlng: LatLngExpression,
  options?: MarkerOptions,
  astroIconName?: string,
}

export interface AstroLeafLetOptionsType {
  center?: LatLngExpression,
  zoom?: number,
  tileLayer?: string
  /** Most tile servers require attribution. */
  attribution?: string
  markers?: AstroLeafLetMarkerType[]
}

export interface AstroLeafLetType extends HTMLAttributes<"div"> {
  options?: AstroLeafLetOptionsType
}

export function setDefaultProps(props: AstroLeafLetType) {
  props.options = props.options || {}
  props.options.center = props.options.center || [ 30, 7 ]
  props.options.zoom = props.options.zoom || 2
  props.options.tileLayer = props.options.tileLayer || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  props.options.attribution = props.options.attribution || "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"

  props.options.markers = props.options.markers || []
}

/** leaflet maps once document is loaded, for each id */
export function getMap(id: string): Map {
  let el = document.getElementById(id)
  return el.parentElement.map
}

/** icons created using */
export const astroLeafletIcons: { [name: string]: Icon | DivIcon } = {}

export { default as LeafLet } from './components/LeafLet.astro'
export { default as CreateLeafLetDivIcon } from './components/CreateLeafLetDivIcon.astro'
