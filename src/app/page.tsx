"use client"
import Footer from "@components/Footer";
import Header from "@components/Header";
import Task from "@components/Task";
import TaskInput from "@components/TaskInput";

import { nanoid } from "nanoid";
import { useState } from "react";

export default function Home() {
  // Define the interface of task-item object
  interface TaskItem {
    id: string;
    title: string;
    completed: boolean;  }

  const [completedCount,setCountCom] = useState(0)
  const [addCount,setCountadd] = useState(0)

  // useState hook for an array of task-item objects
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  // Define the function with proper type
  const addTask = (newTaskTitle:string) => {
    const newTask = { id: nanoid(), title: newTaskTitle, completed: false };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setCountadd(addCount+1);
  };

  // Define the function with proper type 
  const deleteTask = (taskId :string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    setCountadd(addCount-1);
    if(completedCount>=1)setCountCom(completedCount-1);
  };

  // Define the function with proper type
  const toggleDoneTask = (taskId :string) => {
    //structuredClone will copy an array or an object "deeply"
    //So objects within an object will be copied too
    const newTasks = structuredClone(tasks);
    //search for a task based on condition
    let task : any = newTasks.find((x) => x.id === taskId);
    task.completed =! task.completed;
    setTasks(newTasks);
    if(task.completed) setCountCom(completedCount+1);
    else setCountCom(completedCount-1);
  };

  return (
    // Main container
    <div className="container mx-auto">
      {/* header section */}
      <Header />
      {/* tasks container */}
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        {/* Task summary */}
        <p className="text-center text-secondary fst-italic">
          All ({addCount}) Done ({completedCount})
        </p>
        {/* task input */}
        <TaskInput addTaskFunc={addTask} />

        {/* tasks mapping*/}
        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      {/* //footer section */}
      <Footer year="2024" fullName="Buratsakon Srikhaw" studentId="660612150" />
    </div>
  );
}
