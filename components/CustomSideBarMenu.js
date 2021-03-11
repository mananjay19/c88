import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,ImageBackground,Platform } from 'react-native';
import { ListItem } from 'react-native-elements'
import * as firebase from 'firebase';
import db from '../config'
import {DrawerItems} from 'react-navigation-drawer'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { Query, QuerySnapshot } from '@firebase/firestore-types';
export default class CustomSideBarMenu extends Component{
  constructor(){
    super()
    this.state={
      image:'#',
      name:'',
      docId:'',
      userId:firebase.auth().currentUser.email
    }
  }
  selectPicture = async()=>{
    const {cancled,uri}=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1
    })
    if (!Cancelled){
      this.uploadImage(uri,this.state.userId)
    }
  }
  uploadImage=async(uri,imageName)=>{
   var response=await fetch(uri)
   var blob=await response.blob()
   var ref=firebase.storage().ref().child('user_profile/'+imageName)
   return ref.put(blob).then(response =>{
     this.fetchImage(imageName)
   }) 
  }
  fetchImage=(imageName)=>{
    var storageRef=firebase.storage().ref().child('user_profile/'+imageName)
    storageRef.getDownloadURL().then(url=>{
      this.setState({
        image:uri
      })
      .catch(error=>{
        this.setState({
          image:'#'
        })
      })
    })
  }
  getUserProfile(){
    db.collection('users').where('email_id','==', this.state.userId)
    .onSnapshot(QuerySnapshot=>{
      QuerySnapshot.forEach(doc=>{
        this.setState({
          name:doc.data().first_name+' '+doc.data().last_name
        })
      })
    })
  }
  componentDidMount(){
    this.fetchImage(this.state.userId)
    this.getUserProfile()
  }
    render(){
        return(
            <View style={{flex:1}}>
              <View style={{flex:0.5,alignItems:'center',backgroundColor:'orange'}}>
                   <Avatar
                   rounded
                   source={{uri:this.state.image}}
                   size='medium'
                   onPress={()=>{this.selectPicture()}}
                   showEditButton
                   />
                   <Text>{this.state.name}</Text>
              </View>
               <View style={styles.drawerItemsContainer}>
                   <DrawerItems
                     {...this.props}
                   />
               </View>
               <View style={styles.logOutContainer}>
                   <TouchableOpacity style={styles.logOutButton}
                   onPress={()=>{this.props.navigation.navigate('Welcome Screen')
                firebase.auth().signOut()
                }} >
                       <Text>Log Out</Text>
                   </TouchableOpacity>
               </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container : {
      flex:1
    },
    drawerItemsContainer:{
      flex:0.8
    },
    logOutContainer : {
      flex:0.2,
      justifyContent:'flex-end',
      paddingBottom:30
    },
    logOutButton : {
      height:30,
      width:'100%',
      justifyContent:'center',
      padding:10
    },
    logOutText:{
      fontSize: 30,
      fontWeight:'bold'
    }
  })
  