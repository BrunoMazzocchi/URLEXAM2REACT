import React, { useEffect, useState } from "react";
import MediaCard from "./components/mediaCard";
import "./css/Home.css";
import ImageModel from "./models/imageModel";

function Home() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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

        const response = await fetch("http://localhost:3000/api/posts/image/", {
          headers: {
            "Content-Type": "application/json",
            // Include token in the header
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Use a Set to keep track of unique IDs and filter duplicates
          const uniqueIds = new Set();
          const uniqueData = data.filter((post) => {
            if (!uniqueIds.has(post.id.id)) {
              uniqueIds.add(post.id.id);
              return true;
            }
            return false;
          });

          // Update state with unique data
          const imageModels = uniqueData.map(
            (post) =>
              new ImageModel(
                post.id.id,
                post.id.title,
                post.id.content,
                post.id.image,
                post.id.description,
                post.id.userId,
                post.id.state,
                post.id.createdAt,
                post.id.lastUpdated
              )
          );

          setImageData(imageModels);
        } else {
          console.error("Failed to fetch image data");
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div className="container mt-5">
      <h1>Bienvenido a Mi Lienzo APP</h1>
      <p>
        Explora y da vida a tus ideas con nuestra plataforma para escribir
        lienzos en línea.
      </p>

      {/* Flex container for cards */}
      <div className="card-container">
        {imageData.map((image) => (
          <MediaCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default Home;
