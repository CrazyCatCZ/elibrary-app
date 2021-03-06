import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  BOOK_NOT_BORROWED_BOOKS_QUERY,
  BOOK_NOT_BORROWED_BOOKS_COUNT_QUERY,
} from "../Api/books";

import { ShowCreateModalContext } from "../Contexts/ShowCreateModalContext";
import Book from "./Book";
import CreateBookModal from "./CreateBookModal";
import CustomPagination from "../Other/CustomPagination";
import "./Books.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Books = () => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { showCreateModal, setShowCreateModal } = useContext(
    ShowCreateModalContext
  );

  const [getBooks, { data: notBorrowedBooks, loading }] = useLazyQuery(
    BOOK_NOT_BORROWED_BOOKS_QUERY
  );
  const { data: notBorrowedBooksCount } = useQuery(
    BOOK_NOT_BORROWED_BOOKS_COUNT_QUERY
  );

  useEffect(() => {
    getBooks({
      variables: { page },
    });
  }, [page, getBooks]);

  return (
    <>
      <div className="books-container">
        {notBorrowedBooks && loading === false ? (
          <Grid container>
            {notBorrowedBooks.notBorrowedBooks.length !== 0 ? (
              <>
                {notBorrowedBooks.notBorrowedBooks.map(
                  ({
                    id,
                    title,
                    author,
                    genre,
                    titleCz,
                    authorCz,
                    genreCz,
                    numberOfPages,
                    imageName,
                  }) => {
                    return (
                      <Book
                        isBorrowed={false}
                        key={id}
                        id={id}
                        title={[title, titleCz]}
                        author={[author, authorCz]}
                        genre={[genre, genreCz]}
                        numberOfPages={numberOfPages}
                        imageName={imageName}
                      />
                    );
                  }
                )}
              </>
            ) : (
              <Typography className="text-container" variant="h2">
                {t("books.no_available_books")}
              </Typography>
            )}
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </div>
      {notBorrowedBooksCount ? (
        <CustomPagination
          count={notBorrowedBooksCount.notBorrowedBooksCount}
          pageSize={12}
          page={page}
          setPage={setPage}
        />
      ) : null}
      <CreateBookModal
        openModal={showCreateModal}
        closeModal={() => setShowCreateModal(false)}
      />
    </>
  );
};

export default Books;
