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
      <div className="media">
        <div className="media-left media-middle">
          <a href="#" onClick={this.handleClick.bind(this)}>
            <img src={avatar} className="media-object thumbnail" />
          </a>
        </div>
        <div className="media-body media-middle">
          <a href="#" onClick={this.handleClick.bind(this)}>
            <span>{firstName + ' ' + lastName}</span> <br/>
            <span>{title}</span>
          </a>
        </div>
      </div>
    );
  }
}
