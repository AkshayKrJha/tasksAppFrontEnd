import { List, ListItem } from "@mui/material";
import Task from "./task";

export default function TaskList({
  tasks,
  setTasks,
}: {
  tasks: any;
  setTasks: any;
}) {
  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "100vh",
        flex: 1,
        bgcolor: "#00f",
        overflow: "auto",
      }}
    >
      {[...tasks].map(([id, v]: any) => {
        return (
          <ListItem key={id}>
            <Task
              id={id}
              description={v.description}
              dueDate={v.dueDate}
              setTasks={setTasks}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
