import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { attemptLogin } from 'actions';
import { ADMIN_ROLES } from 'constants/user-roles';
import firebase from 'firebase/app';
import { isLoaded } from 'react-redux-firebase';


const mapStateToProps = state => {
  const loggedIn = !state.firebase.auth.isEmpty && ADMIN_ROLES.includes(state.firebase.profile.role);
  return {
    loggedIn: loggedIn,
    firebase: state.firebase,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (credentials) => dispatch(attemptLogin(credentials)),
  };
};

function AuthIsLoaded() {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Logging you in...</div>;
  return null
}

class ConnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    ;
    event.preventDefault();
    const { email, password } = this.state;
    firebase.login({
      email: email,
      password: password
    })
    this.setState({ email: "", password: "" })
  }
  render() {
    const { email, password } = this.state;
    const loggedIn = this.props.loggedIn;
    if (loggedIn) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      < div className="app flex-row align-items-center" >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <AuthIsLoaded />
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="email"
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          value={email}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div >
    );
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedLogin);

export default Login;
