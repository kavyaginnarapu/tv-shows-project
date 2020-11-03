import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        paddingLeft: '30px',
        width: 'auto',
        height: 'auto',
    },
    breadcrumb: {
        margin: '2px',
        paddingLeft: '30px'
    },
    movieImage: {
        height: 300,
        width: 180
    },
    icon: {
        pointerEvents: 'none',
        margin: '2px',
        color: 'white'
    },
    paginationDiv: {
        bottom: '0px',
    },
    paginator: {
        justifyContent: "center",
        padding: "10px"
    }

}));

export { useStyles }