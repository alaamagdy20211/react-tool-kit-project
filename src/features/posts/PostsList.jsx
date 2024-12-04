import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost } from "./postsSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom"; 
import * as Yup from "yup";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .matches(/^[A-Za-z0-9\s]+$/, "Title must contain only letters and numbers")
      .required("Title is required"),
    body: Yup.string()
      .required("Body is required")
      .min(10, "Body must be at least 10 characters long"),
  });

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId)).then(() => {
      toast.success("Post deleted successfully");
    });
  };

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5>
                        <Link to={`/post/${post.id}`}>{post.id}</Link> - {post.title}
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="col-lg-4">
              <Formik
                initialValues={{ title: "", body: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  dispatch(addPost(values)).then(() => {
                    toast.success("Post added successfully");
                    resetForm();
                  });
                }}
              >
                {() => (
                  <Form className="add-post-form">
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Title"
                      />
                      <ErrorMessage
                        name="title"
                        component="p"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        as="textarea"
                        name="body"
                        className="form-control"
                        placeholder="Body"
                        rows="4"
                      />
                      <ErrorMessage
                        name="body"
                        component="p"
                        className="text-danger"
                      />
                    </div>
                    <button type="submit" className="btn btn-success">
                      <FontAwesomeIcon icon={faPlus} /> Add Post
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostsList;
