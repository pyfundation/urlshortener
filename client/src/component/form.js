import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import axios from 'axios';

export default class MyForm extends Component {
constructor (props) {
	super(props);

this.handleUrlInput = this.handleUrlInput.bind(this);
this.onSubmit = this.onSubmit.bind(this);

this.state = {
	longUrl: '',
  shortUrl: '',
  urlCode: '',
  date: '',
	formErrors: {longUrl: ''},
	URLValid: false,
	formValid: false,
  msg: ''
}}

handleUrlInput = (e) => {
const name = e.target.name;
const value = e.target.value;
this.setState({[name]: value},
	() => {this.validateField(name, value)},
  {longUrl: e.target.value},
  );
}

validateField(fieldName, value) {
	let fieldValidationErrors = this.state.formErrors;
	let URLValid = this.state.URLValid;

switch(fieldName) {
	case 'longUrl':
	URLValid = value.match(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/);
	fieldValidationErrors.longUrl = URLValid ? '' : ' is invalid';
        break;
        default:
        break;
}
this.setState({formErrors: fieldValidationErrors,
				URLValid: URLValid}, this.validateForm);
}

validateForm() {
    this.setState({formValid: this.state.URLValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'is-invalid');
  }

onSubmit(e) {
    e.preventDefault();

    const url = {
      longUrl: this.state.longUrl,
      urlCode: this.state.urlCode
    }

    console.log(url);

    axios.post('https://antishev-urlshortener-app.herokuapp.com/urls/shorten', url)
      .then(res => 
        this.setState({ shortUrl: res.data,
          msg: res.data}))
      .catch((error) => {console.log(error)})        

    this.setState({
      longUrl: '',
    })
  }

render(){

  return (

<div className="container-fluid">
  <div className="row justify-content-center align-items-center">
<form onSubmit={this.onSubmit} autoComplete="off">
<FormErrors formErrors={this.state.formErrors} />
  <fieldset style={{width: 300}}>
    <div className="form-group">
      <label>Enter your original URL</label>
      <input type="longUrl" name="longUrl" value={this.state.longUrl} onChange={this.handleUrlInput} className={`form-control ${this.errorClass(this.state.formErrors.longUrl)}`} required/>
    </div>
    <div className="form-group">
      <label>Custom URL</label>
      <input id="custominput" type="urlCode" name="urlCode" className="form-control"  onChange={this.handleUrlInput} value={this.state.urlCode} />
    </div>
    <button type="submit" className="btn btn-primary">Shorten</button>
    <div className="form-group">
      <label>This is your short URL</label>
      <input type="shortUrl" name="shortUrl" className="form-control" onChange={this.handleUrlInput} value={this.state.shortUrl}  />
    </div>
    <div style={{color: 'red'}}> {this.state.msg.msg} </div>
  </fieldset>
</form>
</div>
</div>

)}}
