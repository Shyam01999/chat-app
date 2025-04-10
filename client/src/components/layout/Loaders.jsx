import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

export const LayoutLoader = () => {
  return (
    <>
      <Grid container height={"calc(100vh - 4rem)"} spacing={2}>
        <Grid
          item
          sm={4}
          md={3}
          sx={{
            display: { xs: "none", sm: "block" },
            height: "100%",
          }}
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={6}
          sx={{
            height: "100%",
          }}
        >
          <Stack spacing={2}>
            {Array.from({ length: 10 }).map((_, index) => 
              (<Skeleton key={index} variant="rectangular" height={"5rem"} />)
            )}
          </Stack>
        </Grid>
        <Grid
          item
          md={4}
          lg={3}
          sx={{
            display: { xs: "none", md: "block" },
            height: "100%",
          }}
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>
      </Grid>
    </>
  );
};
