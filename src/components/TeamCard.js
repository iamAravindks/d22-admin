// import { Button } from "bootstrap";
import React, { useState } from "react";
import { Card, FormControl, InputGroup, Button } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const TeamCard = ({ name, score, id, loadDocs }) => {
  name = name.replace("_", " ");
  name = name.toUpperCase();

  const [formData, setFormData] = useState(0)
  
  const handleType = (e) =>
  {
    setFormData(e.target.value)
  }
  const updateScore = async (id, newScore) =>
  {
    newScore=parseInt(newScore)
    try {
      if(newScore<=0) throw new Error("Enter a proper value")
      const docRef = doc(db, "teams", id);

      await updateDoc(docRef, {
        score: score + newScore,
      });
      loadDocs();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Card className="text-center">
      <Card.Header className="">{name}</Card.Header>
      <Card.Body>
        <Card.Title>score</Card.Title>
        <Card.Text style={{fontSize:"3rem"}}>{score}</Card.Text>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter the score to update"
            aria-label="Score"
            aria-describedby="basic-addon1"
            value={formData}
            onChange={(e) => handleType(e)}
          />
        </InputGroup>
        <Button variant="primary" onClick={() => updateScore(id, formData)}>
          Update
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TeamCard;
