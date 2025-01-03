import { Button } from "@mui/material";
import React from "react";

const ActionBar = ({ az, za, low, high }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="contained" onClick={az} color="error" style={{fontSize:"16px",}} >
          A-Z
        </Button>
        <Button variant="contained" onClick={za} color="error" style={{fontSize:"16px",}}>
          Z-A
        </Button>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="contained" onClick={low} color="error" style={{fontSize:"16px",}}>
          Low-To-High
        </Button>
        <Button variant="contained" onClick={high} color="error" style={{fontSize:"16px",}}>
          High-To-Low
        </Button>
      </div>
    </div>
  );
};

export default ActionBar;
