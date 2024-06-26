import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css"

function Signin() {

  return ( 
    <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "150px",alignItems: "center"}}>
      <SigninCard/>
      <Illustration/>
    </div>
  );
}

function SigninCard(){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return <div>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="initial">
          Welcome to Coursera, Sign in below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          sx={{
            width: 400,
            height: 200,
            padding: "20px",
            margin: "10px",
          }}
        >
          <TextField
            fullWidth={true}
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(password);
            }}
          />{" "}
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/admin/signin",{},
                {
                  headers: { username: email, password: password },
                }
              );
              const data = res.data;

              localStorage.setItem("token", data.token);
              window.location = "/courses"
            }}
          >
            Signin
          </Button>
        </Card>
      </div>

  </div>

}

export const Illustration = ()=>{
  return <div className="illustration">
    <img src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1696166206~exp=1696166806~hmac=d79ed4ed864e0ecc2babf71798222f1e06a4eb1b44f6a771c5cdd0bbd4245710" alt="Signup/Signin" style={{  width: "100%", maxWidth: "800px", mixBlendMode: "multiply" }}/>
  </div>
}

export default Signin;