import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Divider,
  Grid,
} from "@mui/material";

const fakeStocks = [
  { name: "Stock A", price: 100 },
  { name: "Stock B", price: 150 },
  { name: "Stock C", price: 75 },
  { name: "Stock D", price: 200 },
];

function App() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleBuyStock = () => {
    if (!selectedStock) return;
    setInvestments((prev) => [...prev, selectedStock]);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        InvestTest
      </Typography>
      <Grid container spacing={2}>
        {/* Left Sidebar - Stocks */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Stocks
          </Typography>
          <TextField
            fullWidth
            label="Search Stocks"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            margin="normal"
          />
          <List>
            {fakeStocks
              .filter((stock) =>
                stock.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((stock, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => setSelectedStock(stock)}
                  selected={selectedStock?.name === stock.name}
                  style={{
                    border: "1px solid #ddd",
                    marginBottom: "0.5rem",
                    borderRadius: "5px",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1">{stock.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ${stock.price.toFixed(2)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
          </List>
        </Grid>

        {/* Middle Section - Selected Stock */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Selected Stock
          </Typography>
          {selectedStock ? (
            <Card>
              <CardContent>
                <Typography variant="h6">{selectedStock.name}</Typography>
                <Typography variant="body1">
                  Current Price: ${selectedStock.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  This is a sample stock description. Invest wisely!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "1rem" }}
                  onClick={handleBuyStock}
                >
                  Buy Stock
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Select a stock to view details.
            </Typography>
          )}
        </Grid>

        {/* Right Sidebar - Leaderboard */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Leaderboard
          </Typography>
          <List>
            {["Alice", "Bob", "Charlie", "Dave"].map((user, index) => (
              <ListItem key={index}>
                {index + 1}. {user}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      {/* Bottom Section - Dashboard */}
      <Divider style={{ margin: "2rem 0" }} />
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Box>
        <Typography variant="subtitle1">
          Current Profit:{" "}
          <span style={{ color: "green" }}>
            ${investments.reduce((total, stock) => total + stock.price, 0)}
          </span>
        </Typography>
        <Typography variant="subtitle2">Your Investments:</Typography>
        <List>
          {investments.map((investment, index) => (
            <ListItem key={index}>
              {investment.name} - ${investment.price.toFixed(2)}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
