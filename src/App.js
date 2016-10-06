import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import { Table } from 'react-bootstrap';

class App extends Component {
    //setting up initial state
    constructor(props) {
      super(props);
      this.state =  {
            data:[]
        };
    };
    componentDidMount(){
        this.getDataFromServer('http://fcctop100.herokuapp.com/api/fccusers/top/recent');
    }
    //showResult Method
	showResult(response) {

	    this.setState({
		data: response
	    });
    }
    //making ajax call to get data from server
    getDataFromServer(URL){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:URL,
            success: function(response) {
                this.showResult(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render(){
        return(
            <div className="App">
				<div className="App-header">
		  			<img src={logo} className="App-logo" alt="logo" />
		  			<h2>Welcome to React</h2>
				</div>
				<div className="App-intro">
		   			<Result result={this.state.data}/>
				</div>
			</div>
	    	
        );
    }
}
class Result extends Component {
    render() {
        var result = this.props.result.map(function(result,index){
            return <ResultItem key={index} user={ result } />
            });
        return(

                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>UserName</th>
                                <th >Points In Last 30 Days</th>
                                <th>Points All Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result}
                        </tbody>
                    </Table>

        )
    }
}


class ResultItem extends Component {
    render(){
        var camper = this.props.user;
        return(
            <tr >
                <td>{camper.username}</td>
                <td>{camper.recent}</td>
                <td>{camper.alltime}</td>
            </tr>
        );
    }
}

export default App;
