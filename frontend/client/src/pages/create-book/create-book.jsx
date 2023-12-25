import React, { useEffect, useState } from 'react';
import Form from 'devextreme-react/form';
import Button from 'devextreme-react/button';
import './create-book.scss';
import CrudFacade from '../../api/rest-api';

const aNotVisibleFields = [
  'uuid',
  'password',
];
const aDisabledFields = ['id', 'username', 'type'];

function CreateBookPage() {

  const [book, setBook] = useState({
    title: "",
    isbn: "",
    publishingDate: null,
    type: "",
    authors: "",
  });



  async function handleCreate() {
    const oObj = { ...book };
    oObj.publishingDate = new Date();
    oObj.authors = [{
      firstName: book.authors.split(',')[0],
      lastName: book.authors.split(',')[1],
    }]

    await CrudFacade().postBook(oObj);
    setBook({
      title: "",
      isbn: "",
      publishingDate: null,
      type: "",
      authors: "",
    });
  }

  return (
    <>
      <h2 className="content-block">Profile</h2>

      <div className="content-block dx-card responsive-paddings">
        <Form
          id="form"
          formData={book}
          labelLocation="top"
          colCountByScreen={colCountByScreen}
        />
        <Button text="create" onClick={handleCreate}></Button>
      </div>
    </>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
};

export default CreateBookPage;
