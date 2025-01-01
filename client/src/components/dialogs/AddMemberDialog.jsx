import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import UserItem from "../shared/UserItem";

function AddMemberDialog({ addMember, isLoadingAddMember, chatId }) {
  const [member, setMember] = useState(sampleUsers);
  const [selectedMember, setSelectedMember] = useState([]);

  const selectedMemberHandler = (id) => {
    setSelectedMember((prev) =>
      prev.includes(id)
        ? prev.filter((currentItem) => currentItem.id !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    setSelectedMember([]);
    setMember([]);
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
  };
  return (
    <Dialog open={open} onClose={closeHandler}>
      <Stack p={"2rem"} spacing={"2rem"} width={"20rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {member.length > 0 ? (
            member.map((item) => (
              <UserItem
                key={item._id}
                user={item}
                handler={selectedMemberHandler}
                isAdded={selectedMember.includes(item._id)}
              />
            ))
          ) : (
            <Typography>No Friend Found</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={addMember}
            disabled={isLoadingAddMember}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default AddMemberDialog;
