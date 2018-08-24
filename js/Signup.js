import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';
import Login from './Login';
import renderIf from './helpers/renderIf';

const styles = StyleSheet.create({
  login: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    backgroundColor: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'stretch',
    height: 50,
    marginBottom: 20,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  signupbutton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  logintext: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btntext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      loginPage: false,
      signupPage: true,
    };

    this._loginPage = this._loginPage.bind(this);
    this._signup = this._signup.bind(this);
    this._submit = this._submit.bind(this);
  }
 

  _loginPage() {
    this.setState({
      loginPage: true,
      signupPage: false,
    });
  }

  _signup() {
    this.setState({
      signupPage: true,
      loginPage: false,
    });
  }

  _submit() {
    // console.warn(this.props, 'props');
    axios({
      method: 'post',
      url: 'http://ec2-34-238-240-14.compute-1.amazonaws.com/login',
      data: this.state,
    })
      .then((response) => {
        console.warn('response', response);
        this.props._logIn();
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <View style={styles.login}>
      {renderIf(this.state.signupPage && !this.state.loginPage,
        <View>
        <Text style={styles.header}>Welcome to AR History Tour</Text>

        <TextInput style={styles.textinput} placeholder="   Name" onChangeText={(text) => this.setState({name: text})} />

        <TextInput style={styles.textinput} placeholder="   Email" onChangeText={(text) => this.setState({email: text})}/>

        <TextInput style={styles.textinput} placeholder="   Password" secureTextEntry={true} onChangeText={(text) => this.setState({password: text})} />

        <TouchableOpacity style={styles.signupbutton} onPress={() => { this._submit() }}>
          <Text style={styles.btntext}>Sign Up</Text>
        </TouchableOpacity>
        
          <Text style={styles.logintext} onPress={() => { this._loginPage();} }>Login Here</Text>
          </View>
        )}
        {renderIf(!this.state.signupPage && this.state.loginPage,
        <View>
          <Login arView={this.props._logIn} signup={this.props._signup}/>
        </View>)}

      </View>
    )
  }
}
