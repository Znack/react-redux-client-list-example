import React, {Component, PropTypes} from 'react';


export default class ClientsList extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
  };

  render() {
    const {avatar, firstName, lastName} = this.props.client.general;
    const {title, company} = this.props.client.job;
    const {email, phone} = this.props.client.contact;
    const {street, city, zipCode, country} = this.props.client.address;

    return (
      <div>
        <img src={avatar} className="thumbnail" />
        <h3>{firstName + ' ' + lastName}</h3>
        <p>{title + ' – ' + company}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Address: {street + ', ' + zipCode + ', ' + city + ', ' + country}</p>
      </div>
    );
  }
}
