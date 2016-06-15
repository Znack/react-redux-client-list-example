import React, {Component, PropTypes} from 'react';


export default class ClientsList extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    client: PropTypes.object.isRequired,
  };

  render() {
    const {avatar, firstName, lastName} = this.props.client.general;
    const {title} = this.props.client.job;

    return (
      <a href={'/clients/' + this.props.index}>
        <img src={avatar} />
        <span>{firstName + ' ' + lastName}</span>
        <span>{title}</span>
      </a>
    );
  }
}
