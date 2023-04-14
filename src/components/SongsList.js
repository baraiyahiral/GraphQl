import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { getdata } from "../queries";

const SongsList = () => {
  const { data, loading } = useQuery(getdata);
  const [deleteSong] = useMutation(DeleteSong);

  const onDelete = (id) => {
    deleteSong({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: getdata }],
    });
  };

  return (
    <div>
      <ul>
        {data?.songs?.map((song) => {
          return (
            <div key={song.id}>
              {" "}
              <Link to={`/song?id=${song.id}`}>{song.title}</Link>
              <button onClick={() => onDelete(song.id)}>X</button>
            </div>
          );
        })}
        <li>
          <Link to={`/lyrics`}>Add New Song</Link>
        </li>
      </ul>
    </div>
  );
};

const DeleteSong = gql`
  mutation DeleteSong($id: String!) {
    deleteSong(id: $id) {
      title
      id
    }
  }
`;

export default SongsList;
