import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import {
  BORROWING_USER_LIST_QUERY,
  BORROWING_LIST_COUNT_QUERY,
} from "../Api/borrowings";
import { LanguageContext } from "../Contexts/LanguageContext";
import CustomPagination from "../Other/CustomPagination";
import Book from "./Book";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const UserBooks = () => {
  const { languageSelected } = useContext(LanguageContext);
  let { data: usersBorrowings, loading } = useQuery(BORROWING_USER_LIST_QUERY);
  const { data: usersBorrowingsCount } = useQuery(BORROWING_LIST_COUNT_QUERY);

  return (
    <>
      <div className="books-container">
        {usersBorrowings && loading === false ? (
          <>
            <Grid container className="books-grid-container">
              {usersBorrowings.usersBorrowings.length !== 0 ? (
                <>
                  {usersBorrowings.usersBorrowings.map(
                    ({
                      book: {
                        id,
                        title,
                        author,
                        genre,
                        titleCz,
                        authorCz,
                        genreCz,
                        numberOfPages,
                        imageName,
                      },
                    }) => {
                      return (
                        <Book
                          isBorrowed={true}
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
                <>
                  <Typography className="text-container" variant="h2">
                    {languageSelected === "czech"
                      ? "Žádné vypůjčené knihy"
                      : "No borrowed books"}
                  </Typography>
                </>
              )}
            </Grid>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
      <CustomPagination count={usersBorrowingsCount} />
    </>
  );
};

export default UserBooks;
