import React from "react";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";

type Post = {
  title: string;
  body: string;
};

const PostCard = (props: Post) => {
  const { title, body } = props;
  return (
    <Card className="my-2" color="primary" outline>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <CardText>{body}</CardText>
      </CardBody>
    </Card>
  );
};

export default PostCard;
