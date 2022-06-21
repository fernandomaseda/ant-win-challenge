import React, { useState, useEffect, useCallback, memo } from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import { Ant, AntList } from "../libs/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles, useTheme, withStyles } from "@mui/styles";

type AntGridProps = {
  ant: Ant;
  list: AntList;
};

const useStyles = makeStyles((theme) => ({
  //best option creating classes
}));

const AntGrid: React.FC<AntGridProps> = ({ ant, list }) => {
  let { name, length, color, weight, likelihood } = ant;

  const classes = useStyles();
  const theme = useTheme();

  const getLikeLihood = () => {
    if (
      list.every((ant: Ant) => ant.likelihood?.status === "CALCULATED") &&
      likelihood?.status
    ) {
      return likelihood.value?.toFixed(2); //I WILL SEND VALUES WHEN ALL ARE CALCULATED
    }

    if (likelihood?.status) {
      return likelihood.status;
    }

    return "NOT YET RUN";
  };
  return (
    <React.Fragment>
      <Grid sx={{ flexGrow: 1 }} container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Grid container>
              <Grid item style={{ width: "100%" }}>
                {/* <FormControl component="fieldset">
                <FormLabel component="legend">spacing</FormLabel>
              </FormControl> */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      Name
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      Length
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      Color
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      Weight
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      Likelihood
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      {length}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      {color}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      {weight}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      {getLikeLihood()}
                    </Typography>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AntGrid;
