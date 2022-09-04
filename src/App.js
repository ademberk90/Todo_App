import { useState, useEffect, createContext } from "react";
import "./App.css";
import {Row, Col, Button, Spinner, Container} from "react-bootstrap";
import Task from "././components/Task.js";
import UsernameModal from "./components/UsernameModal.js";
import Paging from "./components/Paging";
import CreateTask from "./components/CreateTask";
import { MoonStars, Sun, PencilPlus } from "tabler-icons-react";
import ToastMessage from "./components/ToastMessage";

const baseURL =  process.env.REACT_APP_MOCKAPI_URL;

function App() {
  const [username, setUsername] = useState("");
  const [isShowUsernameModal, setIsShowUsernameModal] = useState(false);
  const [isShowCreateTaskModal, setIsShowCreateTaskModal] = useState(false);
  const [isShowToast, setIsShowToast] = useState(false);
  const [isShowSpinner, setIsShowSpinner] = useState(true);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [selectedTask, setSelectedTask] = useState({
    title: "",
    content: "",
    isCompleted: false
  });
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [type, setType] = useState("");
  const [theme, setTheme] = useState("");

  const getUserNameAndTheme = () => {
    let username = localStorage.getItem("username");
    if (username) {
      setUsername(username);
    } else {
      setIsShowUsernameModal(true);
    }

    let theme = localStorage.getItem("theme");
    if(theme){
      setTheme(theme);
      document.body.id = theme;
    }
    else{
      setTheme("light");
      document.body.id = "light";
    }
  };

  async function getAllData() {
    try {
      setIsShowSpinner(true);
      const res = await fetch(
        baseURL
      );
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        setIsShowToast(true);
        setToastMessage("Error! " + message);
        setToastType("error");
        throw new Error(message);
      }
      const data = await res.json();
      if (data) {
        console.log(data.length);
        setAllTasks(data);
        setTasks(data.slice(0, 10));
        setTotalPage(Math.ceil(data.length / 10));
      }
      setIsShowSpinner(false);
    } catch (err) {
      setIsShowSpinner(false);
      throw new Error(err);
    }
  }

  async function deleteTask(id) {
    if (id) {
      try {
        setIsShowSpinner(true);
        const res = await fetch(
          baseURL+id,
          { method: "delete" }
        );
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          setIsShowToast(true);
          setToastMessage("Error! " + message);
          setToastType("error");
          throw new Error(message);
        }
        const data = await res.json();
        setIsShowToast(true);
        setToastMessage("Task is deleted successfully.");
        setToastType("success");
        getAllData();
        setIsShowSpinner(false);
      } catch (err) {
        setIsShowSpinner(false);
        throw new Error(err);
      }
    }
  }

  async function addTask(task) {
    try {
      setIsShowSpinner(true);
      const res = await fetch(
        baseURL,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(task),
        }
      );
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        setIsShowToast(true);
        setToastMessage("Error! " + message);
        setToastType("error");
        throw new Error(message);
      }
      const data = await res.json();
      setIsShowToast(true);
      setToastMessage("Task is added successfully.");
      setToastType("success");
      getAllData();
      setIsShowSpinner(false);
    } catch (err) {
      setIsShowSpinner(false);
      throw new Error(err);
    }
  }

  async function updateTask(task, id) {
    if (task) {
      setIsShowSpinner(true);
      try {
        const res = await fetch(
          baseURL + id,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": "token-value",
            },
            body: JSON.stringify(task),
          }
        );
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          setIsShowToast(true);
          setToastMessage("Error! " + message);
          setToastType("error");
          throw new Error(message);
        }
        const data = await res.json();
        setIsShowToast(true);
        setToastMessage("Task is updated successfully.");
        setToastType("success");
        getAllData();
        setIsShowSpinner(false);
      } catch (err) {
        setIsShowSpinner(false);
        throw new Error(err);
      }
    }
  }

  const pageChange = (i) => {
    if ((i < 0 && currentPage != 1) || (i > 0 && currentPage != totalPage)) {
      setCurrentPage(currentPage + i);
    }

  };

  const addTaskHandleClick = () => {
    setType("create");
    setIsShowCreateTaskModal(true);
  };

  const updateTaskHandleClick = (id) => {
    setType("update");
    let task = allTasks.find((item) => item.id == id);
    setIsShowCreateTaskModal(true);
    setSelectedTask(task);
  };

  const toggleTheme = () => {
    var currentTheme = theme == "light" ? "dark" : "light"
    setTheme(currentTheme);
    document.body.id = currentTheme;
    localStorage.setItem("theme",currentTheme);
  }

  useEffect(() => {
    getUserNameAndTheme();
    getAllData();
  }, []);

  useEffect(() => {
    setTasks(allTasks.slice((currentPage - 1) * 10, currentPage * 10));
  }, [currentPage]);

  return (
    
      <Container>
        {isShowSpinner && (
          <Row className="spinner-row">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Row>
        )}

        <Row>
          <Col className="header">
            <h1>{username}'s Tasks</h1>
            {theme == "light" && <MoonStars className="theme-button" onClick={() => toggleTheme()}/>}
            {theme == "dark" && <Sun className="theme-button" onClick={() => toggleTheme()}/>}
          </Col>
        </Row>
        <Row className="new-task-row">
          <Button variant="primary" onClick={() => addTaskHandleClick()}>
            <PencilPlus />
            <label>New Task</label>
          </Button>
        </Row>
        <Row>
          {tasks.map((task, index) => {
            return (
              <Task
                task={task}
                deleteTask={deleteTask}
                updateTaskHandleClick={updateTaskHandleClick}
              ></Task>
            );
          })}
        </Row>
        <Row className="paging-row">
          <Paging
            totalPage={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageChange={pageChange}
          />
        </Row>

        <UsernameModal
          show={isShowUsernameModal}
          setUsername={setUsername}
          setIsShowUsernameModal={setIsShowUsernameModal}
        />
        <CreateTask
          show={isShowCreateTaskModal}
          setIsShowCreateTaskModal={setIsShowCreateTaskModal}
          type={type}
          addTask={addTask}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          updateTask={updateTask}
        />

        <ToastMessage
          isShowToast={isShowToast}
          toastType={toastType}
          toastMessage={toastMessage}
          setIsShowToast={setIsShowToast}
        />
      </Container>
    
  );
}

export default App;
