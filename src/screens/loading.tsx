import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(40),
    paddingTop: theme.spacing(40),
  }
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="xs">
      <CircularProgress />
    </Container>
  );
};

export default Loading;