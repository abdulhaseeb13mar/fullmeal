import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  FoodCard,
  FoodIcon,
  HorizontalList,
  ItemCard,
  Wrapper,
} from '../Components';
import {colors, fonts, metrics} from '../utils/Theme';
import data from '../../data'
import { Container } from 'native-base';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image:''
    };
  }

  calItems(){
    const items =data.items.filter(
      (val) => val.categoryid == this.props.item.id,
    );
    return items.length
  }

  render() {
      const {item,index,onPress,selected, itemsNum} = this.props;
    return (
        <TouchableWithoutFeedback
          onPress={onPress}>
          <View style={styles.category}>
            <View style={styles.catImg}>
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={{flexDirection:'row'}} >
              <Text style={styles.catText}>{item.name}</Text>
              <View style={[styles.dot]}><Text style={{fontSize:5, color:colors.grey}} >{'\u2B24'}</Text></View>
              <Text style={[styles.catText,{fontWeight:'bold', color: colors.primary}]}>{this.calItems()} item</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
  }
}

const styles = StyleSheet.create({
    category: {
      // width:125,
      // padding:10,
      // backgroundColor:'T',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      // alignItems:'center',
      marginHorizontal:10

      
    },
    catImg:{
      backgroundColor:colors.primaryLight,
      padding:10,
      borderRadius:10,
    },
    image:{
      width:120,
      height:120,
      resizeMode:'contain',
    },
    catText:{
      // fontFamily: fonts.primary,
      fontSize: 12,
      marginVertical:10,
      // color:colors.white
    },
    categoryText: {
      fontFamily: fonts.primary,
      fontSize: 14,
      textAlign: 'center',
      width:'100%',
      marginVertical:10
    },
    dot: {
      justifyContent:'center',
      marginHorizontal:5,
    },
  });
  