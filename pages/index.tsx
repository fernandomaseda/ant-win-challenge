import React, { useState, useEffect, useCallback, memo } from "react";
import { ListAnts, Ant } from "../libs/types";
import fetcher from "../api/service";
import Head from "next/head";
import Custom500 from "./500";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../components/header";
import AntGrid from "../components/antGrid";
import Button from "@mui/material/Button";
import generateAntWinLikelihoodCalculator from "../libs/antwin";
import Typography from "@mui/material/Typography";
const Home = () => {
  const [dataList, setDataList] = useState<ListAnts | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [race, setRace] = React.useState<"1" | "2" | "3">("1");
  const [sort, setSort] = React.useState<"HIGHEST" | "LOWEST" | "NONE">("NONE");

  useEffect(() => {
    if (
      dataList?.ants.every(
        (ant: Ant) => ant.likelihood?.status === "CALCULATED"
      )
    ) {
      setRace("3");
    }
  }, [dataList]);

  const fetchList = () => {
    fetcher.list().then((res) => {
      if (res.action === 1) {
        let data: ListAnts | null = res.data;
        setLoading(false);
        return setDataList(data);
      }
      if (res.action === 2) {
        return setError(true);
      }
    });
  };

  const displayStatus = () => {
    let status = "";

    if (race === "1") status = "Not yet run";
    if (race === "2") status = "In progress";
    if (race === "3") status = "All calculated";

    return status;
  };

  if (error) {
    return <Custom500 />;
  }

  if (!dataList && loading) {
    return (
      <div
        style={{
          display: "grid",
          height: "70vh",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CircularProgress style={{ width: "70px", height: "70px" }} />
      </div>
    );
  }

  const onSubmit = (type: "fetch" | "start" | "sort" | "restart") => {
    if (type === "fetch") {
      fetchList();
      setLoading(true);
    }

    if (type === "start" || type === "restart") {
      setRace("2");
      dataList &&
        dataList.ants.map((elem: Ant, i: number) => {
          let copyElem = { ...elem };
          copyElem.likelihood = { status: "IN PROGRESS", value: null };
          setDataList((prevState) => {
            if (prevState?.ants) {
              const copyPrev = { ...prevState };
              copyPrev.ants.splice(i, 1, copyElem);
              return copyPrev;
            } else {
              return prevState;
            }
          });
        });
      runRace();
    }

    if (type === "sort") {
      sortAnts();
    }

    if (type === "restart") {
      setSort("NONE");
    }
  };

  const sortAnts = () => {
    if (dataList?.ants) {
      if (sort === "LOWEST" || sort === "NONE") {
        setSort("HIGHEST");
        const sortedAnts = dataList.ants.sort((a: Ant, b: Ant) => {
          if (b.likelihood?.value && a.likelihood?.value) {
            return b.likelihood?.value - a.likelihood?.value;
          } else {
            return 0;
          }
        });
        setDataList({ ...dataList, ants: sortedAnts });
        return;
      }

      if (sort === "HIGHEST") {
        setSort("LOWEST");
        const sortedAnts = dataList.ants.sort((a: Ant, b: Ant) => {
          if (b.likelihood?.value && a.likelihood?.value) {
            return a.likelihood?.value - b.likelihood?.value;
          } else {
            return 0;
          }
        });
        setDataList({ ...dataList, ants: sortedAnts });
        return;
      }
    }
  };

  const runRace = () => {
    if (dataList?.ants) {
      dataList.ants.map((elem: Ant, i: number) => {
        let copyElem = { ...elem };
        generateAntWinLikelihoodCalculator()((value: number) => {
          copyElem.likelihood = { status: "CALCULATED", value: value };
          setDataList((prevState) => {
            if (prevState?.ants) {
              const copyPrev = { ...prevState };
              copyPrev.ants.splice(i, 1, copyElem);
              return copyPrev;
            } else {
              return prevState;
            }
          });
        });
      });
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Ant Race</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => onSubmit("fetch")}
          disabled={!dataList ? false : true}
        >
          Fetch Ants
        </Button>
        <Button
          variant="contained"
          disabled={dataList && race !== "2" ? false : true}
          onClick={() => onSubmit(race === "3" ? "restart" : "start")}
        >
          {race === "3" ? "Start Again" : "Start Race"}
        </Button>
      </div>

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Typography
          variant="body2"
          gutterBottom
          style={{ textAlign: "center", width: "100%" }}
        >
          Race status: {displayStatus().toUpperCase()}
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Button
          variant="text"
          disabled={race === "3" ? false : true}
          onClick={() => onSubmit("sort")}
        >
          Sort ({sort})
        </Button>
      </div>

      <div
        style={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        }}
      >
        {dataList?.ants &&
          dataList.ants.map((elem: Ant, i: number) => (
            <AntGrid ant={elem} key={i} list={dataList.ants} />
          ))}
      </div>
    </React.Fragment>
  );
};

export default Home;
