import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const { country, pageSize, category, setProgress } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const apiKey = "e86ba16fd4464d8ea0dc0d25d4af5c44";

  useEffect(() => {
    updateNews(); //eslint-disable-next-line
  }, []);

  const updateNews = async () => {
    setProgress(10);

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

      setLoading(true);
      let data = await fetch(url);
      setProgress(30);
      let parsedData = await data.json();
      setProgress(70);

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }

    setProgress(100);
  };

  const fetchMoreData = async () => {
    setPage(page + 1);

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${
        page + 1
      }&pageSize=${pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();

      setArticles([...articles, ...(parsedData.articles || [])]);
      setTotalResults(parsedData.totalResults || totalResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching more data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container my-3">
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsMonkey-Top Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
