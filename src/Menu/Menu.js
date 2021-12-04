import { Stack } from "@mui/material";

export default function Menu(props) {
  return (
    <div>
      <Stack spacing={2}>{props.children} </Stack>
    </div>
  );
}
