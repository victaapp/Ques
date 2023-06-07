
import React,{useState} from "react";

const TextTruncateToggle = ({ text, truncateLength }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncate = () => {
      setIsTruncated(!isTruncated);
    };

    const truncatedText = isTruncated ? text.slice(0, truncateLength) : text;

    return (
      <span onClick={toggleTruncate} className="text-dark">
        {truncatedText}
        {isTruncated && "..."}
      </span>
    );
  };

  export default TextTruncateToggle;