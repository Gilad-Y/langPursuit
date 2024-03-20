import "./redirecting.css";
import CircularProgress from '@mui/material/CircularProgress';
function Redirecting(): JSX.Element {
    return (
        <div className="redirecting" style={{marginTop:"100px"}}>
			<CircularProgress size={"100px"}/>
        </div>
    );
}

export default Redirecting;
