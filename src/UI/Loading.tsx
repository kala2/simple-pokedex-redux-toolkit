import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const Loading = ({ children }: any) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
    >
      <Box>
        <LinearProgress
          color="primary"
          sx={{ mt: 3, width: 300, backgroundColor: "rgb(211 211 211)" }}
        />
      </Box>
    </Box>
  );
};

export default Loading;