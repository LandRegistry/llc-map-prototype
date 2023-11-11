<!-- GDS Styles -->
<!--   <link rel=stylesheet media="screen, print" type=text/css href="/public/ol/css/govuk-template.css">
  <link rel=stylesheet media="screen, print" type=text/css href="/public/ol/css/common-frontend-custom.css"> -->
<link rel=stylesheet media="screen, print" type=text/css href="/public/ol/css/maintain-frontend-custom.css">
<link rel="stylesheet" href="/public/ol/css/ol.css" type="text/css">

<script>
  $SCRIPT_ROOT = "";
  document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled')
</script>
<script src="/public/ol/js/gov-uk-template.js"></script>
<!-- Jquery -->
<script src="/public/ol/js/jquery.min.js"></script>

<script src="/public/ol/js/knockout.js"></script>
<!-- Open Layers -->
<script src="/public/ol/js/ol.js"></script>
<script src="/public/ol/js/proj4.js"></script>
<script src="/public/ol/js/union.js"></script>
<script src="/public/ol/js/draw_hole.js"></script>

<!-- Used to get the undo button -->
<script>
  var staticContentUrl = "/public";
</script>

<!-- Custom Map Styles -->
<script src="/public/ol/js/hatching_style.js"></script>
<script src="/public/ol/js/map_styles.js"></script>

<!-- Master Map Vector Layer -->
<script src="/public/ol/js/master_map_vector_layer.js"></script>
<script src="/public/ol/js/snap_to_vector_layer.js"></script>

<!-- Custom Map Controls -->
<script src="/public/ol/js/map_undo.js"></script>
<script src="/public/ol/js/map_controls.js"></script>
<script src="/public/ol/js/map_helpers.js"></script>

<!-- Map config -->
<script src="/public/ol/js/map_config.js"></script>
<script>
  var termsLink = "https://www.ordnancesurvey.co.uk/about/governance/policies/hm-land-registry-local-land-searches-service.html";
  var mastermap_api_key = "{{ data.API_KEY }}";
  var map_base_layer_view_name = "m0100";
  var wfs_server_url = "{{ data.WFS_URL }}";
  var wmts_server_url = "{{ data.WMTS_URL }}";

  MAP_CONFIG.setBaseLayer(MAP_CONFIG.base_layer_zindex, MAP_CONFIG.mastermapResolutions, MAP_CONFIG.projection, termsLink, false);
</script>

<!-- Layers -->
<!-- <script src="/public/ol/js/geoserver.js"></script> -->

<!-- <script>
  var geoserver_url = "";
  configureGeoserverLayerForUser(geoserver_url, '{{ data.GEOSERVER_KEY }}');
</script> -->

<!-- OpenLayers with Mapbox Map -->
<script src="/public/ol/js/map.js"></script>
<script src="/public/ol/js/address_marker.js"></script>

<!-- <script src="/public/ol/js/map_styles.js"></script> -->
<script src="/public/ol/js/save_geometries.js"></script>
<script src="/public/ol/js/add_location.js"></script>
<script src="/public/ol/js/full-screen-map-sidebar.js"></script>

<script>
  addLocation.init("/static");
  $(function () {
    $("#map").attr('height', '960px');
    map.updateSize();
  });

///////////////////////////////////////////////
// init select area
///////////////////////////////////////////////
$( document ).ready(function() {
  map.removeInteraction(MAP_CONTROLS.current_interaction);
  MASTER_MAP_VECTOR_LAYER.enable()
  MAP_CONTROLS.toggle_draw_layer_style(draw_layer_styles.DRAW);

  MAP_CONTROLS.current_interaction = new ol.interaction.Select({
    layers: [MASTER_MAP_VECTOR_LAYER.layer],
    style: draw_layer_styles.style[draw_layer_styles.DRAW]
  });

  MAP_CONTROLS.current_interaction.getFeatures().on('add', function (event) {
    MAP_UNDO.store_state();
    feature = event.target.item(0).clone();
    if (feature) {
      geometry = feature.getGeometry();
      //Convert multi polygons to features
      if (geometry instanceof ol.geom.MultiPolygon) {
        geometry.getPolygons().forEach(function (geometry) {
          MAP_CONTROLS.addGeometryToMap(geometry)
        })
      }
      else {
        MAP_CONTROLS.addGeometryToMap(geometry)
      }
    }
  });

  MAP_CONTROLS.vectorControls.copy_enabled = true;
  map.addInteraction(MAP_CONTROLS.current_interaction)

});



</script>


<script type="text/javascript">
  $(function () {
    load_previous_data({ "features": [{ "geometry": { "coordinates": [[[415764.95, 464716.37], [415766.14, 464708.44], [415787.609, 464710.113], [415788.09, 464710.15], [415796.29, 464707.14], [415797.53, 464706.67], [415798.18, 464706.44], [415799.26, 464706.13], [415802.29, 464705.76], [415804.96, 464705.64], [415807.64, 464705.84], [415810.11, 464706.17], [415812.74, 464706.85], [415813.91, 464707.26], [415816.55, 464708.47], [415818.2, 464709.41], [415820.75, 464711.36], [415823.25, 464713.36], [415826.66, 464715.76], [415841.6, 464726.83], [415849.35, 464732.54], [415845.14, 464737.59], [415843.01, 464736.07], [415841.38, 464736.63], [415840.54, 464738.53], [415842.39, 464740.72], [415832.84, 464752.2], [415829.4, 464756.22], [415827.62, 464755.15], [415826.32, 464754.35], [415825.32, 464753.85], [415824.72, 464753.65], [415824.12, 464753.55], [415822.22, 464752.95], [415821.01, 464752.74], [415819.71, 464752.54], [415816.61, 464751.94], [415814.5, 464751.63], [415808.21, 464758.75], [415792.1, 464754.24], [415794.51, 464732.32], [415781.49, 464729.41], [415765.54, 464725.8], [415765.69, 464721.43], [415766.59, 464721.32], [415766.44, 464716.46], [415764.95, 464716.37]]], "type": "Polygon" }, "properties": { "id": 1696925633279 }, "type": "Feature" }], "type": "FeatureCollection" });
  });
</script>
