import React from 'react';
import image from '../../resource/images/dd.png';
import cs from './HomePage.pcss';

class Maps extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let labelIndex = -1;
    const locationArray = [];
    function addMarker(location, map) {
      // Adds a marker to the map.
      locationArray.unshift({
        lat: location.lat,
        lng: location.lng,
        id: Date.now(),
        name: 'Name',
      });
      console.log(locationArray);
      // Add the marker at the clicked location, and add the next-available label
      const marker = new window.google.maps.Marker({
        position: location,
        label: labels[labelIndex += 1 % labels.length],
        map,
        icon: image,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
      });
      const liText = '<div>Title</div>';
      const infowindow = new window.google.maps.InfoWindow({
        content: liText,
      });
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    }
    const bangalore = { lat: 12.97, lng: 77.59 };
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: bangalore,
    });
    // This event listener calls addMarker() when the map is clicked.
    window.google.maps.event.addListener(map, 'click', (event) => {
      addMarker(event.latLng, map);
    });

    // Add a marker at the center of the map.
    addMarker(bangalore, map);
  }
  render() {
    return (
      <div>
        <div className={cs.map} id="map" />
      </div>
    );
  }
}

export default Maps;
