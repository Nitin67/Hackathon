import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomePage } from '../HomePage';
import { userActions } from '../_actions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class FundTransfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            amount:'',
            submitted: false,
            payeeID:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangedrop=this.handleChangedrop.bind(this);
    }
    handleChange(e) {
      debugger;
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleChangedrop(e) {
      this.setState({'selected':e.value});
    }
    handleSubmit(e){
      debugger;
      const { amount,selected,payeeID }=this.state;
      const  userId  = this.props.user.userId;
      this.props.dispatch(userActions.entryTransaction(amount,payeeID,userId));
      this.setState({'submitted':true});
    }
    render() {
      debugger;
        const { amount ,submitted,payeeID} = this.state;
        const {transaction}=this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
              <HomePage/>
              <div>
              <label> Please Enter Payee ID  and enter amount to be transferred</label>
                    <div className={'form-group' + (submitted && !payeeID ? ' has-error' : '')}>
                        <label htmlFor="payeeID">Enter PAYEE ID transferred</label>
                        <input type="text" className="form-control" name="payeeID" value={payeeID} onChange={this.handleChange} />
                        {submitted && !payeeID &&
                            <div className="help-block">Payee ID is required</div>
                        }
                  </div>
                 <div className={'form-group' + (submitted && !amount ? ' has-error' : '')}>
                     <label htmlFor="amount">Enter Amount transferred</label>
                     <input type="text" className="form-control" name="amount" value={amount} onChange={this.handleChange} />
                     {submitted && !amount &&
                         <div className="help-block">Amount is required</div>
                     }
                 </div>
                 <div className="form-group">
                     <button className="btn btn-danger" onClick={this.handleSubmit}>Submit</button>
                     {submitted && transaction.transaction==null &&
                     <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                     }
                 </div>
              </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  debugger;
  const { user }=state.authentication;
  const { transaction } =state;

    return {user,transaction};
}

const connectedFundTransfer = connect(mapStateToProps)(FundTransfer);
export { connectedFundTransfer as FundTransfer };
