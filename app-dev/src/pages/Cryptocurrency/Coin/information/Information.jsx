import React from "react";

import {
    Box,
    Typography,
    CircularProgress,
    Paper,
    Chip,
    Divider,
    Link,
    Avatar,
    Stack,
    Collapse,
    TableContainer,
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    Button,
  } from "@mui/material";


function Information({data}){
    return (
        <TableContainer
        sx={{
          my: 1,
          border: "1px solid #515151",
          borderRadius: 2,
        }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right">
                <Typography>Price:</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {numberSpace(data.market_data.current_price.usd)} $
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <Typography>All Time High:</Typography>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {numberSpace(data.market_data.ath.usd)} $
                </Typography>
                <Typography
                  sx={{
                    mx: 1,
                  }}
                >
                  ({dateFormat(data.market_data.ath_date.usd)})
                </Typography>
                <Typography
                  color={
                    data.market_data.ath_change_percentage.usd >= 0
                      ? "#29cf45"
                      : "red"
                  }
                >
                  {data.market_data.ath_change_percentage.usd > 0
                    ? "+" +
                      numberSpace(
                        data.market_data.ath_change_percentage.usd.toFixed(
                          2
                        )
                      )
                    : numberSpace(
                        data.market_data.ath_change_percentage.usd.toFixed(
                          2
                        )
                      )}
                  %
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <Typography>All Time Low:</Typography>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {numberSpace(data.market_data.atl.usd)} $
                </Typography>
                <Typography
                  sx={{
                    mx: 1,
                  }}
                >
                  ({dateFormat(data.market_data.atl_date.usd)})
                </Typography>
                <Typography
                  color={
                    data.market_data.atl_change_percentage.usd >= 0
                      ? "#29cf45"
                      : "red"
                  }
                >
                  {data.market_data.atl_change_percentage.usd > 0
                    ? "+" +
                      numberSpace(
                        data.market_data.atl_change_percentage.usd.toFixed(
                          2
                        )
                      )
                    : numberSpace(
                        data.market_data.atl_change_percentage.usd.toFixed(
                          2
                        )
                      )}
                  %
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <Typography>Low - High 24h:</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  {numberSpace(data.market_data.low_24h.usd)} $ -{" "}
                  {numberSpace(data.market_data.high_24h.usd)} $
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <Typography>Market Cap:</Typography>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    mr: 1,
                  }}
                >
                  {numberSpace(data.market_data.market_cap.usd)} $
                </Typography>
                <Typography
                  color={
                    data.market_data
                      .market_cap_change_percentage_24h_in_currency
                      .usd >= 0
                      ? "#29cf45"
                      : "red"
                  }
                >
                  {data.market_data
                    .market_cap_change_percentage_24h_in_currency.usd >
                  0
                    ? "+" +
                      data.market_data.market_cap_change_percentage_24h_in_currency.usd.toFixed(
                        2
                      )
                    : data.market_data.market_cap_change_percentage_24h_in_currency.usd.toFixed(
                        2
                      )}
                  %
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <Typography>Total volume:</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {numberSpace(data.market_data.total_volume.usd)} $
                </Typography>
              </TableCell>
            </TableRow>

            {data.genesis_date ? (
              <TableRow>
                <TableCell align="right">
                  <Typography>Genesis Date:</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {data.genesis_date.split("-").reverse().join(".")}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default Information;


function dateFormat(str) {
    return str.replace(/T.+/, "").split("-").reverse().join(".");
  }
  
  function numberSpace(x) {
    let ab = x.toString().split(".");
    if (ab.length > 1) {
      let past = ab[1]
        .split("")
        .reverse()
        .join("")
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        .split("")
        .reverse()
        .join("");
      return ab[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ." + past;
    } else {
      return ab[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
  