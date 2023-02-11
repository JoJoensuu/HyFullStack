import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      authorsBookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
        authorsBookCount
      }
      genres
      published
    }
  }
`

export const CREATE_BOOK = gql`
    mutation CreateBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        author {
          name
          born
          authorsBookCount
        }
        published
        genres
    }
    }
`
export const EDIT_AUTHOR_BORN = gql`
    mutation editBorn($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
            id
            authorsBookCount
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        value
      }
    }
`