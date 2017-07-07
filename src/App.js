import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ListBooks from './components/ListBooks'
import SearchBook from './components/SearchBook'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = { books: [], query: '' }

    this.searchBook = this.searchBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    console.log('THIS', this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook(book, shelf) {
    if (book.shelf !== shelf) { 
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf

        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])

        }))
      })
    }
  }

  searchBook(query, maxResults) {
    this.setState({query: query})

    if(query.trim() !== '') {
      BooksAPI.search(query, maxResults).then(books => this.setState({
        books: books
      }))
    } else {
      this.setState({
        books: []
      })
    }
  }

  // searchBook(query, maxResults) { console.log('query', query); console.log('maxResults', maxResults); }
  // updateBook(book, shelf) { console.log('book', book); console.log('shelf', shelf); }

  render() {
    return (
    <MuiThemeProvider>
      <div className="app">
         <Route exact path='/' render={() => (
            <ListBooks 
              books={this.state.books} 
              updateBook={this.updateBook}
            />
        )}/>
        <Route path='/search' render={() => (
          <SearchBook 
            books={this.state.books}
            searchBook={this.searchBook}
            updateBook={this.updateBook}
          />
        )}/>
      </div>
    </MuiThemeProvider>
    )
  }
}

export default BooksApp;
