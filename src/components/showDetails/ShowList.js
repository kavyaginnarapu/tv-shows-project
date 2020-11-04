import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import withWidth, { isWidthUp }  from '@material-ui/core/withWidth';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
import { useStyles } from './ShowListStyles';
import imageNotFound from './../../images/notFound.png';

export default function ShowList(props) {

  const classes = useStyles();
  const [showsInfo, setShowsInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(0);
  const itemsPerPage = props.data && props.data.length > 14 ? 14 : 6;
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    if (props.data) {
      setShowsInfo(props.data);
      setNoOfPages(Math.ceil(props.data.length / itemsPerPage))
    }
  }, [setShowsInfo, props]);
  
  
  
  return (
    <div>
      <div className={classes.root}>
        <Grid item xs={12} className={classes.breadcrumb} >
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link to="/" onClick={() => window.location.reload(false)}> Dashboard </Link>
            {props.genresName &&
              <Typography color="textPrimary">{props.genresName}</Typography>}
          </Breadcrumbs>
        </Grid>

        <GridList data-test="grid-list" cellHeight={300} className={classes.gridList} cols={{ xs: 2, sm: 3, md: 3, lg: 6, xl: 6 }}> 
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
            size="large"
            showFirstButton
            showLastButton
            classes={{ ul: classes.paginator }}
          />}
      </div>
    </div>
  );
}