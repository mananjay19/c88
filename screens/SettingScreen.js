import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class SettingScreen extends Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            docId:'',

        }
    }
    getUserDetails(){
        var user = firebase.auth().currentUser
        var email = user.email
        db.collection('Users').where('email_id','==',email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data = doc.data()
                this.setState({
                    emailId:data.email_id,
                    firstName:data.first_Name,
                    lastName:data.last_Name,
                    address:data.address,
                    contact:data.contact,
                    docId:doc.Id
                })
            })
        })
    }
    updateUserDetail=()=>{
        db.collection('users').doc(this.state.docId)
        .update({
            'first_Name':this.state.firstName,
            'last_Name':this.state.lastName,
            'address':this.state.address,
            'contact':this.state.contact,
        })
        alert('profile updated sucessfully')
    }
    componentDidMount(){
        this.getUserDetails()
    }
    render(){
        return(
            <View style={styles.container}>
               <MyHeader title='settings' navigation={this.props.navigation}></MyHeader>
                <View style={styles.formContainer}>
                    <TextInput
                       style={styles.formTextInput}
                       placeholder='first Name'
                       maxLength={8}
                       onChangeText={t=>{
                           this.setState({
                               firstName:t
                           })
                       }}
                       value={this.state.firstName}
                    ></TextInput>
                    <TextInput
                       style={styles.formTextInput}
                       placeholder='last Name'
                       maxLength={8}
                       onChangeText={t=>{
                           this.setState({
                               lastName:t
                           })
                       }}
                       value={this.state.lastName}
                    ></TextInput>
                    <TextInput
                       style={styles.formTextInput}
                       placeholder='contact'
                       maxLength={10}
                       keyboardType={'numeric'}
                       onChangeText={t=>{
                           this.setState({
                               contact:t
                           })
                       }}
                       value={this.state.contact}
                    ></TextInput>
                    <TextInput
                       style={styles.formTextInput}
                       placeholder='address'
                       multiline={true}
                       onChangeText={t=>{
                           this.setState({
                               address:t
                           })
                       }}
                       value={this.state.address}
                    ></TextInput>
                    <TouchableOpacity
                      onPress={()=>{this.updateUserDetail()}} 
                    >
                        <Text>save</Text>
                    </TouchableOpacity>
                    </View> 
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })
  