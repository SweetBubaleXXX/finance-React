import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import TextField from "@mui/material/TextField";

import HeadWidgets from "./HeadWidgets";
import CoinCard from "./CoinCard";

import {
  Card,
  Grid,
  Paper,
  Divider,
  CardActions,
  CardHeader,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";

function Сryptocurrency() {
  const [dataCoins, setDataCoins] = useState(null);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [dataSearch, setDataSearch] = useState(null);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetch(
      "https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDataCoins(data.coins.length > 30 ? data.coins : null);
        setLoading(true);
      });
  }, []);



  useEffect(() => {
    if (search) {
        fetch(`https://api.coingecko.com/api/v3/search?query=${search}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })

    }
  }, [search]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "1",
        border: "1px solid red",
        px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
      }}
    >
      <HeadWidgets />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "1",
          border: "1px solid orange",
        }}
      >
        <Box
          sx={{
            padding: 3,
            borderRadius: 3,
            mx: "auto",
            height: "fit-content",
            position: { xs: "block", sm: "sticky" },
            top: { xs: "0", sm: "60px" },
            border: "1px solid red",
          }}
        >
          <Paper
            sx={{
              padding: 2,
            }}
          >
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="search coin"
              value={search}
              onChange={handleChangeSearch}
            />
          </Paper>
          <Divider />
          <Paper
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            markets
          </Paper>
        </Box>

        <Box
          sx={{
            width: "1",
            display: "flex",
            justifyContent: "center",
            minHeight: "93vh",
            my: "auto",
          }}
        >
          {!loading ? (
            <CircularProgress size="5rem" />
          ) : (
            <Grid
              container
              sx={{
                border: "1px solid green",
                justifyContent: "center",
                p: { xs: 0, md: 2 },
              }}
            >
              {dataCoins.map((elem, key) => (
                <CoinCard elem={elem} key={key} />
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Сryptocurrency;
