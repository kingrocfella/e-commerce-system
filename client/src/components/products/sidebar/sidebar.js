import React, { Component } from 'react';
import DepartmentsLinks from './DepartmentsLinks';
import CategoriesLinks from './CategoriesLinks';
import getAllDepartmentsAction from '../../../store/actions/getAllDepartmentsAction';
import getCategoriesAction from '../../../store/actions/getCategoriesAction';
import getProductsAction from '../../../store/actions/getProductsAction';
import { connect } from 'react-redux';
import apiService from '../../../services/apiroutes';

class SideBar extends Component {
  state = {
    showCategories: false,
    currentUrl: "",
    searchBox: "",
    deptID: "",
    catID: ""
  }

  handleClick = (id, url) => {
    this.props.handleDeptPage(id);
    this.setState({ deptID: id })
    let payload = {
      id,
      page: 1,
      desc_length: 35
    }
    Promise.all([
      apiService.getCategories(id),
      apiService.getProductsByDeptID(payload)
    ]).then(([resCat, resProd]) => {
      this.props.getProducts(resProd.data)
      this.props.getCategories(resCat.data.rows)
      this.setState({
        showCategories: true,
        currentUrl: url
      });
    })
      .catch(err => {
        console.log(err);
      });
  }

  handleCategoryClick = id => {
    this.props.handleCatPage(id);
    this.setState({ catID: id })
    let payload = {
      id,
      page: 1,
      desc_length: 35
    }
    apiService.getProductsByCatID(payload)
      .then(res => {
        this.props.getProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    apiService.getDepartments()
      .then(res => {
        this.props.getAllDepartments(res.data);
        let { deptID } = this.state;
        if (deptID) {
          apiService.getCategories(deptID)
            .then(res => {
              this.props.getCategories(res.data.rows)
              this.setState({
                showCategories: true
              });
            })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleState = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSearch = e => {
    if (e.key === 'Enter') {
      this.props.handleSearchTerm(this.state.searchBox);
      let payload = {
        page: 1,
        desc_length: 35,
        query_string: this.state.searchBox
      }
      apiService.searchProducts(payload)
        .then(res => {
          this.props.getProducts(res.data);
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  resetProducts = () => {
    let { deptID, catID, search } = this.state
    try {
      if (search) {
        let payload = {
          page: 1,
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
          page: 1,
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
          page: 1,
          desc_length: 35
        }
        Promise.all([
          apiService.getCategories(deptID),
          apiService.getProductsByDeptID(payload)
        ]).then(([resCat, resProd]) => {
          this.props.getProducts(resProd.data)
          this.props.getCategories(resCat.data.rows)
          this.setState({
            showCategories: true
          });
        })
      }
      else {
        this.props.history.push("/products")
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let { departments } = this.props.departments;
    let { categories } = this.props.categories;
    let ShowCategories = (this.state.showCategories) ?
      <div className="row">
        <div className="col s9 offset-s1">
          <h6 className="grey-text darken-1"><strong>Category</strong></h6>
          <div className="collection">
            <CategoriesLinks categories={categories} handleCategoryClick={this.handleCategoryClick} currentUrl={this.state.currentUrl} />
          </div>
        </div>
      </div> : null;

    return (
      <div className="card #fafafa grey lighten-5">
        <div className="row">
          <div className="col s9 offset-s1">
            <input type="text" placeholder="Search" id="searchBox" onKeyDown={this.handleSearch} onChange={this.handleState} onBlur={this.resetProducts} />
          </div>
        </div>
        <div className="row">
          <div className="col s9 offset-s1">
            <h6 className="grey-text darken-1"><strong>Department</strong></h6>
            <div className="navbar">
            </div>
            <div className="collection">
              <DepartmentsLinks departments={departments} handleClick={this.handleClick} />
            </div>
          </div>
        </div>
        {ShowCategories}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllDepartments: (departments) => dispatch(getAllDepartmentsAction(departments)),
  getCategories: (categories) => dispatch(getCategoriesAction(categories)),
  getProducts: (products) => dispatch(getProductsAction(products))
});

const mapStateToProps = (state) => ({
  departments: state.departments,
  categories: state.categories
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
