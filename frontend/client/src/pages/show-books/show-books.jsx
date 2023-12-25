import React, { useEffect, useState } from 'react';
import List from 'devextreme-react/list';
import CrudFacade from '../../api/rest-api';
import './show-books.scss';

function ShowBooksPage() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    CrudFacade().getAllBooks((aBooks) => {
      setBooks(aBooks);
    });
  }, []);

  const handleBooksChanged = (aBooks) => {
    setBooks(aBooks);
  }

  const renderItem = (book) => {
    return (<div>
      {book.title}
    </div>)
  }

  return (
    <>
      <List
        dataSource={books}
        itemRender={renderItem}
      />
    </>
  );
};

export default ShowBooksPage;
