import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import Logo from '../Logo';
import { InputField, Button, Link, Message } from '../../UI';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.neutral100};
`;

const StyledForm = styled.form`
  width: 480px;
  background: white;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.neutral400};
  padding: 48px;
  margin-top: 48px;
`;

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  width: 100%;
  color: ${props => props.theme.neutral800};
  margin-bottom: 24px;
`;

const Helper = styled.p`
  font-size: 18px;
  color: ${props => props.theme.neutral500};
  width: 90%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 24px;
`;

const Footer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 48px;
`;

class Reset extends Component {
  state = {
    password: '',
    confirm: '',
    passwordError: '',
    confirmError: '',
  };

  handleOnChange = e => {
    // Reset errors from BE
    const { error } = this.props;
    if (error.length > 0) {
      this.props.setAuthError('');
    }

    // Reset sync validation
    const { passwordError, confirmError } = this.state;
    const errors = { passwordError: '', confirmError: '' };
    if (passwordError.length > 0 || confirmError > 0) {
      this.setState({ ...errors });
    }

    // Update state
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnBlur = () => {
    this.validate();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.validate(() => {
      if (this.isFormValid()) {
        const { password, confirm } = this.state;
        const { token } = this.props.match.params;
        this.props.resetThunk({ password, confirm, token });
      }
    });
  };

  validate = cb => {
    const { password, confirm } = this.state;
    const errors = { passwordError: '', confirmError: '' };
    if (password.length === 0) {
      errors.passwordError = 'You need to provide a new password';
    }
    if (password.length < 5) {
      errors.passwordError = 'Your password must be at least 5 characters long';
    }
    if (confirm.length === 0) {
      errors.confirmError = 'Please confirm your new password';
    }
    if (password !== confirm) {
      errors.confirmError = 'Passwords do not match';
    }
    return this.setState({ ...errors }, cb);
  };

  isFormValid = () => {
    const { password, passwordError, confirm, confirmError } = this.state;
    return (
      passwordError.length === 0 &&
      confirmError.length === 0 &&
      password.length > 0 &&
      confirm.length > 0
    );
  };

  componentWillUnmount() {
    this.props.setAuthError('');
  }

  render() {
    const { fetching, error } = this.props;
    const { passwordError, confirmError } = this.state;
    return (
      <Container>
        <Logo />
        <StyledForm onSubmit={this.handleSubmit}>
          <Title>Reset your password</Title>
          <Helper>Choose a new password for your account.</Helper>
          {error.length > 0 && (
            <Message intent="error" style={{ marginBottom: 24 }}>
              {error}
            </Message>
          )}
          <InputField
            placeholder="New password"
            value={this.state.password}
            name="password"
            type="password"
            error={passwordError}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
          />
          <InputField
            placeholder="Confirm new password"
            value={this.state.confirm}
            name="confirm"
            type="password"
            error={confirmError}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
          />
          <Button type="submit" intent="primary" size="large" loading={fetching} block>
            Change password
          </Button>
          <Footer>
            <Link to="/login" size="large">
              Back to Login
            </Link>
          </Footer>
        </StyledForm>
      </Container>
    );
  }
}

export default withRouter(Reset);