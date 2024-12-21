"use client";
import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Task({
  id,
  description,
  dueDate,
  setTasks,
}: {
  id: any;
  description: any;
  dueDate: any;
  setTasks: any;
}) {
  const router = useRouter();
  const [token, setToken] = useState<any>();
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);
  async function deleteTask() {
    // call api to delete task
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const message = await res.json();
      console.log(message);
      if (message?.message === "Task deleted") {
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
      console.log("====Error while deleting====", error?.message);
    }
  }
  return (
    <Box sx={{ width: "70%", padding: "2%" }}>
      <Typography variant="h5" color="#fff">
        {dueDate}
      </Typography>
      <Typography variant="h6" color="#fff">
        {description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* <Button sx={{colo}} >Update</Button> */}
        <Button
          sx={{ color: "#fff" }}
          variant="outlined"
          startIcon={<Delete />}
          onClick={deleteTask}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
