import React from "react";
import { graphql } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";
import { flowRight as compose } from "lodash";

const { useState, useCallback } = React;

const AddBook = (props) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const displayAuthors = () => {
    let data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const handleChange = useCallback(
    (name) => ({ target: { value } }) => {
      switch (name) {
        case "name":
          setName(value);
          break;

        case "genre":
          setGenre(value);
          break;

        case "authorId":
          setAuthorId(value);
          break;

        default:
          break;
      }
    },
    []
  );

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      props.addBookMutation({
        variables: {
          name,
          genre,
          authorId,
        },
        refetchQueries: [{ query: getBooksQuery }],
      });
    },
    [name, genre, authorId, props]
  );

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={handleChange("name")} value={name} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={handleChange("genre")} value={genre} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={handleChange("authorId")} value={authorId}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
