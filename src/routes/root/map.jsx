import React from 'react';
import cs from './HomePage.pcss';

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      zoom: 16,
      maptype: 'roadmap',
      place_formatted: '',
      place_id: '',
      place_location: '',
    };
  }
  componentDidMount() {
    const labels = 'AABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let labelIndex = 0;
    function addMarker(location, map) {
      const marker = new window.google.maps.Marker({
        map,
        label: labels[labelIndex += 1 % labels.length],
        position: location,
      });
    }
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 16,
      mapTypeId: 'roadmap',
    });
    window.google.maps.event.addListener(map, 'click', (event) => {
      addMarker(event.latLng, map);
    });
    map.addListener('zoom_changed', () => {
      this.setState({
        zoom: map.getZoom(),
      });
    });
    const marker = new window.google.maps.Marker({
      map,
      position: location,
      icon: 'https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Location_marker_pin_map_gps.png',
    });
    map.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: map.getMapTypeId(),
      });
    });
    // initialize the autocomplete functionality using the #pac-input input box
    const inputNode = document.getElementById('pac-input');
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    const autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();
      const location = place.geometry.location;

      this.setState({
        place_formatted: place.formatted_address,
        place_id: place.place_id,
        place_location: location.toString(),
      });

      // bring the selected place in view on the map
      map.fitBounds(place.geometry.viewport);
      map.setCenter(location);

      marker.setPlace({
        placeId: place.place_id,
        location,
      });
    });
  }

  render() {
    return (
      <div>
        <div className={cs.state}>
          <h3>State</h3>
          <p>
            Zoom level: {this.state.zoom}<br />
            Map type: {this.state.maptype}
          </p>
          <p>Place: {this.state.place_formatted}</p>
          <p>Place ID: {this.state.place_id}</p>
          <p>Location: {this.state.place_location}</p>
        </div>
        <div className={cs.map} id="map" />
        <div id="pac-container">
          <input id="pac-input" type="text" placeholder="Enter a location" />
        </div>
      </div>
    );
  }
}

export default Map;
