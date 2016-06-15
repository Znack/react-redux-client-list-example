import React, {Component, PropTypes} from 'react';


export default class SearchForm extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,

    search: PropTypes.func.isRequired,
  };

  handleSearch(event) {
    return this.props.search(event.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Search..." className="form-control" onChange={this.handleSearch.bind(this)}/>
      </div>
    );
  }
}
