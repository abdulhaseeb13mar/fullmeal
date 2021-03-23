import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../utils/Navigator';
import {colors, fonts, metrics} from '../utils/Theme';
import Fav from './Fav';
// import ImageView from './ImageView';

export default class FoodCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {name, newItem, image, description, price,bgcolor,isFav} = this.props.item;
    return (
      <TouchableOpacity
      style={{alignItems:'center'}}
        activeOpacity={0.9}
        onPress={() => Navigator.navigate('ProductDetail',{item:this.props.item,category:this.props.category})}>
        <View style={styles.container}>
            <View style={styles.imageView}>
              <Image source={image} style={styles.image} />
              
            </View>
            
            <View style={styles.detailView}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
              <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail">
                {description}
              </Text>
              <View style={{flexDirection:'row',marginTop:metrics.smallMargin,alignItems:'center', justifyContent:'space-between'}} >
                <Text style={styles.price}>
                  ${price.replace('$', '')}
                </Text>
                <View style={styles.iconView}>
                  <Fav isFav={isFav} item={this.props.item}/>
                </View>
              </View>

            </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: metrics.width * 0.80,
    marginRight: metrics.smallMargin,
    marginBottom: metrics.defaultMargin,
    borderRadius:18,
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    flexDirection:'row',
    justifyContent:'center'
  },
  linearGrad:{
    borderRadius:30,
  },
  imageView: {
    width: 100,
    height: 100,
    // alignSelf:'center',
    backgroundColor:colors.primaryLight,
    borderRadius:18,
    margin:5,
    // marginVertical:15,
    
  },
  fav:{
    backgroundColor:colors.primary,
    position:'absolute',
    top:0, left:0,
    margin:metrics.smallMargin,
    borderRadius:3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode:'contain'
  },
  detailView: {
    paddingHorizontal: 20,
    paddingTop:5,
    // paddingBottom: 20,
    // shadowColor: colors.grey,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    borderRadius: 15,
    flex:1,
    // backgroundColor:'green'


  },
  iconView: {
    // backgroundColor: 'transparent',
    // borderBottomEndRadius: 15,
    // borderTopStartRadius: 15,
    // width: 45,
    // height: 45,
    // alignItems: 'center',
    // justifyContent: 'center',
    // position: 'absolute',
    // bottom: 0,
    // right: 0,

  },
  title: {
    fontSize: 16,
    fontFamily: fonts.secondaryBold,
    textTransform: 'capitalize',
    fontWeight:'bold'

  },
  desc: {
    color: colors.grey,
    marginVertical: 5,
    fontFamily: fonts.secondary,
    textTransform: 'capitalize',
    // flexShrink: 1
  },
  price: {
    // marginTop: 10,
    fontSize: 20,
    fontFamily: fonts.secondaryBold,
    fontWeight:'bold',
    color:colors.primary
  },
});
