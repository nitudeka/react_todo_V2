import React, { Component } from 'react';
import Input from '../Input/Input';
import { withRouter } from 'react-router-dom';
import FormValidation from '../FormValidation';

class Register extends Component {
  state = {
    form: {
      name: {
        label: 'Your name',
        type: 'text',
        placeholder: 'Your name',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        focused: false
      },
      email: {
        label: 'Your email',
        type: 'text',
        placeholder: 'Your email',
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        focused: false
      }
    },
    errorMessage: null,
    formIsValid: false
  }

  onSubmitRegister = () => {
    this.props.setLoading();
    fetch('https://immense-waters-65123.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.form.email.value,
        password: this.state.form.password.value,
        name: this.state.form.name.value
      })
    }).then(response => response.json())
      .then(user => {
        this.props.setLoading();
        if (user === 'unable to register') {
          this.setState({errorMessage: <p>Please try a different email address</p>})
        }
        if (user.id) {
          this.props.loadUser(user);
          this.props.isSignedIn();
          this.props.history.push('/');
        }
      }
    )
  }

  onInputChange = (event, element) => {
    const updatedState = {...this.state.form};
    const updatedElement = {...updatedState[element]};
    updatedElement.value = event.target.value;
    updatedElement.focused = true;
    updatedElement.valid = FormValidation(event.target.value, updatedElement.validation);
    updatedState[element] = updatedElement;
    let formIsValid = true;
    Object.keys(updatedState).map(elements => {
      return formIsValid = updatedState[elements].valid && formIsValid;
    })
    this.setState({form: updatedState, formIsValid: formIsValid});
  }
  
  render () {
    const form = Object.keys(this.state.form).map(element => {
      return <Input
        valid={this.state.form[element].valid}
        focused={this.state.form[element].focused}
        key={element}
        placeholder={this.state.form[element].placeholder}
        type={this.state.form[element].type}
        label={this.state.form[element].label}
        onChange={(event) => this.onInputChange(event, element)}
      />
    })
    
    return (
      <div className='form'>
        <div className='form__head'>
          <h3 className='form__heading'>Register</h3>
        </div>
        {form}
        <button className='form__btn'>Register</button>
      </div>
    )
  }
}

export default withRouter(Register);
