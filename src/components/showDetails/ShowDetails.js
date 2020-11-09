import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { GridListTile, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import { Link } from 'react-router-dom';
import { useStyles } from './ShowDetailsStyles';
import HeaderMenu from '../headerMenu/HeaderMenu';
import ImageNotFound from './../../images/imageNotFound.png';
import { fetchData } from '../service';
import ScrollToTop from "react-scroll-to-top";
import HomeIcon from '@material-ui/icons/Home';
import { StyledBreadcrumb, useWidth } from './../ScreenWidth';

export default function ShowDetails(props) {
  const classes = useStyles();
  const [showDetailsInfo, setShowDetailsInfo] = useState([]);
  const [showSeasons, setShowSeasons] = useState([]);
  const [loader, setLoader] = useState(true);

  let widthSize = 2;

  const width = useWidth();
  if (width === "xs") {
    widthSize = 2;
  } else if (width === "lg" || width === "md" ||  width === "xl") {
    widthSize = 9;
  } else {
    widthSize = 3;
  }

  React.useEffect(() => {
    const id = window.location.hash.slice(14);
    fetchData('byMovie', id).then(movie => {
      setShowDetailsInfo(movie);
      setLoader(false);
      return fetchData('bySeason', id).then(season => {
        setShowSeasons(season)
      })
        .catch(error => {
          console.log(error);
        });

    })
  }, [setShowDetailsInfo]);

  return (
    <div>
      {loader ?
        <CircularProgress /> :
        <div className={classes.root}>
          <HeaderMenu />
          {showDetailsInfo &&
            <div className={classes.showDetailMain}>
              <Grid container spacing={5} item xs={12} className={classes.breadcrumb}>

                <Breadcrumbs aria-label="breadcrumb">
                  <Link to='/' style={{ textDecoration: 'none' }}>
                    <StyledBreadcrumb
                      href="#"
                      label="Home"
                      icon={<HomeIcon fontSize="small" />}
                    />
                  </Link>

                  {showDetailsInfo.name &&
                    <StyledBreadcrumb label={showDetailsInfo.name} />}
                </Breadcrumbs>
              </Grid>
              <Grid container spacing={2} className="gridSummary">
                <Grid item xs={12} lg={3} xl={3} md={3} sm={5}>
                  <img className={classes.imageDisplay} src={showDetailsInfo.image && showDetailsInfo.image.medium} />
                </Grid>
                <Grid item lg={9} xl={9} md={9} sm={7}>
                  {showDetailsInfo.summary &&
                    <div>
                      <Typography variant={'subtitle1'} className={classes.summary}>{showDetailsInfo.name}</Typography>
                      <Typography variant={'subtitle1'} className={classes.fontInfo} dangerouslySetInnerHTML={{ __html: showDetailsInfo.summary }} />
                    </div>
                  }
                  {showDetailsInfo && showDetailsInfo.rating &&
                    <Typography variant={'subtitle1'} className={classes.paper}>
                      <span className={classes.fontInfo}>Rating :</span> {showDetailsInfo.rating.average === null ?
                        <span>NA</span> :
                        <span>{showDetailsInfo.rating.average}</span>}
                    </Typography>
                  }
                  {showDetailsInfo.language &&
                    <Typography variant={'subtitle1'} className={classes.paper}>
                      <span className={classes.fontInfo}>Language :</span> {showDetailsInfo.language}</Typography>}
                  <Typography variant={'subtitle1'} className={classes.paper}>
                    {showDetailsInfo.genres && <span className={classes.fontInfo}>Genres : </span>}
                    {showDetailsInfo.genres && showDetailsInfo.genres.map((genres) => {
                      return <span key={genres}>{genres + ','}</span>
                    })
                    }
                  </Typography>
                  <Typography variant="subtitle1" className={classes.paper} >
                    <span className={classes.fontInfo} >Schedule:</span> {showDetailsInfo.schedule && showDetailsInfo.schedule.days.map((day, id) => {
                      return (<span key={day}> {day + ' '} </span>)
                    })}
                    {showDetailsInfo && showDetailsInfo.schedule && showDetailsInfo.schedule.time}
                  </Typography>
                </Grid>
              </Grid>

              {/* Seasons information */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paperCast}>
                    <Typography variant={'h3'} className={classes.headingPaper}>Seasons Information</Typography>
                  </Paper>
                </Grid>
              </Grid>
              {showSeasons ?
                <GridList cellHeight={200} className={classes.gridList} cols={widthSize}  >
                  {
                    showSeasons.map((season) => {
                      return (
                        <GridListTile key={season.id}
                          style={{ padding: '7px' }}>
                            <img src={(season && season.image && season.image.medium) ?
                              season.image.medium : ImageNotFound}
                              alt={'season'} className={classes.movieImage} />
                          <Typography variant={'subtitle2'} className={classes.personName}>{season.name || 'Season ' + season.number}</Typography>
                        </GridListTile>
                      )
                    })
                  }
                </GridList>
                : <div>Seasons information not found</div>}


              {/* cast info */}
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Paper className={classes.paperCast}>
                    <Typography variant={'h3'} className={classes.headingPaper}>Cast Information</Typography>
                  </Paper>
                </Grid>
              </Grid>
              {showDetailsInfo._embedded ?
                <GridList cellHeight={200} className={classes.gridList} cols={widthSize}>
                  {
                    showDetailsInfo._embedded.cast.map((actor, id) => {
                      return (
                        <GridListTile key={id}
                          style={{ padding: '7px' }}>
                          <img src={(actor.person.image && actor.person.image.medium) ?
                            actor.person.image.medium : ImageNotFound}
                            alt={'cast'} className={classes.movieImage} />
                          <Typography variant={'subtitle2'} className={classes.personName}>{actor.person.name}</Typography>
                        </GridListTile>
                      )
                    })
                  }
                </GridList> :
                <div>Cast information not found</div>
              }
            </div>
          }
          <ScrollToTop smooth style={{ backgroundColor: '#3f50b5', color: "#0000ff" }} />
        </div>
      }
    </div>
  );
}