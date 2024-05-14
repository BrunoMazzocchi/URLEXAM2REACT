import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function MediaCard({ image }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // Retrieve token from cookie
      const cookies = document.cookie.split(";");
      let token = null;
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "authorization" && value) {
          token = value;
          break;
        }
      }

      // Check if token is available
      if (!token) {
        console.error("No token found in cookies");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/posts/delete/${image.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Include token in the header
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Post deleted successfully");
        navigate(0); // Reloads the current page
      } else {
        console.error("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image.image} title={image.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {image.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {image.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
