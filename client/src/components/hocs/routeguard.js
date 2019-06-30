import React from 'react';  
import { connect } from 'react-redux';  

export default function (ComposedComponent) {  
  class Authenticate extends React.Component {

    componentDidMount() {
      const { isAuthenticated } = this.props;
      if (!isAuthenticated) {
        this.props.history.push("/shopmate/login");
      }
    }

    render() {
      return (
        <div>
          { this.props.isAuthenticated ? <ComposedComponent {...this.props} /> : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isUserLoggedIn
    };
  };
  return connect(mapStateToProps)(Authenticate);
}