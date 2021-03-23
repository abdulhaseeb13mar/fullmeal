import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import {HorizontalList, Wrapper, Fav} from '../Components';
import {colors, fonts, metrics} from '../utils/Theme';
import {
  SafeAreaView,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigator from '../utils/Navigator';
import data from '../../data';
import {connect} from 'react-redux';
import {addItem, deleteItem} from '../Redux/actions';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: []
    };
  }

  addItem = () => {
    this.props.addItem(this.props.route.params.item);
  };

  deleteItem = () => {
    this.props.deleteItem(this.props.route.params.item);
  };

  componentDidMount() {
    let colors = data.color.filter(item => (
      item.productid == this.props.route.params.item.id
    ))
    this.setState({ colors })
    // console.log('colorsss', colors, this.props.route.params.item.id)
  }

  render() {
    const {
      name,
      image,
      description,
      price,
      bgcolor,
      id,
      type, isFav
    } = this.props.route.params.item;

    const flag = this.props.cart?.items.filter((val) => val.id == id);
    const quantity = flag.length !== 0 ? flag[0].quantity : 0;

    return (
      <Wrapper bottom={0} style={{backgroundColor: bgcolor}}>
        <ScrollView
          style={{ flex: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View>
            <View style={{flexDirection:'row',padding: metrics.defaultMargin, justifyContent:'space-between', alignItems:'center'}}>
              <TouchableWithoutFeedback onPress={() => Navigator.goBack()}>
                <View style={[styles.backIcon]}>
                  <Icon name="chevron-back" color="black" size={30} />
                </View>
              </TouchableWithoutFeedback>
              <Icon
                  name="heart"
                  style={[styles.icon,{color: isFav? colors.red : colors.primary}]}
                />

            </View>
            <View style={{alignItems:'center', marginHorizontal: metrics.defaultMargin,}} >
              <View style={styles.imageView}>
                <Image style={styles.image} source={image} />
              </View>
            </View>
        <View style={{marginHorizontal: metrics.defaultMargin, borderRadius:20 , paddingHorizontal: metrics.defaultMargin,  flex:1, borderColor:colors.primaryLight,borderWidth:1, marginTop:metrics.defaultMargin}}>
         
          <Text style={styles.smallHeading}>{name}</Text>
          <Text style={[styles.text]}>Price: ${price}</Text>
          <Text style={styles.text}>{description}</Text>
          
          
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
          }}>
            
            
          </View>
        </View>
            
              <View style={{flexDirection:'row', margin: metrics.defaultMargin, borderRadius:3}}>
                <View style={[styles.quantityView,{flex:1, justifyContent:'center', alignItems:'center', marginTop:metrics.defaultMargin,}]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.deleteItem}
                  style={styles.iconView}>
                  <Icon name="remove" style={{...styles.icon}} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.addItem}
                  style={styles.iconView}>
                  <Icon name="add" style={styles.icon} />
                </TouchableOpacity>
              </View>
                <TouchableWithoutFeedback
                onPress={() =>
                  Navigator.navigate('Checkout', {
                    item: this.props.route.params.item,
                  })
                }>
                <View style={[styles.btn,{backgroundColor:colors.primary}]}>
                  <Text style={[styles.btnText,{color:'white'}]} > Add To Cart</Text>
                </View>
                </TouchableWithoutFeedback>
              </View>
                  
          </View>
            </ScrollView>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
 
  heading: {
    fontFamily: fonts.secondaryBold,
    fontSize: 28,
    marginBottom: metrics.defaultMargin,
    color: colors.secondary,
  },
  nameHeading:{
    fontFamily: fonts.secondaryBold,
    fontSize: 28,
    marginLeft: metrics.defaultMargin,
    color: 'black',
    fontWeight:'bold',
    marginBottom:metrics.smallMargin
  },
  smallHeading: {
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    fontWeight:'bold',
    marginTop: metrics.defaultMargin,
    marginBottom:metrics.smallMargin
  },
  prodtype:{
    fontFamily: fonts.primary,
    fontSize: 18,
    lineHeight: 20,
    marginLeft: metrics.defaultMargin,
    color: colors.grey,
    fontWeight:'bold'
  },
  text: {
    fontFamily: fonts.primary,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: metrics.defaultMargin,
    color: colors.grey,
  },
  imageView: {
    // marginTop: metrics.largeMargin,
    width: '100%' ,
    height: 400,
    padding:metrics.defaultMargin,
    backgroundColor:colors.primaryLight,
    borderRadius:20,
    // justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonView: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    borderTopStartRadius: 30,
    paddingHorizontal: 30,
    marginLeft: metrics.defaultMargin,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: fonts.primaryBold,
  },
  backIcon: {
    // position: 'absolute',
    // top: metrics.defaultMargin,
    // left: metrics.defaultMargin,
    backgroundColor: 'transparent',
    // width: 50,
    // height: 50,
    // padding: metrics.defaultMargin,
    // borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: metrics.defaultMargin,
  },
  iconView: {
    width: 30,
    height: 30,
    borderRadius: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    fontSize: 24,
    color: colors.primary,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  colorContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginBottom: metrics.defaultMargin
  },
  colorPatch: {
    width: 30,
    height: 30,
    borderRadius: 3,
    margin: metrics.smallMargin,
    marginLeft:0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btn:{
    flex:1,
    backgroundColor:'red',
    marginTop:metrics.defaultMargin,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    // elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    // margin:metrics.defaultMargin

  },
  btnText:{
    textAlign:'center',
    paddingVertical:metrics.smallMargin,
    fontFamily: fonts.secondaryBold,
    fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps, {addItem, deleteItem})(ProductDetail);
