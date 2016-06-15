import React, {Component, PropTypes} from 'react';


export default class ClientShortInfo extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    client: PropTypes.object.isRequired,

    choose: PropTypes.func.isRequired,
  };

  handleClick(event) {
    event.preventDefault();
    return this.props.choose(this.props.index);
  }

  render() {
    const {avatar, firstName, lastName} = this.props.client.general;
    const {title} = this.props.client.job;

    return (
      <a href="#" onClick={this.handleClick.bind(this)}>
        <img src={avatar} />
        <span>{firstName + ' ' + lastName}</span>
        <span>{title}</span>
      </a>
    );
  }
}
