import React, { Component } from 'react';
import ProductCard from './productCard';
import { connect } from 'react-redux';
import apiService from '../../../services/apiroutes';
import getProductsAction from '../../../store/actions/getProductsAction';
import getCategoriesAction from '../../../store/actions/getCategoriesAction';
import addtocartAction from '../../../store/actions/addtocartAction';

class ProductItems extends Component {

  state = {
    currentBox: null
  }

  componentDidMount() {
    let { pageNum } = this.props;
    this.handlePageChange(pageNum);
  }

  componentDidUpdate(prevProps) {
    let { PageStates } = prevProps;
    let { page, deptID, catID, search } = PageStates;
    let prev = [page, deptID, catID, search];
    for (let key in this.props.PageStates) {
      if (key === 'deptID') deptID = this.props.PageStates[key];
      if (key === 'catID') catID = this.props.PageStates[key];
      if (key === 'search') search = this.props.PageStates[key];
    }
    if (this.props.pageNum !== prev[0]) {
      this.handlePageChange(this.props.pageNum, deptID, catID, search,prev);
    }
  }

  handlePageChange = (page, deptID, catID, search) => {
    try {
      if (search) {
        let payload = {
          page: page,
          desc_length: 35,
          query_string: search
        }
        apiService.searchProducts(payload)
          .then(res => {
           this.props.getProducts(res.data);
          })
      }
      else if (catID) {
        let payload = {
          id: catID,
          page: page,
          desc_length: 35
        }
        apiService.getProductsByCatID(payload)
        .then(res => {
          this.props.getProducts(res.data)
        })
      } 
      else if (deptID) {
        let payload = {
          id: deptID,
          page: page,
          desc_length: 35
        }
        apiService.getProductsByDeptID(payload)
        .then(res => {
          this.props.getProducts(res.data)
        })
      } else {
        let payload = {
          page: page,
          desc_length: 35
        }
        apiService.getAllProducts(payload)
          .then(res => {
           this.props.getProducts(res.data);
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleHover = (id) => {
    this.setState({ currentBox: id })
  }

  handleMouseLeave = () => {
    this.setState({ currentBox: "" })
  }

  handleAddToCart = (id) => {
    this.props.addtocart(id);
  }
  render() {
    let { products } = this.props.products;
    const { currentBox } = this.state;
    let productsArray = []

    for (let key in products) {
      if (key === 'rows') {
        productsArray = products[key];
      }
    }
    return (
      <div>
        <div onMouseLeave={this.handleMouseLeave}>
          <ProductCard hoveredItem={currentBox} products={productsArray} handleHover={this.handleHover} handleAddToCart={this.handleAddToCart}/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: (products) => dispatch(getProductsAction(products)),
  getCategories: (categories) => dispatch(getCategoriesAction(categories)),
  addtocart: (product_id) => dispatch(addtocartAction(product_id)),
});

const mapStateToProps = (state) => ({
  products: state.products
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItems);