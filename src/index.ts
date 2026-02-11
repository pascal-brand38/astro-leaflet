// Copyright (c) Pascal Brand
// MIT License

import type {
  CircleOptions,
  Control,
  ControlOptions,
  GeoJSONOptions,
  LatLngExpression,
  MarkerOptions,
  DivIconOptions,
  Icon,
  Map,
  MapOptions,
  ImageOverlayOptions,
  LayerGroup,
  LayerOptions,
  TileLayerOptions,
  ZoomPanOptions,
  PolylineOptions,
  PopupOptions,
  LocateOptions,
} from 'leaflet';
import type * as geojson from 'geojson';

import type { HTMLAttributes } from 'astro/types';

import type { LayerNamesType } from './layerFromName';
import { CustomElementLeafletGeneric } from './components/customElements/generic';

/** Type to create an icon to be used in leaflet markers.
 * This type is used in ```<CreateLeafletIcon .../>```
 * Current limitation: only divIcon can be created directly
 */
export interface AstroLeafletCreateIconType {
  /** Name of the created icon. Used to refer the icon in markers as ```astroIconName``` */
  name: string;

  /** leaflet options to create the icon */
  options: DivIconOptions;
}

/** Marker type, as provided in ```<Leaflet ... markers=...>``` */
export interface AstroLeafletMarkerType {
  /** position of the marker */
  latlng: LatLngExpression;

  /** leaflet options of the marker (title,...) */
  options?: Omit<MarkerOptions, 'icon'>;

  /** name of the icon to be used, as created by ```<CreateLeafletIcon name='myicon-name'..../>```.
   * When not provided, use the leaflet default icon
   */
  astroIconName?: string;
}

/** options to be provided in ```<Leaflet options=.../>``` */
export interface AstroLeafletOptionsType {
  /** center of the created map */
  center?: LatLngExpression;

  /** zoom */
  zoom?: number;

  /** tile url to be used. When not provided, uses ```https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png``` */
  tileLayer?: string;

  /** friendly name of the lyer, such as Google&type=satellite */
  tileByName?: LayerNamesType;

  /** ```<Leaflet...>``` is calling leaflet ```map()``` function with options ```mapOptions``` */
  mapOptions?: MapOptions;

  /** ```<Leaflet...>``` is calling leaflet ```setView()``` function with options ```setViewOptions``` */
  setViewOptions?: ZoomPanOptions;

  /** ```<Leaflet...>``` is calling leaflet ```tileLayer()``` function with options ```tileLayerOptions``` */
  tileLayerOptions?: TileLayerOptions;

  /** array of markers to be displayed on the map */
  markers?: AstroLeafletMarkerType[];
}

/** arguments provided in ```<Leaflet .../>```.
 * Note that ```<Leaflet...>``` inherits from a ```div``` options (id, class,...).
 * Note that when neither class nor style is provided, a default style is applied
 * in order to give a size to the map to display
 */
export interface AstroLeafletType extends HTMLAttributes<'div'> {
  /** true if no default layer or other should be applied */
  noDefault?: true | undefined;
  /** options of leaflet: tileByNmae,... */
  options?: AstroLeafletOptionsType;
}

/** arguments provided in ```<Polyline .../>```. */
export interface AstroLeafletPolylineType {
  /** list of positions, to draw the polyline */
  latlngs: LatLngExpression[] | LatLngExpression[][];
  /** leaflet options of the polyline: color,... */
  options?: PolylineOptions;
}

/** arguments provided in ```<ImageOverlay .../>```. */
export interface AstroLeafletImageOverlayType {
  /** URL of the image */
  imageUrl: string;
  /** geographical bounds it is tied to */
  bounds: [LatLngExpression, LatLngExpression];
  /** leaflet options of the ImageOverlay: opacity,... */
  options?: ImageOverlayOptions;
}

/** arguments provided in ```<Circle .../>```. */
export interface AstroLeafletCircleType {
  /** geographical point */
  latlng: LatLngExpression;
  /** leaflet options of the Circle: radius,... */
  options: CircleOptions;
}

/** arguments provided in ```<Polygon .../>```. */
export interface AstroLeafletPolygonType {
  /** list of positions, to draw the polyline */
  latlngs: LatLngExpression[] | LatLngExpression[][];
  /** leaflet options of the polyline: color,... */
  options?: PolylineOptions;
}

interface _AstroLeafletTileLayerOptionsType {
  /** leaflet options of the tilelayer: opacity,... */
  options?: TileLayerOptions;
}

interface _AstroLeafletTileLayerByNameType extends _AstroLeafletTileLayerOptionsType {
  /** name of the tile to display, as used by getLayerOptionsFromName() */
  tileByName: LayerNamesType;

  /** urlTemplate or tileByName, but not both */
  urlTemplate?: never;
}

interface _AstroLeafletTileLayerByUrlType extends _AstroLeafletTileLayerOptionsType {
  /** url of the tiles, such as 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' */
  urlTemplate: string;

  /** urlTemplate or tileByName, but not both */
  tileByName?: never;
}

/** arguments provided in ```<Control .../>```. */
export interface AstroLeafletControlType {
  /** id to get the control */
  id?: string;

  /** leaflet options of the layer group: attribution,... */
  options?: ControlOptions;
}

