import React from "react";
import {Modal, Form, Button} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateTaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  content: Yup.string()
    .min(3, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
});

const CreateTask = ({ show, setIsShowCreateTaskModal, type, selectedTask, addTask, setSelectedTask, updateTask}) => {
  const formik = useFormik({
    initialValues: {
      title: selectedTask.title,
      content: selectedTask.content,
      isCompleted:  selectedTask.isCompleted,
    },
    validationSchema: CreateTaskSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if(type == 'create'){
        addTask(values);
        setIsShowCreateTaskModal(false);
      }
      else if(type == 'update'){
        updateTask(values, selectedTask.id);
        setIsShowCreateTaskModal(false);
      }
      resetForm();
    },
    enableReinitialize:true
  });

  const handleClose = () => {
    formik.resetForm({values:''});
    setIsShowCreateTaskModal(false);
    setSelectedTask({title:"",content:""})
  }
  return (
    <Modal show={show}  onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group md="6">
          <Form.Label>Title</Form.Label>
            <Form.Control
              className="form-element"
              id="title"
              name="title"
              type="text"
              placeholder="Add Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group md="6">
          <Form.Label>Content</Form.Label>
            <Form.Control
              className="form-element"
              id="content"
              name="content"
              as="textarea"
              placeholder="Add Content"
              value={formik.values.content}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.content}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.content}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group md="6">
          <Form.Label>Is Completed</Form.Label>
          <Form.Check
            className="chekbox"
            disabled={type == 'create'}
            type="checkbox"
            label=""
            id="isCompleted"
            name="isCompleted"
            value={formik.values.isCompleted}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.isCompleted}
          />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
              {formik.errors.isCompleted}
            </Form.Control.Feedback>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
          {type == 'create' ? "Add Task" : "Update Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTask;
