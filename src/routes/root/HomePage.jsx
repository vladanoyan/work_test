import React from 'react';
// import PropTypes from 'prop-types';
import {
 Container,
  Col,
  Row,
} from 'reactstrap';
import Maps from '../../routes/root/maps';
import cs from './HomePage.pcss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: [],
    };
  }

  onNewLocation(item) {
    const items = this.state.items;
    items.push(item);
    this.setState({ items });
  }

  del(e) {
    const array = this.state.items;
    const index = array.indexOf(e);
    array.splice(index, 1);
    this.setState({ items: array });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  editing(item, e) {
    const newValue = e.target.value;
    const { items } = this.state;
    const index = items.indexOf(item);

    items[index].name = newValue;

    this.setState({ items });
  }
  keyPress(e) {
    if (e.which === 13) {
      console.log(this.state.items);
      e.preventDefault();
    }
  }
  render() {
    const updatedList = this.state.items.filter((item) => {
      return item.name.toLowerCase().search(
        this.state.value.toLowerCase()) !== -1;
    });
    const listing = updatedList.map((item) =>
      (<li
        key={item.id}
      >
        <p>Edit Place: <input
          className={cs.edit}
          onChange={this.editing.bind(this, item)}
          value={item.name}
          onKeyPress={this.keyPress.bind(this)}
        />
        </p>
        <p>Lat: {item.lat}</p>
        <p>lng: {item.lng}</p>
        <span
          onClick={this.del.bind(this, item)}
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
                  onChange={this.handleChange.bind(this)}
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
              <Maps
                locationArray={this.state.items}
                onNewLocation={this.onNewLocation.bind(this)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
