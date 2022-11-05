import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Alert,
} from "reactstrap";
import axios from "axios";
import configJson from "../auth_config.json";
import { useAuth0 } from "@auth0/auth0-react";

const Email = () => {
  const [successMsg, setSuccessMsg] = useState(false);
  const [email, setEmail] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();
  const [validate, setValidate] = useState({
    emailState: "",
  });
  const validateEmail = (e) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    setValidate({ ...validate });
  };
  const saveEmailToMetadata = () => {
    const options = {
      method: "PATCH",
      url: `https://${configJson.domain}/api/v2/users/user_id`,
      headers: {
        authorization: `Bearer ${getAccessTokenSilently}`,
        "content-type": "application/json",
      },
      data: `{"user_metadata": {"email": ${email}`,
    };
    axios
      .request(options)
      .then(function (response) {
        setSuccessMsg(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const submitForm = (e) => {
    e.preventDefault();
    saveEmailToMetadata();
  };
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = configJson.domain;
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { user_metadata } = await metadataResponse.json();
        setEmail(user_metadata.email);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);
  return (
    <div className="nav-container">
      {successMsg && <Alert color="primary">Update email successfully!</Alert>}
      <Form onSubmit={submitForm}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            valid={validate.emailState === "has-success"}
            invalid={validate.emailState === "has-danger"}
            onChange={(e) => {
              validateEmail(e);
              setEmail(e.target.value);
            }}
          />
          <FormFeedback>Please input a correct email.</FormFeedback>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default Email;
