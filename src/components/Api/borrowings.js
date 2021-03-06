import { gql } from "@apollo/client";

// Queries
export const BORROWING_USER_LIST_QUERY = gql`
  query ($page: Int) {
    usersBorrowings(page: $page) {
      id
      date
      user {
        username
      }
      book {
        id
        title
        author
        genre
        titleCz
        authorCz
        genreCz
        numberOfPages
        imageName
      }
    }
  }
`;

export const BORROWING_USER_LIST_COUNT_QUERY = gql`
  query {
    usersBorrowingsCount
  }
`;

export const BORROWING_LIST_QUERY = gql`
  query ($page: Int, $isFiltered: Boolean) {
    borrowings(page: $page, isFiltered: $isFiltered) {
      id
      book {
        title
        titleCz
      }
      user {
        username
      }
      dateBorrowed
      dateReturned
    }
  }
`;

export const BORROWING_LIST_COUNT_QUERY = gql`
  query {
    borrowingsCount
  }
`;

// Mutation
export const BORROWING_BORROW_BOOK_MUTATION = gql`
  mutation ($id: ID!) {
    borrowBook(id: $id) {
      borrowing {
        id
      }
    }
  }
`;

export const BORROWING_RETURN_BOOK_MUTATION = gql`
  mutation ($id: ID!) {
    returnBook(id: $id) {
      message
    }
  }
`;
