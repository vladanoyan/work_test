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
          key: 12684,
        },
        {
          text: 'Israel',
          key: 34354,
        },
        {
          text: 'United State',
          key: 9235,
        },
        {
          text: 'England',
          key: 7583,
        },
      ],
    };
  }
  hendleChange(event) {
    this.setState({ value: event.target.value });
  }
  addText(e) {
    const itemArray = this.state.items;
    if (this.state.value !== '') {
      itemArray.unshift({
        text: this.state.value,
        key: Date.now(),
      });
      console.log(this.state.items);
    }
    this.setState({ value: '' });
    this.setState({ items: itemArray });
    e.preventDefault();
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
        <p>Location: {item.key}</p>
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
                  type="text"
                  name="name"
                  onChange={this.hendleChange.bind(this)}
                  value={this.state.value}
                />
                <button
                  onClick={this.addText.bind(this)}
                  className={cs.Btn}
                >
                  Add
                </button>
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
