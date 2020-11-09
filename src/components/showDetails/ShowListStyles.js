import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '100%',
        height: 'auto',
    },
    breadcrumb: {
        margin: '1px',
    },
    movieImage: {
        height: 300,
        width: '100%'

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