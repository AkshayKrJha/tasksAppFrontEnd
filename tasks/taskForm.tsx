"use client";
import DatePick from "@/utilities/datePick";
import { Box, Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskForm({
  id,
  desc,
  due,
  setTasks,
}: {
  id?: any;
  desc?: any;
  due?: any;
  setTasks: any;
}) {
  const router = useRouter();
  const [description, setDescription] = useState<any>("");
  const [dueDate, setDueDate] = useState<any>(
    dayjs(new Date(new Date().toDateString()))
  );
  const [token, setToken] = useState<any>();
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);
  async function addTask() {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          dueDate: dueDate.format("DD MMM YYYY"),
        }),
      });
      const message = await res.json();
      console.log(message);
      if (message?.message === "Task added") {
        const newTasks = message?.tasks;
        // update with newTasks
        setTasks(newTasks);
      } else if (
        message?.errorMessage === "User not authenticated" ||
        message?.errorMessage === "Incorrect Password"
      ) {
        router.replace("/login");
      } else if (message?.errorMessage === "User not registered") {
        router.replace("/register");
      }
    } catch (error: any) {
      alert(error?.message);
      console.log("====Error while adding task====", error?.message);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "20vw",
        height: "100vh",
        // backgroundColor: "#ff0",
        padding: "1%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Box sx={{ display: "flex", flex: 1, backgroundColor: "#f00" }} />
      <Box sx={{ display: "flex", flex: 1, backgroundColor: "#0f0" }} /> */}
      <TextField
        label="description"
        variant="outlined"
        multiline
        sx={{ margin: "2%" }}
        value={description}
        onChange={function (event) {
          setDescription(event.target.value);
        }}
      />
      <DatePick dueDate={dueDate} setDueDate={setDueDate} />
      <Button
        sx={{
          margin: "2%",
          padding: "1%",
        }}
        variant="contained"
        disabled={!description || !dueDate}
        onClick={addTask}
      >
        Add
      </Button>
    </Box>
  );
}
