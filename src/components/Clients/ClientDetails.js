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
        <img src={avatar} />
        <span>{firstName + ' ' + lastName}</span>
        <span>{title + ' &#8211; ' + company}</span>
        <span>Email: {email}</span>
        <span>Phone: {phone}</span>
        <span>Address: {street + ' ' + zipCode + ' ' + city + ' ' + country}</span>
      </div>
    );
  }
}
