import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "./card.css";
const Cards = ({ header, value }) => {
  return (
    <div>
      <Card className="card" sx={{ width: 150, height: 100 }} key={"sample"}>
        <h3>{header}</h3>
        <h3>{value}</h3>
      </Card>
    </div>
  );
};

export default Cards;
