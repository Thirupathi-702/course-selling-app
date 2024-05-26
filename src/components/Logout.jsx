import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Logout(){
    const onpress=()=>{
        localStorage.removeItem("token")
        console.log(localStorage.getItem("token"))
        
    }
return(
    <Button onClick={onpress} href="/logout">Logout</Button>
    
)

}
export default Logout;