<div align="center" style="background-color: black; padding: 16px;">
  <a href="https://leafletjs.com" target="_blank"><img width="140" src="images/leaflet-logo.png"></a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://astro.build/" target="_blank"><img height="70" src="images/astro-logo.png"></a>

  <h1>Astro Leaflet</h1>

  <p>
    Astro Leaflet is the native Astro component for
    <a href="https://www.leafletjs.com">leaflet</a>.
    leaflet is used to display maps, such as
    google maps or openstreetmap, along with markers,
    lines,...
  </p>

  [Demo](https://pascal-brand38.github.io/astro-dev/packages/astro-leaflet)

  <a href="https://pascal-brand38.github.io/astro-dev/packages/astro-leaflet" target="_blank">
    <img src="images/astro-leaflet-screenshot.jpg">
  </a>

</div>

<br>
<br>



# Installation
Get the latest version from NPM:
```
$ npm install astro-leaflet
```

<br>

# License
Astro-leaflet is released under the MIT license.

Astro-leaflet is using [leaflet](https://github.com/Leaflet/Leaflet).
leaflet is a BSD-2-Clause license software

<br>

# Usage

Here is a minimal example that is using openstreetmap

```jsx
---
import { Leaflet } from "astro-leaflet";
---
<Leaflet />
```

# Components:

## \<LeafLet>

Main component to create a leaflet map.

Usage:
```
<Leaflet options={{...}}>
</leaflet>
```

with the following option properties:
* tileLayer: string url of the main tile layer. Default is the one of openstreetmap
* tileLayerOptions: [Leaflet options](https://leafletjs.com/reference.html#tilelayer-minzoom)
  to set the attribution,...
* center: array of latitude and longitude. Default is centered on south europe
* zoom: a number for the zoom. Default is 2, that is a far view
* markers: an array of ```AstroLeafletMarkerType```

Full examples can be found at:
* [Minimal usage of ```<Leaflet>```](https://pascal-brand38.github.io/astro-dev/packages/astro-leaflet/#minimal)
* [Google Earth and markers](https://pascal-brand38.github.io/astro-dev/packages/astro-leaflet/#google-map-markers)


## \<TileLayer>

Component to add a layer on top of the main layer. This can
be usefull for example to display labels on top of satellite images.
Must be implemented in the ```<Leaflet>``` slot.

Usage:
```
<TileLayer
  urlTemplate='url of the tiles to overlay
  options={{ leaflet options of tileLayer() }}>
```

Full example can be found at:
* [NYC Marathon](https://pascal-brand38.github.io/astro-dev/packages/astro-leaflet/#NYC-Marathon)


## \<Polyline>

Components to draw polyline overlays on a map.
Must be implemented in the ```<Leaflet>``` slot.


Usage:
```
<Polyline
  latlngs={array of LatLngTuple[]}
  options={{  leaflet options of polyline() }}>
```

Full example can be found at:
* [NYC Marathon](https://pascal-brand38.github.io/astro-dev/packages/astro-leaflet/#NYC-Marathon)



## \<FitBounds>

Components to automatically center the map on elements
of the map, such as the points of a polyline.
Must be in the slot of the element to center to.

```
<FitBounds/>
```

Full example can be found at:
* [NYC Marathon](https://pascal-brand38.github.io/astro-dev/packages/astro-leaflet/#NYC-Marathon)


## \<CreateLeafletIcon>

Create a custom icon to be displayed in markers.
Must be implemented before the ```<Leaflet>``` slot.

Note that only divicons are supported for the time-being.

Usage:
```
<CreateLeafletIcon
  name='name of the icon to be used in markers'
  options={{
    className:"leaflet-icon-myicon",
    iconSize: [20,20]
    ...
  }}/>
<Leaflet options={options}/>

<style is:global>
	/* class definition used to define the custom icon */
	.leaflet-icon-myicon {
		background:red;
		border:5px solid rgba(255,255,255,0.5);
		border-radius:50%;
	}
</style>
```

Full example can be found at:
* [Google Earth and markers](https://pascal-brand38.github.io/astro-dev/packages/astro-leaflet/#google-map-markers)


## Complex Examples

Please check the [online doc](https://pascal-brand38.github.io/astro-dev/packages/astro-leaflet) for a fullset of examples.

Full code is provided.
