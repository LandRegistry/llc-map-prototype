import './style.css';
import { Map, View } from 'ol';
import OSM from 'ol/source/OSM';
import { Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { Fill, Stroke, Icon, Style } from 'ol/style.js';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import GeoJSON from 'ol/format/GeoJSON.js';

const GeoJSON_URL = "data/lad.json";
const pin_URL = "assets/pin.png";
// option to display a marker icon
let displayMarker = false;

const iconFeature = new Feature({
  geometry: new Point([-165027.54, 7052978.36]) // sheffield
});

const defaultStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.1)',
  }),
  stroke: new Stroke({
    color: 'rgba(0, 0, 0, 0.4)',
    width: 0.5,
  }),
});

/* 
const newStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.3)',
  }),
  stroke: new Stroke({
    color: 'rgba(0, 0, 0, 1)',
    width: 1,
  })
});
 */

const highlightStyle = new Style({
  fill: new Fill({
    color: 'rgba(0, 0, 255, 0.5)',
  }),
  stroke: new Stroke({
    color: 'rgba(0, 0, 0, 1)',
    width: 1,
  }),
});

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    src: pin_URL,
    scale: 0.1
  }),
});

let center = [];
iconFeature.setStyle(iconStyle);
let featureArray = [];
if(displayMarker){
  featureArray = [iconFeature]
}

const vectorSource = new VectorSource({
  features: featureArray,
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

const LSOALayer = new VectorLayer({
  //background: '#1a2b39',
  source: new VectorSource({
    url: GeoJSON_URL,
    format: new GeoJSON(),
  }),
  style: defaultStyle,
});

const rasterLayer = new TileLayer({
  source: new OSM(),
});

const map = new Map({
  target: 'map',
  layers: [rasterLayer, LSOALayer, vectorLayer],
  view: new View({
    center: [-165027.54, 7052978.36],
    zoom: 8,
    maxZoom: 20,
  }),
});


/*
map.on("moveend", function (e) {
  console.log("moveend");
  getCenterCoords();
});
*/

map.on('click', function (evt) {
  let coordinate = evt.coordinate;
  console.log(coordinate);
  addMarker(coordinate);
});


//////////////////////////////////////////////////////////////////////
// add marker at center of map 
////////////////////////////////////////////////////////////////////// 
function getCenterCoords() {
  // const map = evt.map;
  //console.log(map.getInteractions());
  center = map.getView().getCenter(map.getSize());
  console.log('getCenterCoords');
  console.log(center);
}

function addMarker(center) {
  //const center = map.getView().getCenter(map.getSize());
  displayMarker = document.querySelector('input[name=marker]:checked');
  console.log(displayMarker);
  if(displayMarker){
    const iconFeature = new Feature({
      geometry: new Point(center)
    });

    // add pin icon
    iconFeature.setStyle(iconStyle);
    vectorLayer.getSource().addFeature(iconFeature)
  }else{

    // find the polygon that contains the point
    let polygon = LSOALayer.getSource().getFeaturesAtCoordinate(center)[0];
    //console.log(polygon.getProperties().LAD13NM);
    if(polygon){
      polygon.setStyle(highlightStyle);
    }
  }
}

function clearAllMarkers() {
  console.log('clearAll');
  let polygons = LSOALayer.getSource().getFeatures();
  
  for (var i=0; i< polygons.length; i++){
    polygons[i].setStyle(defaultStyle);
  }
  // remove all markers
  vectorLayer.getSource().clear();
}


//////////////////////////////////////////////////////////////////////
// button pixel panning 
////////////////////////////////////////////////////////////////////// 
function moveMap([xDirection, yDirection]) {
  var center = map.getView().getCenter();
  var resolution = map.getView().getResolution();
  map.getView().setCenter([center[0] + xDirection * resolution, center[1] + yDirection * resolution]);
}
const step = 10; // pixels

document.getElementById('select-area').onclick = function (evt) {
  getCenterCoords(evt);
  const center = map.getView().getCenter(map.getSize());
  addMarker(center);
};
document.getElementById('pan-up').onclick = function () {
  moveMap([0, step]);
};
document.getElementById('pan-left').onclick = function () {
  moveMap([-step, 0]);
};
document.getElementById('pan-right').onclick = function () {
  moveMap([step, 0]);
};
document.getElementById('pan-down').onclick = function () {
  moveMap([0, -step]);
};
document.getElementById('zoom-out').onclick = function () {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom - 1);
};
document.getElementById('zoom-in').onclick = function () {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom + 1);
};

document.getElementById('clear-all').onclick = function () {
  clearAllMarkers();
};