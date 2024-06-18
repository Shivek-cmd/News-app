import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: true, // Initial loading state set to true
    };
  }

  async componentDidMount() {
    try {
      let url =
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=e86ba16fd4464d8ea0dc0d25d4af5c44";
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({ articles: parsedData.articles, loading: false }); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false }); // Handle error by setting loading to false
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h1>NewsMonkey-Top Headlines</h1>

        {this.state.loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {this.state.articles.map((article, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
