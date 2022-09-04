import React from "react";
import Card from "react-bootstrap/Card";
import { Edit, Trash, Check } from "tabler-icons-react";

const Task = ({ task, deleteTask, updateTaskHandleClick }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <div>
            {task.title} {task.isCompleted && <Check className="check-button" strokeWidth={2.5} size={35}/>}
          </div>
          <div>
            <Edit
              className="update-button"
              onClick={() => updateTaskHandleClick(task.id)}
            />
            <Trash
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            />
          </div>
        </Card.Title>
        <Card.Text>{task.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Task;
