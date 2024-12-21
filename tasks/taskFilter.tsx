"use client";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskFilter({
  setTasks,
  taskSize,
}: {
  setTasks: any;
  taskSize: any;
}) {
  const router = useRouter();
  const [token, setToken] = useState<any>();
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);
  async function readAllTasks() {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const message = await res.json();
      console.log(message);
      if (message?.message === "Tasks found") {
        const newTasks = message?.tasks;
        console.log("Tasks\t", newTasks);
        // update with newTasks
        setTasks(new Map(newTasks));
      } else if (
        message?.errorMessage === "User not authenticated" ||
        message?.errorMessage === "Incorrect Password"
      ) {
        router.replace("/login");
      } else if (message?.errorMessage === "User not registered") {
        router.replace("/register");
      } else if (message?.errorMessage) {
        alert(message?.errorMessage);
      }
    } catch (error: any) {
      alert(error?.message);
      console.log("====Error while reading task====", error?.message);
    }
  }
  async function readFilteredTasks(status: any) {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/filter?status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const message = await res.json();
      console.log(message);
      if (message?.message === "Filtered tasks found") {
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
      } else if (message?.errorMessage) {
        alert(message?.errorMessage);
      }
    } catch (error: any) {
      alert(error?.message);
      console.log("====Error while filtering task====", error?.message);
    }
  }
  return (
    <>
      {/* 3 buttons Overdue, Today, All */}
      <Typography variant="h5">{taskSize} tasks</Typography>
      <Button variant="contained" onClick={readAllTasks}>
        Load all tasks
      </Button>
      <Button
        variant="contained"
        onClick={async () => {
          await readFilteredTasks("overdue");
        }}
      >
        Overdue
      </Button>
      <Button
        variant="contained"
        onClick={async () => {
          await readFilteredTasks("today");
        }}
      >
        Today
      </Button>
    </>
  );
}
