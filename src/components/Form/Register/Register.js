import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signinHandler, toggleSpinner, getTasks } from '../../../store/actions';
import Input from '../Input/Input';
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
        type: 'email',
        placeholder: 'Your email',
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        focused: false
      },
      password: {
        label: 'Your Password (min-6)',
        type: 'password',
        placeholder: 'Your password (min-6)',
        value: '',
        validation: {
          required: true,
          minLength: 6,
          password: true
        },
        valid: false,
        focused: false
      },
      repeatPassword: {
        label: 'Repeat password',
        type: 'password',
        placeholder: 'Repeat password',
        value: '',
        validation: {
          required: true,
          minLength: 6,
          repeatPassword: true
        },
        valid: false,
        focused: false
      }
    },
    errorMessage: null,
    formIsValid: false
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
    const registerHandler = () => {
      this.props.signinHandler(this.state.form.email.value, this.state.form.password.value, this.state.form.name.value);
    }
    
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
        <button disabled={!this.state.formIsValid} onClick={registerHandler} className='form__btn'>Register</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  email: state.email
});

const mapDispatchToProps = (dispatch) => ({
  signinHandler: (email, password, name) => dispatch(signinHandler(email, password, name, 'register')),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
