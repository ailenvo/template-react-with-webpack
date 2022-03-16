import { Helmet } from "react-helmet";
import { forwardRef } from "react";
// material
import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
  title: string;
};

const Page = forwardRef(({ children, title = "", ...other }: Props, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title} | Miko Admin</title>
    </Helmet>
    {children}
  </Box>
));

export default Page;
