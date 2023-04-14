import React from "react";
import { getUser } from "../queries";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Header = () => {
  const { data } = useQuery(getUser);
  const [logOut] = useMutation(mutation, {
    refetchQueries: [getUser],
  });
//   const navigate = useNavigate();

  return (
    <div className="d-flex text-center border-bottom justify-content-end p-2 bg-light">
      {data?.user ? (
        <button
          className="btn btn-primary text-uppercase"
          onClick={() => {
            logOut();
          }}
        >
          Logout
        </button>
      ) : (
        <div className="d-flex">
          <Link className="btn  navlink" to="/signup">
            Sign Up
          </Link>
          <Link className="btn  navlink" to="/login">
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

const mutation = gql`
  mutation {
    logOut {
      email
    }
  }
`;

export default Header;
