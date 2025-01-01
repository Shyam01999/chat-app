import React, { lazy, memo, Suspense, useEffect } from "react";
// import AppLayout from "../components/layout/AppLayout";
import {
  Grid,
  Tooltip,
  IconButton,
  Drawer,
  Backdrop,
  Stack,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { bgGradiant, matBlack } from "../constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { samplechats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";
import AvatarCard from "../components/shared/AvatarCard";
import {Link} from "../components/styles/StyledComponents"; 
// import ConfirmDeleteDialog from "../components/dialogs/ConfirmDeleteDialog";
// import AddMemberDialog from "../components/dialogs/AddMemberDialog";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const isAddMember = false;

function Group() {
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");
  console.log("chatid", chatId);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
    console.log("delete Group");
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const deleteHandler = () => {
    console.log("delete button click");
  };

  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

  const openAddMemberHandler = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

  const IconBtn = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton aria-label="" onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="Back">
        <IconButton
          onClick={navigateBack}
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={"1rem"}
        padding={"3rem"}
      >
        {isEdit ? (
          <>
            <TextField
              type="text"
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            />
            <IconButton aria-label="" onClick={updateGroupName}>
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton aria-label="" onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );

  const ButtonGroup = (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      spacing={"1rem"}
      p={{ xs: 0, sm: "1rem", md: "1rem 4rem" }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        sm={4}
        bgcolor={bgGradiant}
      >
        <GroupList myGroups={samplechats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        bgcolor={bgGradiant}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtn}

        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                xs: "0rem",
                sm: "1rem",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              bgcolor={"bisque"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* members */}
              {sampleUsers.map((item) => (
                <UserItem
                  user={item}
                  key={item._id}
                  isAdded
                  styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  handler={removeMeberHandler}
                />
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={openConfirmDeleteHandler}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
            text={"Are you sure you want to delete this group list ?"}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        Group list
      </Drawer>
    </Grid>
  );
}

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {return(
  <Stack
    width={w}
    sx={{
      backgroundImage: bgGradiant,
      height: "100vh",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((item) => {
        return (<GroupListItem
          group={item}
          chatId={chatId}
          key={item._id}
        ></GroupListItem>);
      })
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        {" "}
        No Groups
      </Typography>
    )}
  </Stack>
)};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id} = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId == _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;
