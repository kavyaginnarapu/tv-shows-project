import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { useStyles } from './ShowListStyles';
import ImageNotFound from './../../images/imageNotFound.png';
import ScrollToTop from "react-scroll-to-top";
import { StyledBreadcrumb, useWidth } from './../ScreenWidth';

export default function ShowList(props) {

  const classes = useStyles();
  const [showsInfo, setShowsInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(0);
  const [loader, setLoader] = useState(true);
  const itemsPerPage = props.data && props.data.length > 18 ? 18 : 17;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (props.data) {
      setShowsInfo(props.data);
      setLoader(false);
      setNoOfPages(Math.ceil(props.data.length / itemsPerPage))
    }
  }, [setShowsInfo, props]);

  let widthSize = 2;
  const width = useWidth();

  if (width === "xs") {
    widthSize = 2;
  } else if (width === "lg" || width === "md" || width === "xl") {
    widthSize = 6;
  } else {
    widthSize = 3;
  }

  return (
    <div>{loader ? <CircularProgress /> :
      <div>
        <div className={classes.root}>
          <Grid container item xs={12} className={classes.breadcrumb} spacing={1} >
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                href="#"
                label="Home"
                icon={<HomeIcon fontSize="small" />}
                onClick={() => window.location.reload()}
              />
              {props.genresName &&
                <StyledBreadcrumb label={props.genresName} />}
            </Breadcrumbs>
          </Grid>

          <GridList data-test="grid-list" cellHeight={300} className={classes.gridList} cols={widthSize}>
            {
              props && props.data.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((tile) => {
                return (
                  <GridListTile
                    key={tile.id}
                    style={{ padding: '6px' }}>
                    <Link to={`/showdetails/${tile.id}`} key={tile.image && tile.image.medium}>
                      <img src={(tile.image && tile.image.medium) ? tile.image && tile.image.medium : ImageNotFound} alt={'image not loaded'}
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
        <div className={classes.paginationDiv} data-test="pagination-sample1">

          {showsInfo.length === 0 ?
            <div data-test="pagination-sample">No movies found</div> :
            <div>
              {showsInfo.length >=16 &&
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
            
            </div>}
        </div>
        <ScrollToTop smooth style={{ backgroundColor: '#3f50b5', color: "#0000ff" }} />
      </div>}
    </div>
  );
}