import React, { Component } from 'react';
import DepartmentsLinks from './DepartmentsLinks';
import CategoriesLinks from './CategoriesLinks';
import getAllDepartmentsAction from '../../../store/actions/getAllDepartmentsAction';
import getCategoriesAction from '../../../store/actions/getCategoriesAction';
import { connect } from 'react-redux';
import apiService from '../../../services/apiroutes';

class SideBar extends Component {
  state = {
    showCategories: false,
    currentUrl: ""
  }

  handleClick = (id,url) => {
    apiService.getCategories(id)
      .then(res => {
        this.props.getCategories(res.data.rows)
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
    console.log(id);
  }

  componentDidMount() {
    apiService.getDepartments()
      .then(res => {
        //disptach an action to load departments
        this.props.getAllDepartments(res.data);
      })
      .catch(err => {
        console.log(err);
      });
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
            <input type="text" placeholder="Search" id="searchBox" />
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
  getCategories: (categories) => dispatch(getCategoriesAction(categories))
});

const mapStateToProps = (state) => ({
  departments: state.departments,
  categories: state.categories
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
