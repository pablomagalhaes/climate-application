import styled from 'styled-components';
import { Component } from 'react';
import * as Actions from '../store/Actions';
import { listenToFirebase, stopListeningToFirebase } from '../services/Firebase';
import { getObservationsData } from '../helpers/Filters';
import Loader from '../components/Loader';
import ReportTable from '../components/ReportTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const StyledReport = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class Report extends Component {
  state = { startedListeningToFirebase: false }

  setListeningToFirebase() {
    this.setState({ startedListeningToFirebase: true });
  }

  startLoading() {
    this.props.startFetching();
  }

  tryToStoreObservations(payload) {
    this.props.asyncStoreObservations(payload);
  }

  componentDidMount() {
    this.startLoading();
    listenToFirebase((snapshot) => {
      const { startedListeningToFirebase } = this.state;

      if (!startedListeningToFirebase) {
        this.setListeningToFirebase();
      }

      this.tryToStoreObservations({
        newObservations: getObservationsData(snapshot),
        startedListeningToFirebase
      });
    })
  }

  componentWillUnmount() {
    stopListeningToFirebase();
  }

  render() {
    const { isLoading, reports } = this.props.temperatures;

    return (
      <StyledReport>
        {isLoading && <Loader />}
        {!isLoading && <ReportTable reports={reports} />}
      </StyledReport>
    );
  }
}

const mapStateToProps = state => ({ temperatures: state.temperatures });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Report);
