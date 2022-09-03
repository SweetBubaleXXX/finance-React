import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import TextField from "@mui/material/TextField";

import HeadWidgets from "./HeadWidgets";
import CoinCard from "./CoinCard";
import TableCoins from "./TableCoins";

import {
  Card,
  Grid,
  Paper,
  Divider,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";

import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";

function Сryptocurrency() {
  const [dataCoins, setDataCoins] = useState(null);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [dataSearch, setDataSearch] = useState(null);

  const [viewCoins, setViewCoins] = useState("table");

  const [sorting, setSorting] = useState("");

  const [sortType, setSortType] = useState(true);

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
      setLoading(false);
      fetch(`https://api.coinpaprika.com/v1/search/?q=${search}&limit=100`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.currencies.length) {
            let arr = [];
            for (let el of data.currencies) {
              arr.push(
                fetch(
                  `https://api.coinstats.app/public/v1/coins/${el.id.replace(
                    /[a-z]+-/,
                    ""
                  )}?currency=USD`
                )
              );
            }

            Promise.all(arr)
              .then((responses) => Promise.all(responses.map((r) => r.json())))
              .then((coinsData) => {
                let arr = [];
                for (let coin of coinsData) {
                  if (coin.coin) {
                    arr.push(coin.coin);
                  }
                }
                setDataSearch(arr.length ? arr : null);
                setLoading(true);
              });
          } else {
            setDataSearch(null);
            setLoading(true);
          }
        });
    }
  }, [search]);

  useEffect(() => {
    if (sorting !== "") {
      let copy = dataCoins;
      copy = copy.sort(sort_by(sorting, !sortType));
      setDataCoins(copy);
    }
  }, [sorting]);

  useEffect(() => {
    if (sorting !== "") {
      let copy = dataCoins;
      copy = copy.sort(sort_by(sorting, !sortType));
      setDataCoins(copy);
    }
  }, [sortType]);

  console.log(dataCoins);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "1",
        border: "1px solid red",
        px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 13 },
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
            mx: "auto",
            height: "fit-content",
            position: { xs: "block", md: "sticky" },
            top: { xs: "0", sm: "80px" },
            border: "1px solid red",
            width: "350px",
          }}
        >
          <Paper
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ToggleButtonGroup
              value={viewCoins}
              exclusive
              onChange={(event) => {
                setViewCoins(event.target.value);
              }}
              color="primary"
              fullWidth={true}
              sx={{
                my: 1,
              }}
            >
              <ToggleButton value="table">Table</ToggleButton>
              <ToggleButton value="grid">Grid</ToggleButton>
            </ToggleButtonGroup>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                mb: 1,
                width: 1,
              }}
            >
              <FormControl sx={{ width: 1 }} size="small">
                <InputLabel id="demo-select-small">sorting</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={sorting}
                  label="Age"
                  onChange={(event) => {
                    setSorting(event.target.value);
                  }}
                >
                  <MenuItem value="">none</MenuItem>
                  <MenuItem value="rank">rank</MenuItem>
                  <MenuItem value="price">price</MenuItem>
                  <MenuItem value="priceChange1h">hour</MenuItem>
                  <MenuItem value="priceChange1d">day</MenuItem>
                  <MenuItem value="priceChange1w">week</MenuItem>
                </Select>
              </FormControl>

              <IconButton
                disabled={sorting === "" ? true : false}
                onClick={() => {
                  setSortType(!sortType);
                }}
                variant="outlined"
              >
                {sortType ? <SouthIcon /> : <NorthIcon />}
              </IconButton>
            </Box>

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
            alignItems: loading ? "start" : "center",
          }}
        >
          {!loading ? (
            <CircularProgress size="5rem" />
          ) : search ? (
            dataSearch ? (
              viewCoins === "grid" ? (
                <Grid
                  container
                  sx={{
                    border: "1px solid green",
                    justifyContent: "center",
                    p: { xs: 0, md: 2 },
                  }}
                >
                  {dataSearch.map((elem, key) => (
                    <CoinCard elem={elem} key={key} />
                  ))}
                </Grid>
              ) : (
                <TableCoins data={dataSearch} />
              )
            ) : (
              <Card sx={{ px: 3, py: 2, m: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6">
                    Sorry. According to your request{" "}
                    <strong>
                      <u>{search}</u>
                    </strong>{" "}
                    nothing was found.
                  </Typography>
                  <Divider />

                  <Typography variant="h6">
                    Try searching for a different name
                  </Typography>
                </Box>
              </Card>
            )
          ) : viewCoins === "grid" ? (
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
          ) : (
            <TableCoins rows={dataCoins} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Сryptocurrency;

const sort_by = (field, reverse, primer) => {
  const key = primer
    ? function (x) {
        return primer(x[field]);
      }
    : function (x) {
        return x[field];
      };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
  };
};
