import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { ListItem,Icon } from 'react-native-elements';
import MyHeader from '../components/MyHeader'

export default class MyDonationScreen extends Component{
    static navigationOptions={header:null}
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonation:[]
        },
        this.reqestref=null
    }
    componentDidMount(){this.getAllDonations()}
    componentWillUnmount(){
        this.requestref()
    }
    getAllDonations=()=>{
        this.reqestref=db.collection('BookDonations').where('doner_Id','==',this.state.userId)
        .onSnapshot(snapshot=>{
            var allDonations=snapshot.docs.map(document=>document.data())
            this.setState({
                allDonation:allDonations
            })
        })
    }
    sendNotification=(bookDetails,requestStatus)=>{
        var requestId=bookDetails.request_Id
        var donor_Id=bookDetails.donor_Id
        db.collection('All_Notifications')
        .where('request_Id','==',requestId)
        .where('donor_Id','==',donor_Id)
        .get()
        .then(snapshot=>{
            snapshot.forEach(a=>{
                var message=''
                if(requestStatus==='Booksend'){
                    message=this.state.donorName+'Sent you book'
                }
                else{
                    message=this.state.donorName+'Has shown interst in donating the book'
                }
                db.collection('All_Notifications').doc(a.id).update({
                    'message':message,
                    'Notification_status':'Unread',
                    'date':firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }
    keyExtactor=(item,Index)=>Index.toString()
    renderItem=({item,i})=>(
        <ListItem
        key={i}
        title={item.BookName}
        subtitle={'Request By:'+item.reqestedBy+'\n status:'+item.requestStatus}
        leftElement={<Icon name='Book' color='black'></Icon>}
        rightElement={<TouchableOpacity><Text>Send Book</Text></TouchableOpacity>}
        bottomDivider
        ></ListItem>
    )
    render(){
        return(
            <View>
                <MyHeader title='My Donation' navigation={this.props.navigation}/>
                <View>
                    {this.state.allDonation.length===0
                    ?<Text>List Of All Book Donation</Text>
                    :(<FlatList 
                    keyExtractor={this.keyExtactor}
                    data={this.state.allDonation}
                    renderItem={this.renderItem}
                    ></FlatList>)
                    }
                </View>
            </View>
        )
    }
}