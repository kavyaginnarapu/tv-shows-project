import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
import { useStyles } from './ShowListStyles';
import imageNotFound from './../../images/notFound.png';
import ScrollToTop from "react-scroll-to-top";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { emphasize,useTheme,withStyles } from "@material-ui/core/styles";

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

export default function ShowList(props) {

  const classes = useStyles();
  const [showsInfo, setShowsInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(0);
  // const [widthSize,setWidthSize] = useState(2);
  const itemsPerPage = props.data && props.data.length > 15 ? 15 : 6;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (props.data) {
      setShowsInfo(props.data);
      setNoOfPages(Math.ceil(props.data.length / itemsPerPage))
    }
  }, [setShowsInfo, props]);

  let widthSize = 2;
  const width = useWidth();
  if (width === "xs") {
    widthSize = 2;
    console.log("xs")
  } else if (width === "lg") {
    widthSize = 6;
    console.log("lg")
  } else if (width === "md") {
    widthSize = 6;
    console.log("md")
  } else if (width === "sm") {
    widthSize = 3;
    console.log("sm")
  } else if (width === "xl") {
    widthSize = 6;
    console.log("xl")
  } else {
    widthSize = 3;
  }

  return (
    <div>
      <div className={classes.root}>
        <Grid item xs={12} className={classes.breadcrumb} >
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              href="#"
              label="Home"
              icon={<HomeIcon fontSize="small" />}
              onClick={() => window.location.reload(false)}
            />
            {props.genresName && 
            <StyledBreadcrumb label={props.genresName} /> }
          </Breadcrumbs>
        </Grid>

        <GridList data-test="grid-list" cellHeight={300} className={classes.gridList} cols={widthSize}>
          {
            props && props.data.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((tile) => {
              return (
                <GridListTile
                  key={tile.image && tile.image.medium}
                  style={{ padding: '6px' }}>
                  <Link to={`/showdetails/${tile.id}`} key={tile.image && tile.image.medium}>
                    <img src={(tile.image && tile.image.medium) ? tile.image && tile.image.medium : imageNotFound} alt={'image not loaded'}
                      className={classes.movieImage} />

                  </Link>
                  <GridListTileBar
                    key={tile.id}
                    title={tile.name}
                    subtitle={<div>{tile.genres && tile.genres.map((genres) => {
                      return (
                        <span key={genres}>{genres + ','}</span>
                      )
                    })}</div>}
                    actionIcon={
                      <Button key={tile.image && tile.image.medium} size="small" variant="contained" color="primary" className={classes.icon}>
                        <FavoriteIcon color="secondary" fontSize="small" />
                        {tile.rating.average !== null ? tile.rating.average : 'NA'}
                      </Button>
                    }
                  />
                </GridListTile>
              )
            })
          }
        </GridList>

      </div>
      <div className={classes.paginationDiv} data-test="pagination-sample">

        {showsInfo.length === 0 ?
          <div>No movies found</div> :
          <Pagination
            count={noOfPages}
            page={page}
            onChange={handleChange}
            defaultPage={1}
            color="primary"
            size="small"
            showFirstButton
            showLastButton
            classes={{ ul: classes.paginator }}
          />}
      </div>
      <ScrollToTop smooth style={{ backgroundColor: '#3f50b5', color: "#0000ff" }} />
    </div>
  );
}