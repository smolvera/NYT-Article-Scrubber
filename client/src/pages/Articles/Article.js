import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import axios from 'axios';

const APIKEY = "5ac27dfb9b67450ea140efa81b7f9637";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?max=5&api-key=" +
  APIKEY + "&q=";


class Article extends Component {
  state = {
    articles:[],
    result:{},
    topic: "",
    startYear: "",
    endYear: "",
  };

  
  populateDatabase = id => {
    // console.log("I'm triggered ", id);
    let result = this.prepareArticle(id) 
    API.saveArticle (result)
    
  };

   
  prepareArticle = (id) => {
    console.log("Let me find article");
    let articlesArray = this.state.articles;
    for (let i = 0; i<articlesArray.length; i ++){
        if (id === articlesArray[i]._id) {
           let newArticle = {
              title:articlesArray[i].headline.main,
              date: articlesArray[i].pub_date,
              url:articlesArray[i].web_url,
              id:articlesArray[i]._id
           }
          return newArticle;
        }
      }
  }
  
  
  findArticles = query => {
    const queryURL = BASEURL + query;
    return axios.get(queryURL)
  }

 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

 
  handleFormSubmit = event => {
     event.preventDefault();
     const fullQuery = this.state.topic + "&begin_date=" + this.state.startYear + "0101&end_date="+   this.state.endYear + "0101";
     this.findArticles(fullQuery)
      .then(res => {
        this.setState({ articles: res.data.response.docs })
      })  
      .catch(err => console.log(err));
  };

  
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            {/* <Jumbotron>
              <h1>New York Times Article Scrubber</h1>
            </Jumbotron> */}
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year (required)"
              />
              
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12">
            {/* <Jumbotron>
              <h1>Results</h1>
            </Jumbotron> */}
            {!this.state.articles.length ? (
                   <h3>No Results to Display</h3>
                ) :(          
               <List>
                 {this.state.articles.map(article =>( 
                  
                  <ListItem 
                      key={article._id} 
                      href= {article.web_url}
                      title = {article.headline.main}  
                      date={article.pub_date}                  
                      >
                      
                    <SaveBtn 
                    buttonstyle={"btn btn-primary float-right"}
                    buttontext={"Save"}
                    id = {article._id}
                    onClick={() => this.populateDatabase(article._id)} />
                  </ListItem>
                 ))}
              </List>
            )} 
            <Link to={"/articles/"}>
              Click to see Saved Articles 
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Article;

