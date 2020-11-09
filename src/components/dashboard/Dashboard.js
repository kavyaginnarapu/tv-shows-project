import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import ShowList from '../showDetails/ShowList';
import Header from '../headerMenu/HeaderMenu';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from "./DashboardStyles";
import { fetchData } from '../service';

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showsInfo, setShowsInfo] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [genresInfo, setGenresInfo] = useState([]);
  const [genresNames, setGenresNames] = useState('');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let genresValue = [];
    let value = [];
    fetchData().then(data => {
      data.map((result) => {
        result.genres.map((name) => {
          genresValue.push(name)
        })
      })
      let sortData = data;
      sortData.sort(function (a, b) {
        return b.rating.average - a.rating.average
      });
      value.push(...sortData);
      let genres = [...new Set(genresValue)];
      setGenresInfo(genres);
      setShowsInfo(value);
      setFilterData(value);
      setLoader(false)
    })
  }, []);


  const filteredData = (newValue) => {
    setFilterData(newValue);
  }
  const filterShowsData = (newValue) => {
    setFilterData(newValue);
  }
  const genresName = (genresName) => {
    setGenresNames(genresName);
  }

  return (
    <div>
      {loader ? <CircularProgress /> :
        <div className={classes.root} data-test="dashboard-main" id="scroller">
          <Header showsInfo={showsInfo} genresInfo={genresInfo} filterGenresData={filteredData}
            filterShowsData={filterShowsData} genresName={genresName} />
          <main className={clsx(classes.content, { [classes.contentShift]: open, })} >
            <div className={classes.drawerHeader} />
            <ShowList data={filterData} genresName={genresNames} />
          </main>

        </div>
      }
    </div>
  );
}