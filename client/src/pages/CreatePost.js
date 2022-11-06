import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreatePost() {
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
    // username: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = yup.object().shape({
    title: yup.string().required("You must input Title!"),
    postText: yup.string().required(),
    // username: yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    // console.log(data);
    axios.post("http://localhost:3001/posts", data, { headers: {accessToken:localStorage.getItem('accessToken')}}).then((response) => {
      // console.log("IT WORKED");
      navigate("/");
    });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex.Title...)"
          />

          <label>Post:</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex.Post Text...)"
          />

          {/* <label>User Name:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex.John123...)"
          /> */}

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
