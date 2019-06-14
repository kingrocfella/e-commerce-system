import React, { Component } from 'react';
import ProductCard from './productCard';
import { connect } from 'react-redux';
import apiService from '../../../services/apiroutes';
import getProductsAction from '../../../store/actions/getProductsAction';

class ProductItems extends Component {

  componentDidMount() {
    const { pageNum } = this.props;
    this.handlePageChange(pageNum);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pageNum !== prevProps.pageNum) {
      this.handlePageChange(this.props.pageNum);
    }
  }

  handlePageChange = page => {
    let payload = {
      page: page,
      desc_length: 35
    }
    apiService.getAllProducts(payload)
      .then(res => {
        //disptach an action to load departments
        if(res.data.count > 0) this.props.getProducts(res.data); 
        else this.props.decrementState();   
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleHover = id => {
    // console.log(id)
  }

  render() {
    let { products } = this.props.products;
    for (let key in products) {
      if (key === 'rows') {
        var productsArray = products[key];
      }
    }
    return (
      <div>
        <div>
          <ProductCard products={productsArray} handleHover={this.handleHover} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: (products) => dispatch(getProductsAction(products))
});

const mapStateToProps = (state) => ({
  products: state.products
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItems);