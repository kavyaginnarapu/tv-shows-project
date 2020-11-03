import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { GridListTile, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { isWidthUp } from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import { Link } from 'react-router-dom';
import { useStyles } from './ShowDetailsStyles';
import axios from '../../axios';
import requestApi from './../../requestApi';
import HeaderMenu from '../headerMenu/HeaderMenu';
import imageNotLoaded from './../../images/notFound.png';

export default function ShowDetails(props) {
  const classes = useStyles();
  const [showDetailsInfo, setShowDetailsInfo] = useState([]);
  const [showSeasons, setShowSeasons] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const id = window.location.hash.slice(14);
    async function fetchData() {
      const episodes = await axios.get(requestApi.fetchShowsData + `/${id}/seasons`);
      setShowSeasons(episodes.data);

      axios.get(requestApi.fetchShowsData + `/${id}?embed=cast`)
        .then(response => {
          if (response.data) {
            setShowDetailsInfo(response.data);
            setLoader(false)
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    fetchData();
  }, [setShowDetailsInfo]);

  const onSeasonSelection = (id) => {
    // let genresValue = [];
    // async function fetchData() {
    //   const request = await axios.get(requestApi.fetchShowsSearchData + `${event.target.value}`);
    //   if (request.data && request.data.length > 0) {
    //     request.data.map((result) => {
    //       genresValue.push(result.show)
    //     });
    //   }
    //   props.filterShowsData(genresValue);
    //   props.genresName('')
    // }
    // fetchData();
    // if (event.target.value === '') {
    //   window.location.reload(false)
    //   props.genresName('')
    // } else {
    //   setValues({ ...values, [prop]: event.target.value });
    // }
  };
  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) { return 6; }

    if (isWidthUp('lg', props.width)) { return 4; }

    if (isWidthUp('md', props.width)) { return 3; }

    if (isWidthUp('xs', props.width)) { return 2; }

    if (isWidthUp('sm', props.width)) { return 2; }

    return 2;
  }

  return (
    <div>
    {loader ? <div></div> :
    <div className={classes.root}>
      <HeaderMenu />
      {showDetailsInfo &&
        <div className={classes.showDetailMain}>
          <Grid spacing={5} item xs={12} className={classes.breadcrumb}>
            <Breadcrumbs data-test="breadcrumb-dashboard" separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link to='/'> Dashboard </Link>
              <Typography color="textPrimary">{showDetailsInfo.name}</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid container spacing={3} className="gridSummary">
            <Grid item xs={12} lg={3} xl={3} md={3} sm={5}>
              <img className={classes.imageDisplay} src={showDetailsInfo.image && showDetailsInfo.image.medium} />
            </Grid>
            <Grid item xs={0} lg={9} xl={9} md={9} sm={7}>
              {showDetailsInfo.summary &&
                <div>
                  <Typography variant={'subtitle1'} className={classes.summary}>{showDetailsInfo.name}</Typography>
                  <Typography variant={'subtitle1'} className={classes.paper} dangerouslySetInnerHTML={{ __html: showDetailsInfo.summary }} />
                </div>
              }
              {showDetailsInfo && showDetailsInfo.rating &&
                <Typography variant={'subtitle1'} className={classes.paper}>
                  Rating: {showDetailsInfo.rating.average === null ?
                    <span>NA</span> :
                    <span>{showDetailsInfo.rating.average}</span>}
                </Typography>
              }
              {showDetailsInfo.language &&
                <Typography variant={'subtitle1'} className={classes.paper}>Language: {showDetailsInfo.language}</Typography>}
              <Typography variant={'subtitle1'} className={classes.paper}>
                {showDetailsInfo.genres && <span>Genres:</span>}
                {showDetailsInfo.genres && showDetailsInfo.genres.map((genres) => {
                  return <span>{genres + ','}</span>
                })
                }
              </Typography>
              <Typography variant="contained" className={classes.paper} >
                Schedule: {showDetailsInfo.schedule && showDetailsInfo.schedule.days.map((day, id) => {
                return (<span> {day + ' '} </span>)
              })}
                {showDetailsInfo && showDetailsInfo.schedule && showDetailsInfo.schedule.time}
              </Typography>
            </Grid>
          </Grid>

          {/* Seasons information */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paperCast}>
                <Typography variant={'subtitle1'} className={classes.headingPaper}>Seasons Information</Typography>
              </Paper>
            </Grid>
          </Grid>
          <GridList cellHeight={200} className={classes.gridList} cols={getGridListCols} >
            {
              showSeasons && showSeasons.map((season) => {
                console.log("season",season)
                return (
                  <GridListTile onClick ={()=>onSeasonSelection(season.id)}
                    style={{ padding: '8px' }}>
                    <img src={(season && season.image && season.image.medium) ?
                      season.image.medium : imageNotLoaded}
                      alt={'season'} className={classes.movieImage} />
                  </GridListTile>
                )
              })
            }
          </GridList>

          {/* cast info */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paperCast}>
                <Typography variant={'subtitle1'} className={classes.headingPaper}>Cast Information</Typography>
              </Paper>
            </Grid>
          </Grid>
          <GridList cellHeight={200} className={classes.gridList} cols={getGridListCols} >
            {
              showDetailsInfo._embedded && showDetailsInfo._embedded.cast.map((actor, id) => {

                return (
                  <GridListTile
                    style={{ padding: '8px' }}>
                    <img src={(actor.person.image && actor.person.image.medium) ?
                      actor.person.image.medium : imageNotLoaded}
                      alt={'cast'} className={classes.movieImage} />
                    <Typography variant={'subtitle2'}>{actor.person.name}</Typography>
                  </GridListTile>
                )
              })
            }
          </GridList>
        </div>
      }
    </div>
}
  </div>
  );
}