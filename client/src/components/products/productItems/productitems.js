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
import ErrorModal from '../../modals/errorModal';
import { withRouter } from 'react-router';
import queryString from 'query-string';

class ProductItems extends Component {

  state = {
    currentBox: null,
    showModal: false,
    productDetail: "",
    selectSize: "",
    selectColor: "",
    attributesList: [],
    email: "",
    password: "",
    error: "",
    showLoginModal: "",
    product_id: "",
    showErrorModal: "",
    value:""
  }

  componentDidMount() {
    let { pageNum } = this.props;
    this.handlePageChange(pageNum);
    let cartID = localStorage.getItem("cart_id")
    if (!cartID) {
      //generate cart_id
      apiService.generateUniqueCartID()
      .then(res => {
        let { cart_id } = res.data;
        localStorage.setItem("cart_id", cart_id);
      });
    }
  }

  componentDidUpdate(prevProps) {
    let { PageStates } = prevProps;
    let { page, search } = PageStates;
    let prev = [page, search];
    if (this.props.pageNum !== prev[0]) {
      this.handlePageChange(this.props.pageNum,search);
    }
  }

  handlePageChange = (page, search) => {
    const currentParsed = queryString.parse(this.props.location.search);
    let { department,category } = currentParsed;
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
      else if (category) {
        let payload = {
          id: category,
          page: page,
          desc_length: 35
        }
        apiService.getProductsByCatID(payload)
          .then(res => {
            this.props.getProducts(res.data)
          })
      }
      else if (department) {
        let payload = {
          id: department,
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
          this.props.getProducts(res.data)
        });
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
    if(!(this.state.selectColor && this.state.selectSize)){
      return this.setState({showErrorModal: "Please select both attribute color and size!"});
    } 
    let token = localStorage.getItem("token");
    this.setState({ product_id: id });
    if (token) {
      let payload = {
        cart_id: localStorage.getItem("cart_id"),
        product_id: id,
        attributes: `${this.state.selectColor} ${this.state.selectSize}`,
        quantity: 1,
        token
      }
      apiService.addToCart(payload)
        .then(res => {
          this.props.addtocart(res.data.length);
          this.setState({selectColor: "", selectSize:""});
        })
        .catch(err => {
          if(err.response && (String(err.response.status) === '401' || String(err.response.status) === '403')) {
            this.setState({ showLoginModal: true })  
          } 
          else this.setState({ showErrorModal: "An error occured while adding product to cart!" });
        })
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
  closeError = () => {
    this.setState({ showErrorModal: false })
  }

  handleSelectColorChange = color => {
    this.setState({ selectColor: color })
  }

  handleSelectSizeChange = size => {
    this.setState({ selectSize: size })
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
              attributes: `${this.state.selectColor} ${this.state.selectSize}`,
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
        <ErrorModal error={this.state.showErrorModal} hide={this.closeError} />
        <LoginModal handleSubmit={this.handleSubmit} handleLoginChange={this.handleLoginChange} show={this.state.showLoginModal} hide={this.closeLogin} error={this.state.error} />
        <ProductDetailModal detail={this.state.productDetail} show={this.state.showModal} hide={this.close} />
        <div onMouseLeave={this.handleMouseLeave}>
          <ProductCard hoveredItem={currentBox} products={productsArray} handleHover={this.handleHover} handleAddToCart={this.handleAddToCart} handleInfoClick={this.handleInfoClick} handleSelectColorChange={this.handleSelectColorChange} handleSelectSizeChange={this.handleSelectSizeChange} getAttributes={this.getAttributes} attributesList={this.state.attributesList} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductItems));