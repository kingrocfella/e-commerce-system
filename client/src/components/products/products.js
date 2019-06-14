import React, { Component } from 'react';
import SideBar from './sidebar/sidebar';
import ProductItems from './productItems/productitems';
import { connect } from 'react-redux';

class Products extends Component {
  state = {
    page: 1
  }
  handleClick = num => {
    if (isNaN(num)) {
      let page = this.state.page;
      if (num === 'N') this.setState({ page: page + 1 });
      else {
        if (page === 1) return;
        else this.setState({ page: page - 1 });
      }
    } else {
      this.setState({ page: num });
    }
  }

  decrementState = () => {
    let page = this.state.page;
    this.setState({ page: page - 1 });
  }

  render() {
    let renderPage = (this.props.departments) ?
      <div>
        <div className="row">
          <div className="col s6 offset-s5">
            <div className="btn-floating center btn-medium waves-effect waves-light red paginationBtn" onClick={() => { this.handleClick('B') }}>Back</div> &nbsp;&nbsp;
            <div className="btn-floating center btn-medium waves-effect waves-light red paginationBtn" onClick={() => { this.handleClick(1) }}>1</div>
            <div className="btn-floating center btn-medium waves-effect waves-light red paginationBtn" onClick={() => { this.handleClick(2) }}>2</div> &nbsp;&nbsp;
            <div className="btn-floating center btn-medium waves-effect waves-light red paginationBtn" onClick={() => { this.handleClick('N') }}>Next</div>
          </div>
        </div>
        <div className="row">
          <div className="col s2">
            <SideBar />
          </div>
          <div className="col s10">
            <ProductItems pageNum={this.state.page} decrementState={this.decrementState} />
          </div>
        </div>
      </div> : null
    return (
      <div>
        {renderPage}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  departments: state.departments
});

export default connect(mapStateToProps)(Products);