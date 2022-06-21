import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Custom500() {
  return (
    <div
      style={{
        display: "grid",
        position: "relative",
        placeContent: "center",
        top: "20vw",
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            ERROR
          </Typography>
          <Typography variant="body2">
            We detect an error, please go home page.
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => (window.location.href = "/")} size="small">
            Go Home Page
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
