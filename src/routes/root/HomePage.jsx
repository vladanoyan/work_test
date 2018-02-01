import React from 'react';
// import PropTypes from 'prop-types';
import {
 Container,
  Col,
  Row,
} from 'reactstrap';
import Map from '../../routes/root/maps';
import cs from './HomePage.pcss';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      items: [
        {
          text: 'Yerevan',
          lat: 12684,
          lng: 992684,
          key: 44,
        },
        {
          text: 'Paris',
          lat: 444,
          lng: 8745,
          key: 234,
        },
        {
          text: 'England',
          lat: 82947565,
          lng: 8792,
          key: 90,
        },
      ],
    };
  }
  hendleChange(event) {
    this.setState({ value: event.target.value });
  }

  del(e) {
    const array = this.state.items;
    console.log(e.target.parentElement.key);
    const index = array.indexOf(e.target.parentElement);
    array.splice(index, 1);
    this.setState({ items: array });
  }
  render() {
    const updatedList = this.state.items.filter((item) => {
      return item.text.toLowerCase().search(
        this.state.value.toLowerCase()) !== -1;
    });

    const listing = updatedList.map((item) =>
      (<li
        key={item.key}
      >
        <p>Place: {item.text}</p>
        <p>Lat: {item.lat}</p>
        <p>lng: {item.lng}</p>
        <span
          onClick={this.del.bind(this)}
          role="presentation"
        >x</span></li>),
    );

    return (
      <div>
        <Container>
          <Row>
            <Col md="3" xs="12" className={cs.left}>
              <form>
                <input
                  placeholder="Filter Items"
                  type="text"
                  name="name"
                  onChange={this.hendleChange.bind(this)}
                  value={this.state.value}
                  className={cs.filterInput}
                />
              </form>
              <div className={cs.items}>
                <ul className={cs.ul} >
                  {listing}
                </ul>
              </div>
            </Col>
            <Col md="9" xs="12" className={cs.right}>
              <Map />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
