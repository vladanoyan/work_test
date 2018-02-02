import React from 'react';
import PropTypes from 'prop-types';
import image from '../../resource/images/dd.png';
import cs from './HomePage.pcss';

class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.markers = [];
    this.map = null;
  }

  componentDidMount() {
    const addMarker = (location) => {
      const newLocation = {
        name: 'Name',
        lat: location.lat(),
        lng: location.lng(),
        id: Date.now(),
      };

      // Adds a marker to the map.
      this.props.onNewLocation(newLocation);
    };

    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {
        lat: 12.97,
        lng: 77.59,
      },
    });

    // This event listener calls addMarker() when the map is clicked.
    window.google.maps.event.addListener(this.map, 'click', (event) => {
      addMarker(event.latLng);
    });
  }

  addMarkers() {
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let labelIndex = -1;

    for (let i = 0; i < this.props.locationArray.length; i += 1) {
      // Add the marker at the clicked location, and add the next-available label
      const marker = new window.google.maps.Marker({
        position: {
          lat: this.props.locationArray[i].lat,
          lng: this.props.locationArray[i].lng,
        },
        label: labels[labelIndex += 1 % labels.length],
        map: this.map,
        icon: image,
      });
      const contentString = this.props.locationArray[i].name;
      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });
      marker.addListener('click', () => {
        infowindow.open(this.map, marker);
      });
      this.markers.push(marker);
    }
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i += 1) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  render() {
    this.clearMarkers();
    this.addMarkers();

    return (
      <div>
        <div className={cs.map} id="map" />
      </div>
    );
  }
}

Maps.propTypes = {
  locationArray: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onNewLocation: PropTypes.func.isRequired,
};
export default Maps;
