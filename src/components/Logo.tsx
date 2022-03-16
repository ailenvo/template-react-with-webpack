import { SxProps, Theme } from "@mui/material";
import ImageLogo from "./../assets/images/common/Logo.png";

type Props = {
  sx?: SxProps<Theme>;
};

export default function Logo({ sx }: Props) {
  return <img width={40} height={40} src={ImageLogo} alt="Logo" />;
}
