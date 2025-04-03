import { useEffect, useState } from "react";
import { fetchComments } from "../utils/apiFunctions";
import CommentCard from "./CommentCard";
import CustomSpinner from "./CustomSpinner";

export default function CommentsComponent({ article_id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});

  console.log("Passed Article_id:", article_id);

  useEffect(() => {
    console.log("Running useEffect block");
    setError(false);
    setIsLoading(true);
    fetchComments(article_id)
      .then((commentsFromApi) => {
        console.log(commentsFromApi);
        setComments(commentsFromApi.comments);
      })
      .catch((error) => {
        console.error(
          `error fetching comments for article: ${article_id}`,
          error
        );
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("comments is set to: ", comments);
      });
  }, []);

  if (isLoading) {
    return <CustomSpinner message={"Loading Comments..."} />;
  }

  if (error) {
    return (
      <>
        <br />
        <p>Problem loading comments</p>
      </>
    );
  }

  return (
    <div>
      <h2 style={{ marginTop: "1rem", textAlign: "right" }}>
        {comments.length} Comments
      </h2>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} {...comment} />
      ))}
    </div>
  );
}
