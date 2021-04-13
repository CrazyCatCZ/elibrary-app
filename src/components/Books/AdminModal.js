import React, { useState, useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { set } from "js-cookie";

const PUBLIC_FOLDER = process.env.PUBLIC_URL;

const AdminModal = ({ author, genre, numberOfPages, imageName }) => {
  const { languageSelected } = useContext(LanguageContext);

  const [authorValue, setAuthorValue] = useState(author);
  const [genreValue, setGenreValue] = useState(genre);
  const [numberOfPagesValue, setNumberOfPagesValue] = useState(numberOfPages);

  return (
    <>
      <DialogContent className="modal-content" dividers>
        <div className="modal-left-side">
          <img
            src={`${PUBLIC_FOLDER}/static/images/${imageName}`}
            className="modal-image"
            alt=""
          />
        </div>
        <div className="modal-right-side">
          <Typography className="modal-description-item">
            <TextField
              value={authorValue}
              onChange={(e) => setAuthorValue(e.target.value)}
              label={languageSelected === "czech" ? "Autor" : "Author"}
            />
          </Typography>
          <Typography className="modal-description-item">
            <TextField
              value={genreValue}
              onChange={(e) => setGenreValue(e.target.value)}
              label={languageSelected === "czech" ? "Žánr" : "Genre"}
            />
          </Typography>
          <Typography className="modal-description-item">
            <TextField
              min="0"
              type="number"
              value={numberOfPagesValue}
              onChange={(e) => setNumberOfPagesValue(e.target.value)}
              label={
                languageSelected === "czech"
                  ? "Počet stránek"
                  : "Number of pages"
              }
            />
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button className="blue-button" color="primary" variant="contained">
          {languageSelected === "czech" ? "Upravit knihu" : "Edit Book"}
        </Button>
      </DialogActions>
    </>
  );
};

export default AdminModal;
