import React from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

const { useState, useCallback } = React;

const AddBook = (props) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const displayAuthors = () => {
    const { data } = props;
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
      console.log("name state: ", name);
      console.log("genre state: ", genre);
      console.log("authorId state: ", authorId);
    },
    [name, genre, authorId]
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

export default graphql(getAuthorsQuery)(AddBook);
