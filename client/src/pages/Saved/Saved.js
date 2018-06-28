import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import SaveBtn from "../../components/SaveBtn";
import { List } from "../../components/List";
import { ListItem } from "../../components/List";

class Saved extends Component {
  state = {
    articles: {}
  };
  
  componentDidMount() {
    this.loadArticles()
  }

  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">

            {!this.state.articles.length ? (
              <h1>No Saved Articles</h1>
            ) : (
                <List>
                  {this.state.articles.map(article => (
                    <ListItem
                      key={article._id}
                      href={article.url}
                      title={article.title}
                      date={article.date}
                    >

                      <SaveBtn
                        buttonstyle={"btn btn-primary float-right"}
                        buttontext={"Delete"}
                        id={article._id}
                        onClick={() => this.deleteArticle(article._id)} />
                    </ListItem>
                  ))}
                </List>
              )}
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Go Back to Articles</Link>
          </Col>
        </Row>
      </Container>



    );
  }
}

export default Saved;
