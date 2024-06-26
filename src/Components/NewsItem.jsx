import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date }) => {
  const truncateText = (text, maxLength) => {
    if (!text) {
      return "Not available";
    }

    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "");

    return words.length > maxLength
      ? `${words.slice(0, maxLength).join(" ")} ...`
      : words.join(" ");
  };

  return (
    <div className="my-3">
      <div className="card" style={{ width: "22rem", height: "35rem" }}>
        <img
          src={
            imageUrl ||
            "https://www.hindustantimes.com/ht-img/img/2024/06/17/1600x900/lockie_ferguson_1718643438460_1718643443961.jfif"
          } // Provide a placeholder image URL if imageUrl is missing
          className="card-img-top"
          alt="News"
          style={{ width: "100%", height: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{truncateText(title, 15)}</h5>
          <p className="card-text">{truncateText(description, 20)}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author || "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
