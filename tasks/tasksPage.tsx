import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import TaskFilter from "./taskFilter";
import TaskList from "./taskList";
import TaskForm from "./taskForm";
import { useRouter } from "next/navigation";

export default function Tasks() {
  const [tasks, setTasks] = useState<any>(new Map());
  const router = useRouter();
  const [token, setToken] = useState<any>();
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  // useEffect(() => {
  //   async function readAllTasks() {
  //     try {
  //       const res = await fetch(`http://localhost:5000/api/tasks/`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const message = await res.json();
  //       console.log(message);
  //       if (message?.message === "Tasks found") {
  //         const newTasks = message?.tasks;
  //         console.log("Tasks\t", newTasks);
  //         // update with newTasks
  //         setTasks(new Map(newTasks));
  //       } else if (
  //         message?.errorMessage === "User not authenticated" ||
  //         message?.errorMessage === "Incorrect Password"
  //       ) {
  //         router.replace("/login");
  //       } else if (message?.errorMessage === "User not registered") {
  //         router.replace("/register");
  //       } else if (message?.errorMessage) {
  //         alert(message?.errorMessage);
  //       }
  //     } catch (error: any) {
  //       alert(error?.message);
  //       console.log("====Error while reading task====", error?.message);
  //     }
  //   }
  //   readAllTasks();
  // }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        <TaskFilter setTasks={setTasks} taskSize={new Map([...tasks]).size} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", flex: 6 }}>
        <TaskList tasks={tasks} setTasks={setTasks} />
        <TaskForm setTasks={setTasks} />
      </Box>
      {/* left/top side filter*/}
      {/* middle tasklist*/}
      {/**
       * Each task has due date on top
       * task description in middle
       * update, delete button in bottom
       */}
      {/**
       * update button opens new modal,
       * appear similar to task, but with edit option for text, and duedate
       */}
      {/* right side option to add new task (floating button) */}
    </Box>
  );
}
