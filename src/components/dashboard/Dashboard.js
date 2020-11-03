import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from '../../axios';
import requestApi from '../../requestApi';
import ShowList from '../showDetails/ShowList';
import Header from '../headerMenu/HeaderMenu';
import { useStyles } from "./DashboardStyles";

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showsInfo, setShowsInfo] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [genresInfo, setGenresInfo] = useState([]);
  const [genresNames, setGenresNames] = useState('');
  const [loader, setLoader] = useState(true);

  React.useEffect(() => {
    let genresValue = [];
    let value = [];
    async function fetchData() {
      axios.get(requestApi.fetchShowsData)
        .then(response => {
          if (response.data && response.data.length > 0) {
            response.data.map((result) => {
              result.genres.map((name) => {
                genresValue.push(name)
              })
            })
            let data = response.data;
            data.sort(function (a, b) {
              return b.rating.average - a.rating.average
            });
            value.push(...data);
            let genres = [...new Set(genresValue)];
            setGenresInfo(genres);
            setShowsInfo(value);
            setFilterData(value);
            setLoader(false)
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    fetchData();
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
      {loader ? <div></div> :
        <div className={classes.root} data-test="dashboard-main">
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