import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getUser } from "../queries";
import { Navigate } from "react-router-dom";

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    render() {
      if (!this.props.data?.user) {
        return <Navigate to="/" replace={true} />;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(getUser)(RequireAuth);
};
