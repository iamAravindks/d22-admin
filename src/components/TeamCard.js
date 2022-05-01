// import { Button } from "bootstrap";
import React, { useState } from "react";
import { Card, FormControl, InputGroup, Button } from "react-bootstrap";
import { useFireBase } from "../context/FireContext";

const TeamCard = ({ name, score, id, loadDocs }) => {
  name = name.replace("_", " ");
  name = name.toUpperCase();

  const [formData, setFormData] = useState("")
  const {updateScore}=useFireBase()
  
  const handleType = (e) =>
  {
    setFormData(e.target.value)
  }

  return (
    <Card className="text-center">
      <Card.Header className="">{name}</Card.Header>
      <Card.Body>
        <Card.Title>score</Card.Title>
        <Card.Text style={{ fontSize: "3rem" }}>{score}</Card.Text>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Add</InputGroup.Text>
          <FormControl
            placeholder="Enter the score to update"
            aria-label="Score"
            aria-describedby="basic-addon1"
            value={formData}
            onChange={(e) => handleType(e)}
          />
        </InputGroup>
        <Button variant="primary" onClick={() => updateScore(id,score, formData)}>
          Update
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TeamCard;
