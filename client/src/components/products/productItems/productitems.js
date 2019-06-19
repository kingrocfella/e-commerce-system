import React, { Component } from 'react';
import ProductCard from './productCard';
import { connect } from 'react-redux';
import apiService from '../../../services/apiroutes';
import getProductsAction from '../../../store/actions/getProductsAction';
import getCategoriesAction from '../../../store/actions/getCategoriesAction';
import authAction from '../../../store/actions/authAction';
import addtocartAction from '../../../store/actions/addtocartAction';
import ProductDetailModal from '../../modals/productDetailModal';
import LoginModal from '../../modals/loginModal';

class ProductItems extends Component {

  state = {
    currentBox: null,
    showModal: false,
    productDetail: "",
    selectValue: "",
    selectName: "",
    attributesList: [],
    email: "",
    password: "",
    error: "",
    showLoginModal: "",
    product_id: ""
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
      this.handlePageChange(this.props.pageNum, deptID, catID, search, prev);
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
    let token = localStorage.getItem("token");
    this.setState({ product_id: id });
    if (token) {
      let payload = {
        cart_id: localStorage.getItem("cart_id"),
        product_id: id,
        attributes: `${this.state.selectName} ${this.state.selectValue}`,
        quantity: 1,
        token
      }
      apiService.addToCart(payload)
        .then(res => {
          this.props.addtocart(res.data.length);
        })
        .catch(err => {

        });
    } else {
      this.setState({ showLoginModal: true })
    }

  }

  handleInfoClick = id => {
    apiService.getProductDetails(id)
      .then(res => {
        this.setState({ setModalId: id, productDetail: res.data }, () => {
          this.setState({ showModal: true })
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  close = () => {
    this.setState({ showModal: false })
  }
  closeLogin = () => {
    this.setState({ showLoginModal: false })
  }

  handleSelectNameChange = name => {
    this.setState({ selectName: name })
  }

  handleSelectValueChange = value => {
    this.setState({ selectValue: value })
  }

  getAttributes = id => {
    apiService.getAttributesByProductID(id)
      .then(res => {
        this.setState({ attributesList: res.data })
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      email: this.state.email,
      password: this.state.password
    }
    apiService.login(payload)
      .then(res => {
        let authData = {
          name: res.data.customer.schema.name,
          email: res.data.customer.schema.email,
          customer_id: res.data.customer.schema.customer_id,
          token: res.data.accessToken
        }
        //push auth details into redux store
        this.props.setAuthData(authData);

        //generate cart_id
        apiService.generateUniqueCartID()
          .then(res => {
            let { cart_id } = res.data;
            localStorage.setItem("cart_id", cart_id);
            let payload = {
              cart_id: localStorage.getItem("cart_id"),
              product_id: this.state.product_id,
              attributes: `${this.state.selectName} ${this.state.selectValue}`,
              quantity: 1,
              token: localStorage.getItem("token")
            }
            apiService.addToCart(payload)
              .then(res => {
                this.props.addtocart(res.data.length);
                this.closeLogin();
              });
          })
      })
      .catch(err => {
        this.setState({
          error: err.response && err.response.data.error.message
        })
        console.log(err);
      });
  }

  handleLoginChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
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
        <LoginModal handleSubmit={this.handleSubmit} handleLoginChange={this.handleLoginChange} show={this.state.showLoginModal} hide={this.closeLogin} error={this.state.error} />
        <ProductDetailModal detail={this.state.productDetail} show={this.state.showModal} hide={this.close} />
        <div onMouseLeave={this.handleMouseLeave}>
          <ProductCard hoveredItem={currentBox} products={productsArray} handleHover={this.handleHover} handleAddToCart={this.handleAddToCart} handleInfoClick={this.handleInfoClick} handleSelectNameChange={this.handleSelectNameChange} handleSelectValueChange={this.handleSelectValueChange} getAttributes={this.getAttributes} attributesList={this.state.attributesList} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: (products) => dispatch(getProductsAction(products)),
  getCategories: (categories) => dispatch(getCategoriesAction(categories)),
  addtocart: (product_id) => dispatch(addtocartAction(product_id)),
  setAuthData: (authData) => dispatch(authAction(authData))
});

const mapStateToProps = (state) => ({
  products: state.products
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItems);