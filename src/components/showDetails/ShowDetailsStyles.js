import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    showDetailMain: {
        margin: theme.spacing(3),
        paddingTop: theme.spacing(6)
    },
    breadcrumb: {
        marginTop: '4px',
        marginBottom: '4px',
        marginLeft: '1px'
    },
    paperHead: {
        fontSize: theme.spacing(3),
        padding: theme.spacing(2),
        display: 'flex',
        color: "white"
    },
    paperCast: {
        fontSize: theme.spacing(8),
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    paper: {
        color: theme.palette.text.secondary,
    },
    fontInfo: {
        fontFamily: ['Arial'],
        color: 'black'
    },
    summary: {
        fontWeight: 'bold',
        fontSize: theme.spacing(3)
    },
    imageDisplay: {
        width: '100%',
        height: '100%'
    },
    movieImage: {
        width: '100%',
        height: 150
    },
    personName: {
        whiteSpace: "nowrap",
        width: theme.spacing(14),
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    dashboard: {
        textAlign: 'right',
        marginTop: theme.spacing(3),
    },
    headingPaper: {
        // color: 'white',
        fontWeight: 'bold',
        fontSize: theme.spacing(2)
    },
    homeIcon: {
        fontSize: theme.spacing(5)
    }
}));

export { useStyles };