import React, { Component } from 'react';
import SideBar from './sidebar/sidebar';
import ProductItems from './productItems/productitems';
import { connect } from 'react-redux';


class Products extends Component {
  state = {
    page: 1,
    deptID: "",
    catID: "",
    search: "",
    productCount: ""
  }
  handleClick = num => {
    this.setState({ page: num });
  }

  handleDeptPage = (dept_id) => {
    this.setState({ deptID: dept_id })
  }
  handleCatPage = (cat_id) => {
    this.setState({ catID: cat_id })
  }
  handleSearchTerm = (search) => {
    this.setState({ search })
  }

  render() {
    let { products } = this.props.products;
    let productCount;
    for (let key in products) if (key === 'count') productCount = products[key];
    let pages = Math.ceil(productCount / 20);
    let pagesArray = [];
    for (let index = 1; index <= pages; index++) {
      pagesArray[index] = index;
    }
    let pagination = (pagesArray) ? (
      pagesArray.map((page, index) => {
        return (
          <div key={index} className="btn-floating center btn-medium waves-effect waves-light red paginationBtn" onClick={() => { this.handleClick(index) }}>{index}</div>
        )
      })
    ) : null;

    let renderPage = (this.props.departments) ?
      <div>
        <div className="row">
          <div className="col s12 m6 l6 offset-m5 offset-l5">
            {pagination}
          </div>
        </div>
        <div className="row">
          <div className="col s12 m2 l2">
            <SideBar handleDeptPage={this.handleDeptPage} handleCatPage={this.handleCatPage} handleSearchTerm={this.handleSearchTerm} />
          </div>
          <div className="col s12 m10 l10">
            <ProductItems pageNum={this.state.page} PageStates={this.state} />
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
  departments: state.departments,
  products: state.products
});

export default connect(mapStateToProps)(Products);