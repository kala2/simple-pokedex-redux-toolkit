import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      height: "calc(100vh - 72px)",
    },
    loaderBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 32px)",
    },
    dialog: {
      maxWidth: 800,
    },
    MuiDataGrid: {
      root: {
        "& .MuiDataGrid-row": {
          cursor: "pointer",
        },
      },
    },
  })
);
