import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { gql, useMutation, useQuery } from "@apollo/client";
import { getUser } from "../queries";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [logIn] = useMutation(mutation);
  const { data } = useQuery(getUser);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  if (data?.user) {
    navigate("/dashboard")
  }

  return (
    <AuthForm
      submit={({ email, password }) => {
        logIn({
          variables: {
            email,
            password,
          },
          refetchQueries: [
            {
              query: getUser,
            },
          ],
        }).catch((err) => {
          let errors = err.graphQLErrors.map((error) => error.message);
          setErrors(errors);
        });
      }}
      errors={errors}
    />
  );
};

const mutation = gql`
  mutation Login($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
      email
    }
  }
`;

export default LoginForm;
