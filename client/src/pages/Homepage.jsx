import React from "react";
import { Box, Typography, Stack, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";

const Homepage = () => {
  const navigate = useNavigate();

  const cardStyles = {
    boxShadow: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 15,
    height: 250,
    width: 250,
    transition: 'transform 0.3s ease-in-out',
    "&:hover": {
      transform: 'scale(1.05) rotate(-5deg)',
      cursor: "pointer",
    },
  };

  const iconStyles = {
    fontSize: 80,
    color: "#0d47a1",
    mt: 2,
    ml: 2,
    transition: 'transform 0.3s ease-in-out',
    "&:hover": {
      transform: 'scale(1.2)',
    },
  };

  const navigateTo = (route) => {
    navigate(route);
  };

  const renderCard = (title, icon, subtitle, route, color) => (
    <Box p={3} sx={{ margin: '10px' }}>
      <Typography variant="h4" mb={2} fontWeight="bold" color="#0d47a1" fontFamily="Arial, sans-serif">
        {title}
      </Typography>
      <Card onClick={() => navigateTo(route)} sx={{ ...cardStyles, bgcolor: color }}> 
        {React.cloneElement(icon, { sx: iconStyles })}
        <Stack p={3} pt={0} mt={2} sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
          <Typography fontWeight="bold" variant="h5" color="#0d47a1" fontFamily="Arial, sans-serif">
            {subtitle}
          </Typography>
          <Typography variant="h6" color="#0d47a1" fontFamily="Arial, sans-serif">
            {subtitle}
          </Typography>
        </Stack>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', bgcolor: '#ffffff', minHeight: '100vh', pt: 2 }}>
      {renderCard("Summary Generator", <DescriptionRounded />, "Text Summarizer", "/summary", '#c5cae9')}
      {renderCard("Paragraph Generation", <FormatAlignLeftOutlined />, "Paragraph Generator", "/paragraph", '#b2dfdb')}
      {renderCard("AI ChatBot", <ChatRounded />, "Chat with the bot", "/chatbot", '#ffcdd2')}
      {renderCard("Javascript Converter", <ChatRounded />, "Translate English to JS code", "/js-converter", '#ffcc80')}
      {renderCard("AI sci-fi Images", <ChatRounded />, "Generate Scifi images", "/scifi-image", '#ffe0b2')}
    </Box>
  );
};

export default Homepage;
