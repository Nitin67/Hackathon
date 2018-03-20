import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomePage } from '../HomePage';
import { userActions } from '../_actions';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
      debugger;
      if(this.props.user!=null)
      this.props.dispatch(userActions.getAllTransactions(this.props.user.userId));
    }
    render() {
      const {data}=this.props;
      var products=[];
      if(this.props.data!=null && this.props.data.transactions!=null){
        products=this.props.data.transactions;
      }
      debugger;
        return (
            <div className="col-md-6 col-md-offset-3">
              <HomePage/>
              Name: ABC Kumar<br/>
              total Amount :50000<br/>
              Address :ABC ABC ABC<br/>
              IIFC CODE BANK: 100000000<br/>
            <div>
            <BootstrapTable data={products} style={{width:1200}} pagination>
              <TableHeaderColumn isKey dataField='transactionId' width='200'>id</TableHeaderColumn>
                <TableHeaderColumn  dataField='from' width='200'>From</TableHeaderColumn>
                <TableHeaderColumn dataField='amount' width='200'>Amount</TableHeaderColumn>
                <TableHeaderColumn dataField='transactionType' width='200'>Debit/Credit</TableHeaderColumn>
            </BootstrapTable>
           </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  debugger;
  const {user}=state.authentication;
  const {data}=state.transaction;
    return {
      user,data
    };
}

const connectedUserProfile = connect(mapStateToProps)(UserProfile);
export { connectedUserProfile as UserProfile };
