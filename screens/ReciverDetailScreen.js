import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config'
import {firebase} from 'firebase'
import {Card,Header,Icon} from 'react-native-elements'
  export default class ReciverDetailScreen extends Component{
      constructor(props){
          super(props)
          this.state = {
              userId:firebase.auth().currentUser.email,
              reciverId:this.props.navigation.getParam('deatils')['user_Id'],
              requestId:this.props.navigation.getParam('details')['request_Id'],
              bookName:this.props.navigation.getParam('details')['book_Name'],
              reason_for_requesting:this.props.navigation.getParam('details')['reson_to_request'],
              reciverName:'',
              reciverContact:'',
              reciverAddress:'',
              reciverRequestDocId:'',

          }
      }
      getReciverDetails(){
          db.colllection('users').where('email_Id','==',this.state.reciverId).get()
          .then(snapshot =>{
              snapshot.forEach(doc =>{
                  this.setState({
                      reciverName:doc.data().first_Name,
                      reciverContact:doc.data().contact,
                      reciverAddress:doc.data().address,

                  })
              })
          })
          db.colllection('requested_Books').where('request_Id','==',this.state.requestId).get()
          .then(snapshot =>{
            snapshot.forEach(doc =>{
                this.setState({
                    reciverRequestDocId:doc.Id
                })
            })
        })
    }
       updateBookStatus=()=>{
           db.collection('all_Donations').add({
               book_Name:this.state.bookName,
               request_Id:this.state.requestId,
               reqested_by:this.state.reciverName,
               donor_Id:this.state.userId,
               request_status:'donorRequested'
           })
       }
       addNotification=()=>{
           var message=this.state.userName+'Has shown intrest in donating the book'
           db.collection('All_Notification').add ({
               'targetedUserId':this.state.reciverId,
               'donorId':this.state.userId,
               'requestId':this.state.requestId,
               'date':firebase.firestore.fieldValue.serverTimestamp(),
               'notificationCenter':'unRead',
               'message':message
           })
       }
       
       componentDidMount(){
           this.getReciverDetails()
       }
      render(){
          return(
              <View>
                <View>
                    <Header
                    leftComponent={<Icon name='arrow-left' type='feather' colour='black' onPress={()=> this.props.navigation.goBack()}></Icon>}
                    centerComponent={{text:'donate Book',style:{colour:'black'}}}
                    backgroundColor='orange'
                    ></Header>
                </View>
                <View>
                    <Card
                    title={'Book Information'} titleStyle={{fontSize:20}}
                    >

                <Card>
                    <Text>name:{this.state.bookName}</Text>
                </Card>
                <Card>
                    <Text>reason:{this.state.reason_for_requesting}</Text>
                </Card>
                </Card>

                </View>
                    <View>
                        <Card
                        title={'reciverInformation'} titleStyle={{fontSize:20}}
                        >
                             <Card>
                    <Text>name:{this.state.reciverName}</Text>
                </Card>
                <Card>
                    <Text>contact:{this.state.reciverContact}</Text>
                </Card>
                <Card>
                    <Text>address:{this.state.reciverAddress}</Text>
                </Card>
                        </Card>
                    </View>
                <View>
                    {
                        this.state.reciverId!==this.state.userId
                        ?(<TouchableOpacity onPress={()=>{this.updateBookStatus()
                            this.addNotification()
                        this.props.navigation.navigate('My Donation')
                        }}>
                            <Text>I Want To Donate</Text>
                        </TouchableOpacity>)
                        :null
                    }
                </View>
              </View>
          )
      }
  }