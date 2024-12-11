import { CircularProgress } from "@mui/material";

const loading = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <CircularProgress color="inherit" />
    </div>
  );
};

export default loading;
