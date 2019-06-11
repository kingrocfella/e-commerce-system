import React, { Component } from 'react';
import SideBar from './sidebar/sidebar';
import ProductItems from './productItems/productitems';
import { connect } from 'react-redux';

class Products extends Component {
  render() {
    let renderPage = (this.props.departments) ?
    <div>
      <div className="row">
        <div className="col s12">
          <p className="center">pagination</p>
        </div>
      </div>
      <div className="row">
        <div className="col s2">
          <SideBar />
        </div>
        <div className="col s10">
          <ProductItems />
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