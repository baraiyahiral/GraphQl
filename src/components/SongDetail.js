import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { getSong } from "../queries";
import { useSearchParams, useNavigate } from "react-router-dom";

const SongDetail = () => {
  const [searchParams] = useSearchParams();
  const [lyric, setLyric] = useState("");
  const id = searchParams.get("id");
  const { data } = useQuery(getSong, { variables: { id } });
  let navigate = useNavigate();
  const [addLyricToSong] = useMutation(mutation);
  const [likeSong] = useMutation(likeMutation);

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      <h3>{data?.song?.title}</h3>
      <ul>
        {data?.song?.lyrics?.map((lyric) => (
          <li key={lyric.id}>
            {lyric.content}
            <button
              onClick={() => {
                likeSong({
                  variables: {
                    id: lyric.id,
                  },
                  optimisticResponse: {
                    __typename: "Mutation",
                    likeLyric: {
                      id: lyric.id,
                      __typename: "Lyrics",
                      likes: lyric.likes+1,
                    },
                  },
                });
              }}
            >
              Like
            </button>
            {lyric.likes}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addLyricToSong({
            variables: {
              songId: id,
              content: lyric,
            },
          }).then(() => setLyric(""));
        }}
      >
        <label>Lyrics</label>
        <input
          type="text"
          value={lyric}
          onChange={(e) => setLyric(e.target.value)}
        />
      </form>
    </div>
  );
};

const mutation = gql`
  mutation addLyric($songId: String!, $content: String!) {
    addLyricToSong(songId: $songId, content: $content) {
      title
      id
      lyrics {
        content
        id
      }
    }
  }
`;

const likeMutation = gql`
  mutation likeSong($id: String!) {
    likeLyric(id: $id) {
      content
      likes
      id
    }
  }
`;

export default SongDetail;
