import { gql } from '@apollo/client'

export const QUERY = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
    allBooks {
      title
      author
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
        author
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
            bookCount
        }
    }
`