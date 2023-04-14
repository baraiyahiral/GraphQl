import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { getdata } from "../queries";

const AddSong = () => {
  const [title, setTitle] = useState("");
  const [addSong, { data }] = useMutation(mutation);
  let navigate = useNavigate();

  return (
    <div>
      <h3>Add a new song</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addSong({
            variables: { title },
            refetchQueries: [{ query: getdata }],
          }).then(() => {
            navigate("/");
          });
        }}
      >
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target?.value)}
        />
      </form>
    </div>
  );
};

const mutation = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      title
      id
    }
  }
`;

export default AddSong;
