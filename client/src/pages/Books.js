import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""    
  };

  componentDidMount() {
    this.loadBooks();
  }

  // Loading books
  loadBooks = () => {
    // getBooks method
    API.getBooks()
      .then(res => 
        this.setState({ books: res.data, title: "", author: "", description: "", image: "" })
        )
      .catch(err => console.log(err));
  };

  // Deleting books
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Updating state when taking input
  handleInputChange = event => {
    const {name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Sending the book to the database if the required fields are entered
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      // saveBook method
      API.saveBook({
        title: this.state.title,
        description: this.state.description,
        author: this.state.author,
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron> 
              <h1>Books to Add</h1>
            </Jumbotron>
            <form>              
              <Input 
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title" 
                placeholder="Title" 
              />
              <Input 
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author" 
                placeholder="Author" 
              />
              <TextArea 
                value={this.state.discription}
                onChange={this.handleInputChange}
                name="synopsis" 
                placeholder="Synopsis" 
              />

              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books To Read</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
