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
import HeaderMenu from '../headerMenu/HeaderMenu';
import imageNotLoaded from './../../images/notFound.png';
import { fetchData } from '../service';
import ScrollToTop from "react-scroll-to-top";
import HomeIcon from '@material-ui/icons/Home';
import { emphasize, useTheme, withStyles } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xss"
  );
}
export default function ShowDetails(props) {
  const classes = useStyles();
  const [showDetailsInfo, setShowDetailsInfo] = useState([]);
  const [showSeasons, setShowSeasons] = useState([]);
  const [loader, setLoader] = useState(true);

  let widthSize = 2;
  
  const width = useWidth();
  if (width === "xs") {
    widthSize = 2;
    console.log("xs")
  } else if (width === "lg") {
    widthSize = 9;
    console.log("lg")
  } else if (width === "md") {
    widthSize = 9;
    console.log("md")
  } else if (width === "sm") {
    widthSize = 2;
    console.log("sm")
  } else if (width === "xl") {
    widthSize = 9;
    console.log("xl")
  } else {
    widthSize = 2;
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
      {loader ? <div></div> :
        <div className={classes.root}>
          <HeaderMenu />
          {showDetailsInfo &&
            <div className={classes.showDetailMain}>
              <Grid spacing={5} item xs={12} className={classes.breadcrumb}>

                <Breadcrumbs aria-label="breadcrumb">
                  <Link to='/'>
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
                      return <span key={genres}>{genres + ','}</span>
                    })
                    }
                  </Typography>
                  <Typography variant="subtitle1" className={classes.paper} >
                    Schedule: {showDetailsInfo.schedule && showDetailsInfo.schedule.days.map((day, id) => {
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
              <GridList cellHeight={200} className={classes.gridList} cols={widthSize}  >
                {
                  showSeasons && showSeasons.map((season) => {
                    return (
                      <GridListTile key={season.id}
                        style={{ padding: '7px' }}>
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
                    <Typography variant={'h3'} className={classes.headingPaper}>Cast Information</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <GridList cellHeight={200} className={classes.gridList} cols={widthSize}>
                {
                  showDetailsInfo._embedded && showDetailsInfo._embedded.cast.map((actor, id) => {
                    return (
                      <GridListTile key={id}
                        style={{ padding: '7px' }}>
                        <img src={(actor.person.image && actor.person.image.medium) ?
                          actor.person.image.medium : imageNotLoaded}
                          alt={'cast'} className={classes.movieImage} />
                        <Typography variant={'subtitle2'} className={classes.personName}>{actor.person.name}</Typography>
                      </GridListTile>
                    )
                  })
                }
              </GridList>
            </div>
          }
          <ScrollToTop smooth />
        </div>
      }
    </div>
  );
}