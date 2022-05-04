// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty, map, mapValues, values } from 'lodash';
import { Button } from '@material-ui/core';
import SelectField from '../../form/SelectField';
import { getCoinPrice, getCoins, getSymbolList, saveCoin } from '../actions';

class CoinsSettings extends Component {
  UNSAFE_componentWillMount() {
    if (isEmpty(this.props.coins)) {
      this.props.getCoins();
    }
    if (isEmpty(this.props.symbols)) {
      this.props.getSymbolList();
    }
  }

  onSubmit = (props) => {
    const propsMapped = mapValues(props, (p) => (p.value ? p.value : p));

    return this.props
      .getCoinPrice(propsMapped)
      .then(() => this.props.saveCoin(propsMapped))
      .then(() => this.props.closeModal())
      .catch((error) => {
        throw new SubmissionError({
          _error: error.Message,
        });
      });
  };

  render() {
    const { error, submitting, coins, symbols, handleSubmit } = this.props;

    if (isEmpty(coins)) {
      return <div>Loading...</div>;
    }

    const coinsOptions = coins;
    const symbolsOptions = values(
      map(symbols, (d) => ({ label: d, value: d }))
    );

    return (
      <div>
        <h3>Add a coin</h3>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <Field
              name="coin"
              id="coin"
              options={coinsOptions}
              component={SelectField}
              margin="normal"
              label="Select your FROM symbol*"
            />
          </div>
          <div className="form-group">
            <Field
              name="to"
              id="to"
              options={symbolsOptions}
              component={SelectField}
              margin="normal"
              label="Select your TO symbol*"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            disabled={submitting}
            type="submit"
          >
            Add
          </Button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    );
  }
}

CoinsSettings.propTypes = {
  error: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  coins: PropTypes.any.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  symbols: PropTypes.array.isRequired,
  getCoins: PropTypes.func.isRequired,
  getSymbolList: PropTypes.func.isRequired,
  getCoinPrice: PropTypes.func.isRequired,
  saveCoin: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

CoinsSettings.defaultProps = {
  error: null,
};

function mapStateToProps({ coins }) {
  return {
    coins: coins.data,
    symbols: coins.symbols,
    initialValues: {
      exchange: 'CCCAGG',
    },
  };
}

const dispatchProps = {
  getCoins,
  saveCoin,
  getSymbolList,
  getCoinPrice,
};

export default connect(
  mapStateToProps,
  dispatchProps
)(reduxForm<any, any>({ form: 'settings/coins' })(CoinsSettings));
