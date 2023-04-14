import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "@apollo/client/react/hoc";
// import { graphql } from "react-apollo";

class SongList extends Component {
  render() {
    return <div>Song List</div>;
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(
  query
  //this is how we can pass query options
  // {
  // options: (props) => {
  //   return { variables: { props.id } };
  // },
  // }
)(SongList);
