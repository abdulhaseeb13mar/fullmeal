import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../utils/Navigator';
import {colors, fonts, metrics} from '../utils/Theme';
import Fav from './Fav';
// import ImageView from './ImageView';
export default class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {name, newItem, image, description, price,bgcolor,isFav} = this.props.item;
    return (
      <TouchableOpacity
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
              <Text style={styles.price}>
                ${price.replace('$', '')}
              </Text>
              {/* <View style={styles.iconView}>
                <Fav style={{top:-4}} isFav={isFav} item={this.props.item}/>
              </View> */}

            </View>
            {newItem && 
            <View style={styles.fav}>
                <Text style={{fontWeight:'bold',paddingHorizontal:12, paddingVertical:3, fontSize:12, color:colors.secondary}}>NEW</Text>
              </View>
            }
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: metrics.width * 0.42,
    marginRight: metrics.defaultMargin,
    marginBottom: metrics.defaultMargin,
    borderRadius:3,
    backgroundColor:'white',
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,

  },
  linearGrad:{
    borderRadius:30,
  },
  imageView: {
    width: 100,
    height: 100,
    alignSelf:'center',
    // backgroundColor:'white',
    borderRadius:30,
    marginVertical:15,
    
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode:'contain'
  },
  detailView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: colors.grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 15,


  },
  iconView: {
    backgroundColor: 'transparent',
    borderBottomEndRadius: 15,
    borderTopStartRadius: 15,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    shadowColor: colors.secondary,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.secondaryBold,
    // fontWeight:'bold',
    textTransform: 'capitalize'
  },
  desc: {
    color: colors.grey,
    marginVertical: 5,
    fontFamily: fonts.secondary,
    textTransform: 'capitalize'
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: fonts.secondaryBold,
    // fontWeight:'bold',
    color:colors.grey
  },
  fav:{
    backgroundColor:colors.primary,
    position:'absolute',
    top:0, left:0,
    margin:metrics.smallMargin,
    borderRadius:3,
  },
});
