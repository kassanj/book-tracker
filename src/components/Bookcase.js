import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'
import Shelf from './Shelf'

class Bookcase extends Component {

  static propTypes = {
    book: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render() {

  	const { books, updateBook } = this.props
  	var shelves = [];
    var lastShelf = 'null';

    this.props.books.forEach(function(book) {
      if (book.shelf !== lastShelf) {
        shelves.push(book.shelf);
      }
      lastShelf = book.shelf;
    });


    const mappedShelves = shelves.map((shelf, i) => {
      const filteredBooks = books.filter((book, i) => {
        return book.shelf === shelf
      });
      return <Shelf key={i} shelf={shelf} filteredBooks={filteredBooks} updateBook={updateBook}  />
    })


    return (
      <div>{mappedShelves}</div>
    )
  }
}

export default Bookcase


