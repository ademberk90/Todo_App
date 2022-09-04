import React from "react";
import { Modal, Form, Button} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
});

const UsernameModal = ({show, setUsername, setIsShowUsernameModal}) => {

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      localStorage.setItem("username", values.username);
      setUsername(values.username);
      setIsShowUsernameModal(false);
    },
  });

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Opps! You are not registered!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group md="6" controlId="validationFormik03">
            <Form.Control
              className="form-element"
              id="username"
              name="username"
              type="text"
              placeholder="Name"
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UsernameModal;
