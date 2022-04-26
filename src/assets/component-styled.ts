import { styled as muiStyled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const BootstrapInput = muiStyled(InputBase)(({ theme }: any) => ({
    "label + &": {
        marginTop: theme.spacing(2),
    },
    "& .MuiInputBase-input": {
        display: "flex",
        alignItems: "center",
        borderRadius: 4,
        position: "relative",
        backgroundColor: "white",
        border: "1px solid #ced4da",
        height: "23px",
        fontSize: 14,
        padding: "10px 26px 10px 12px",
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            backgroundColor: "white",
        },
    },
}));
