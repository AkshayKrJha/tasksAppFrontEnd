"use client";

import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  // textinput, and submit button
  const router = useRouter();
  const [userName, setUserName] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  async function registerUser() {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      const message = await res.json();
      console.log(message);
      if (message?.message === "User registered") {
        router.replace("/login");
      } else if (message?.errorMessage) {
        alert(message?.errorMessage);
      }
    } catch (error: any) {
      alert(error?.message);
      console.error("====Error while registering====", error?.message);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100vw",
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
        label="userName"
        variant="outlined"
        sx={{ margin: "2%" }}
        value={userName}
        onChange={function (event) {
          setUserName(event.target.value);
        }}
      />
      <TextField
        label="password"
        variant="outlined"
        type="password"
        sx={{ margin: "2%" }}
        value={password}
        onChange={function (event) {
          setPassword(event.target.value);
        }}
      />
      <Button
        sx={{
          margin: "2%",
          padding: "1%",
        }}
        variant="contained"
        disabled={!userName || !password}
        onClick={async function () {
          // if all fine, go to login page
          await registerUser();
          //   router.push("/login");
        }}
      >
        Register
      </Button>
      <h6 style={{ fontSize: 20, padding: "2%" }}>
        Already have account?{" "}
        <Link
          style={{ borderBottomWidth: 2, borderBottomColor: "#00f" }}
          href="/login"
        >
          Login
        </Link>
      </h6>
      {/* <h1>Hello</h1> */}
    </Box>
  );
}
