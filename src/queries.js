import { gql } from "@apollo/client";

const getUser = gql`
  {
    user {
      email
      id
    }
  }
`;

const getdata = gql`
  {
    songs {
      id
      title
    }
  }
`;

const getSong = gql`
  query getSong($id: String!) {
    song(id: $id) {
      id
      title
      lyrics {
        content
        id
        likes
      }
    }
  }
`;

export { getdata, getSong, getUser };
