import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { InputBase } from '@material-ui/core';
import axios from '../../axios';
import { useStyles } from './HeaderMenuStyles';
import requestApi from './../../requestApi';

export default function HeaderMenu(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ movieName: '' });

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onSelectGenres = (genres) => {
    if (props.showsInfo) {
      let value = [];
      props.showsInfo.map((data) => {
        data.genres.map((name) => {
          if (name === genres) {
            value.push(data)
          }
        })
      });
      props.filterGenresData(value);
      props.genresName(genres);
      setOpen(false);
    }
  }
  async function fetchData(event) {
    let genresValue = [];
    const request = await axios.get(requestApi.fetchShowsSearchData + `${event.target.value}`);
    if (request.data && request.data.length > 0) {
      request.data.map((result) => {
        genresValue.push(result.show)
      });
    }
    props.filterShowsData(genresValue);
    props.genresName('')
  }
  const handleChange = (prop) => (event) => {
   console.log("event in handle chane===>",event)
    fetchData(event);
    if (event.target.value === '') {
      window.location.reload(false)
      props.genresName('')
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };
  return (
    <div className="header-wrapper">
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {!window.location.hash.includes('showdetails') &&
            <IconButton
              data-test="drawer-open"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography variant="h6" noWrap data-test="header-text">TV SHOWS</Typography>
          {!window.location.hash.includes('showdetails') &&
            <Paper component="form" className={classes.search} style={{ textAlign: 'right' }}>

              <InputBase
                data-test="search-movies"
                onChange={handleChange('movieName')}
                className={classes.inputSearch}
                placeholder="Search movie names..."
                inputProps={{ 'aria-label': 'search movie' }}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
            </Paper>}

        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} data-test="drawer-tag"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <strong className={classes.genres}>Genres</strong>
          <IconButton onClick={handleDrawerClose} data-test="handle-drawer">
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <div>
          {props.genresInfo && props.genresInfo.length > 0 && props.genresInfo.map((genres) => {
            return (
              <div key={genres} >
                <ListItem button key={genres}>
                  <ListItemText key={genres} data-test="genres-selection" primary={genres} onClick={() => onSelectGenres(genres)} />
                </ListItem>
                <Divider />
              </div>
            )
          })}
        </div>
      </Drawer>
    </div>
  );
}