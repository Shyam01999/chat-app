import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

function NewGroup() {
  const [group, setGroup] = useState("");
  const [members, setMembers] = useState(sampleUsers);
  console.log("members", members)
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectedMemberHandler = (id) => {
    setSelectedMembers((prev) =>
    (prev.includes(id)
        ? prev.filter((currentItem) => currentItem !== id)
        : [...prev, id])
    );
  };
  // console.log(selectedMembers, "selectedmembers");
  const submitHandler = () => {};

  const handleClose = () => {};

  return (
    <Dialog open onClose={handleClose}>
      <Stack p={{xs:"1rem"}} spacing={"2rem"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>New Group</DialogTitle>
        <TextField
          label="Group"
          type="text"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Typography variant="h6" color="initial">
          Members
        </Typography>
        <Stack>
          {members.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectedMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="outlined"
            color={"error"}
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default NewGroup;
