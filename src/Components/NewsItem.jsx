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
      ? `${words.slice(0, maxLength).join(" ")}...`
      : words.join(" ");
  };

  return (
    <div className="my-4">
      <div className="card bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
        <img
          src={
            imageUrl ||
            "https://www.hindustantimes.com/ht-img/img/2024/06/17/1600x900/lockie_ferguson_1718643438460_1718643443961.jfif"
          } // Placeholder image URL if imageUrl is missing
          className="card-img-top object-cover w-full h-48"
          alt="News"
        />
        <div className="card-body p-4">
          <h5 className="text-xl font-semibold mb-2">
            {truncateText(title, 15)}
          </h5>
          <p className="text-gray-700 mb-4">{truncateText(description, 20)}</p>
          <p className="text-sm text-gray-500 mb-4">
            <small>
              By {author || "Unknown"} on {new Date(date).toLocaleDateString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
