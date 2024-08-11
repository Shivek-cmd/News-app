import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country, pageSize, category, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const apiKey = "e86ba16fd4464d8ea0dc0d25d4af5c44";

  useEffect(() => {
    updateNews();
  }, []);

  const updateNews = async () => {
    setProgress(10);

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}`;

      setLoading(true);
      let data = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
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
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${
        page + 1
      }&pageSize=${pageSize}`;

      let data = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
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
    <div className="container mx-auto my-6 px-4 md:px-8">
      <h1 className="text-4xl font-bold text-center mb-10 my-24 text-gray-800">
        NewsMonkey - Top Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              className="bg-white rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              key={index}
            >
              <NewsItem
                title={article.title}
                description={article.description}
                imageUrl={article.urlToImage}
                newsUrl={article.url}
                author={article.author || "Unknown"}
                date={article.publishedAt}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
