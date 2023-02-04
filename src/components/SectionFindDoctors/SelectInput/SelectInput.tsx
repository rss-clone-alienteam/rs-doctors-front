import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

interface IProps {
  placeholder: string;
  options: string[];
}

export default function SelectInput({ placeholder, options }: IProps) {
  return (
    <Select
      placeholder={placeholder}
      indicator={<KeyboardArrowDown />}
      sx={{
        width: "43%",
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
    >
      {options.map((option, i) => (
        <Option key={i} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
}
