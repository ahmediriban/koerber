import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Alert,
} from "reactstrap";
import PostCard from "./PostCard";
import axios from "axios";

type Post = {
  title: string;
  body: string;
};

type ValidateObj = {
  bodyState: string;
  titleState: string;
};

const Email = () => {
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [failedMsg, setFailedMsg] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [validate, setValidate] = useState<ValidateObj>({
    bodyState: "",
    titleState: "",
  });
  const getPosts = () => {
    const user_id = 1;
    const options = {
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/posts?userId=${user_id}`,
    };
    axios
      .request(options)
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const validateBody = (e) => {
    if (e.target.value?.length > 100) {
      validate.bodyState = "has-success";
    } else {
      validate.bodyState = "has-danger";
    }
    setValidate({ ...validate });
  };
  const validateTitle = (e) => {
    if (e.target.value?.length > 10) {
      validate.titleState = "has-success";
    } else {
      validate.titleState = "has-danger";
    }
    setValidate({ ...validate });
  };
  const submitForm = (e) => {
    e.preventDefault();
    const newPost = { title, body };
    const haveErrors = Object.keys(validate).find(
      (field) => validate[field] !== "has-success",
    );
    if (!haveErrors) {
      setFailedMsg(false);
      setSuccessMsg(true);
      setPosts([...posts, newPost]);
      setTitle("");
      setBody("");
      setValidate({
        bodyState: "",
        titleState: "",
      });
    } else {
      setFailedMsg(true);
      setSuccessMsg(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="nav-container">
      <h6 className="font-weight-bold">Posts</h6>
      <br />
      {successMsg && <Alert color="primary">Add post successfully!</Alert>}
      {failedMsg && <Alert color="danger">Please enter a valid post!</Alert>}
      <Form onSubmit={submitForm}>
        <FormGroup>
          <Label for="email">Title</Label>
          <Input
            type="text"
            name="post"
            id="email"
            value={title}
            valid={validate.titleState === "has-success"}
            invalid={validate.titleState === "has-danger"}
            onChange={(e) => {
              validateTitle(e);
              setTitle(e.target.value);
            }}
          />
          <FormFeedback>Please input at least 10 characters.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="email">Body</Label>
          <Input
            type="text"
            name="post"
            id="email"
            value={body}
            valid={validate.bodyState === "has-success"}
            invalid={validate.bodyState === "has-danger"}
            onChange={(e) => {
              validateBody(e);
              setBody(e.target.value);
            }}
          />
          <FormFeedback>Please input at least 100 characters.</FormFeedback>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      {posts.map((post: Post) => (
        <PostCard key={post.title} title={post.title} body={post.body} />
      ))}
    </div>
  );
};

export default Email;
