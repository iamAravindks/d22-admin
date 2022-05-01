/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import TeamCard from "./TeamCard";
import "../App.css";
import Loader from "./Loader";
import { Button } from "react-bootstrap";
import { useFireBase } from "../context/FireContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const {loadDocs,loading,logOut,data} = useFireBase()
  const history = useNavigate()
  const handleClick = () =>
  {
    logOut()
    history('/login')
  }
  
  useEffect(() => {


    loadDocs();
  }, []);

  if (loading) return <Loader/>;
  return (
    <>
        <Button variant="danger" style={{margin:"25px"}} onClick={handleClick}>Logout</Button>
      <div className="dashboard-container">
        {data.length > 0 &&
          data.map((d, index) => (
            <TeamCard
              name={d.name}
              score={d.score}
              key={index}
              id={d.id}
              loadDocs={loadDocs}
            />
          ))}
      </div>
    </>
  );
};

export default Dashboard;