/** arguments provided in ```<TileLayer .../>```. */
export type AstroLeafletTileLayerType =
  | _AstroLeafletTileLayerByNameType
  | _AstroLeafletTileLayerByUrlType;

/** arguments provided in ```<LayerGroup .../>```. */
export interface AstroLeafletLayerGroupType {
  /** id to get the layergroup */
  id?: string;
  /** leaflet options of the layer group: attribution,... */
  options?: LayerOptions;
}

/** arguments provided in ```<AstroLeafletBaseLayerType .../>```. */
export interface AstroLeafletBaseLayerType {
  /** name of the base layer radio button */
  name: string;
}

/** arguments provided in ```<AstroLeafletOverlayType .../>```. */
export interface AstroLeafletOverlayType {
  /** name of the overlay checkbox button */
  name: string;
}

/** arguments provided in ```<Popup .../>```. */
export interface AstroLeafletPopupType {
  /** name of the overlay checkbox button */
  content: string;

  /** geographical point */
  latlng?: LatLngExpression;

  /** leaflet options of a popup */
  options?: PopupOptions;

  /** true to open it on init */
  open?: true | undefined;
}

/** arguments provided in ```<Locate .../>```. */
export interface AstroLeafletLocateType {
  /** leaflet options of map.locate() */
  options?: LocateOptions;
}

/** arguments provided in ```<GeoJson .../>```. */
export interface AstroLeafletGeoJsonType {
  /** geo json object to be passed */
  geojson?: geojson.GeoJsonObject | geojson.GeoJsonObject[];

  /** leaflet options of geoJson: style,... */
  options?: GeoJSONOptions;

  /** id, in case we need to get the leaflet created element using getLeafletFromId() */
  id?: string;
}

/** get leaflet map, whose element is inside this <xxx> (such as <astro-leaflet>, <astro-leaflet-layergroup>...) */
function _getXXXFromElement(xxx: string[], el: HTMLElement | null): any | undefined {
  if (!el) {
    console.error('astro-leaflet::getxxxFromElement(${xxx}) failed - element is null');
    return undefined;
  }
  let parent: HTMLElement | null = el;
  while (parent) {
    if (xxx.includes(parent.tagName)) {
      const customElementLeafletMap: CustomElementLeafletGeneric =
        parent as CustomElementLeafletGeneric;
      if (!customElementLeafletMap.leafletElement) {
        console.error(
          `astro-leaflet::getxxxFromElement(${xxx}): no leaflet element associated with`,
        );
        return undefined;
      }
      return customElementLeafletMap.leafletElement;
    }
    parent = parent.parentElement;
  }
  console.error(
    'astro-leaflet::getxxxFromElement(${xxx}) failed - cannot find requested custom element',
  );
  return undefined;
}

export function getMapFromId(id: string): Map | undefined {
  return getMapFromElement(document.getElementById(id));
}

export function getMapOrLayoutGroupFromId(id: string): Map | LayerGroup | undefined {
  return getMapOrLayoutGroupFromElement(document.getElementById(id));
}

export function getMapFromElement(el: HTMLElement | null): Map | undefined {
  return _getXXXFromElement(['ASTRO-LEAFLET'], el);
}
export function getMapOrLayoutGroupFromElement(
  el: HTMLElement | null,
): Map | LayerGroup | undefined {
  return _getXXXFromElement(['ASTRO-LEAFLET', 'ASTRO-LEAFLET-LAYERGROUP'], el);
}
export function getLayerGroupFromElement(el: HTMLElement | null): LayerGroup | undefined {
  return _getXXXFromElement(['ASTRO-LEAFLET-LAYERGROUP'], el);
}
export function getLayerGroupOrTileLayerFromElement(
  el: HTMLElement | null,
): LayerGroup | undefined {
  return _getXXXFromElement(['ASTRO-LEAFLET-LAYERGROUP', 'ASTRO-LEAFLET-TILELAYER'], el);
}
export function getControlLayerFromElement(el: HTMLElement | null): Control.Layers | undefined {
  return _getXXXFromElement(['ASTRO-LEAFLET-CONTROLLAYER'], el);
}
export function getLeafletFromId(id: string): any | undefined {
  const el: CustomElementLeafletGeneric | undefined = document.getElementById(id) as
    | CustomElementLeafletGeneric
    | undefined;
  if (el) {
    return el.leafletElement;
  }
  return undefined;
}

/** export astro components */
export { default as Leaflet } from './components/Leaflet.astro';
export { default as Control } from './components/Control.astro';
export { default as ControlLayer } from './components/ControlLayer.astro';
export { default as LayerGroup } from './components/LayerGroup.astro';
export { default as BaseLayer } from './components/BaseLayer.astro';
export { default as Overlay } from './components/Overlay.astro';
export { default as CreateLeafletIcon } from './components/CreateLeafletIcon.astro';

export { default as Circle } from './components/Circle.astro';
export { default as GeoJson } from './components/GeoJson.astro';
export { default as ImageOverlay } from './components/ImageOverlay.astro';
export { default as Marker } from './components/Marker.astro';
export { default as Polyline } from './components/Polyline.astro';
export { default as Polygon } from './components/Polygon.astro';

export { default as Popup } from './components/Popup.astro';

export { default as FitBounds } from './components/FitBounds.astro';
export { default as FitWorld } from './components/FitWorld.astro';
export { default as Locate } from './components/Locate.astro';
export { default as TileLayer } from './components/TileLayer.astro';
