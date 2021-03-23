import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {CartItem, Header, Input, Wrapper, HorizontalList} from '../Components';
import {colors, fonts, metrics} from '../utils/Theme';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../utils/Navigator';

import Validation from '../utils/Validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from '../utils/Toast';
import OrderPlaced from '../Components/OrderPlaced';
import {BarIndicator} from 'react-native-indicators';
import {connect} from 'react-redux';
import {addItem, deleteItem, emptyCart} from '../Redux/actions';
import Cart from '../../assets/images/cart.png';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      visible: false,
      loading: false,
      shadow:'black',
      fname:{
        borderColor:'rgba(163,163,163,0.4)',
      },
      lname:{
        borderColor:'rgba(163,163,163,0.4)',
      },
      email:{
        borderColor:'rgba(163,163,163,0.4)',
      },
      phoneNumber:{
        borderColor:'rgba(163,163,163,0.4)',
      },
      address:{
        borderColor:'rgba(163,163,163,0.4)',
      }
    };
    this.inputs = {};
  }

  onChange(name, val) {
    // console.log({[name]: val});
    this.setState({[name]: {...this.state[name], value:val}});
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  async apiCall() {
    this.setState({loading: true});
    const res = await fetch('https://reactnativeapps.herokuapp.com/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.fname,
        lastname: this.state.lname,
        phonenumber: this.state.phoneNumber,
        address: this.state.phoneNumber,
        slotdatetime: new Date().toString(),
        email: this.state.email,
        appname: 'Full Meal',
        item: JSON.stringify(this.props.route.params.item),
      }),
    });

    const response = await res.json();
    this.setState({loading: false});
    if (response.status) this.setState({visible: true});
    else Toast('Some error occurred');
  }

  onButtonPress() {
    if (!Validation.isValidField(this.state.fname.value || '')) {
      return Toast('Please Enter Your First Name');
    }
    if (!Validation.isValidField(this.state.lname.value || '')) {
      return Toast('Please Enter Your Last Name');
    }
    if (!Validation.isValidField(this.state.email.value || '')) {
      return Toast('Please Enter Email');
    }
    if (!Validation.isEmailValid(this.state.email.value || '')) {
      return Toast('Please Enter Valid Email');
    }
    if (!Validation.isValidField(this.state.address.value || '')) {
      return Toast('Please Enter Address');
    }
    if (!Validation.isValidField(this.state.phoneNumber.value || '')) {
      return Toast('Please Enter Valid Phone Number');
    }

    this.apiCall();
  }

  onFocus(field) {
    this.setState({
      [field]: {...this.state[field], borderColor: 'rgba(34, 199, 184, .7)' }
})
}

onBlur(field) {

this.setState({
  [field]: {...this.state[field], borderColor: 'rgba(163,163,163,0.4)' }
})
}

  render() {
    return (
      <Wrapper bottom={0}>
        <Header textStyle={{fontWeight:'bold'}} title="Checkout" />

        <OrderPlaced
          visible={this.state.visible}
          // visible={true}
          onPress={() => {
            this.setState({visible: false});
            this.props.emptyCart();
            Navigator.navigateAndReset('Home');
          }}
        />

        {this.props.cart.items.length > 0 ? (
          <>
            <KeyboardAwareScrollView
              bounces={false}
              style={{
                flex: 1,
                // backgroundColor:'red'
              }}>
                <HorizontalList
                style={{paddingRight:metrics.smallMargin}}
                data={this.props.cart.items}
                renderItem={({item, index}) => (
                  <CartItem
                  item={item}
                  quantity={item.quantity}
                  onAdd={() => this.props.addItem(item)}
                  onMinus={() => this.props.deleteItem(item)}
                />
                )}
              />
               <View style={styles.info}>
                <Text style={styles.title}>Payment Mode</Text>
                <Text style={styles.text}>Payment on Delivery</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.title}>Total Price</Text>
                <Text style={[styles.text, {fontWeight:'bold', color: colors.primary, fontSize:20}]}>
                  ${parseInt(this.props.cart.totalPrice) * this.state.quantity}
                </Text>
              </View>
              
              <View style={styles.infoContainer}>
              {/* <Text style={[styles.text, {margin: metrics.defaultMargin}]}>Fill out your personal details to confirm order</Text> */}
              <View style={{paddingHorizontal:metrics.defaultMargin}}>
                <Input
                  required
                  handleBlur={ () => this.onBlur('fname') }
                  handleFocus={ () => this.onFocus('fname') }
                  inputStyle={{ 
                    borderColor: this.state.fname.borderColor, borderWidth:1,
                    borderRadius:3,
                    // shadowColor: this.state.shadow,
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 1,
                    // },
                    // shadowOpacity: 0.20,
                    // shadowRadius: 1.41,
                    // elevation: 2,
                    // color:colors.grey
                  }} 

                  placeholder="First Name"
                  // label="First name"
                  textValue={this.state.fname.value}
                  returnKeyType="next"
                  onRef={(ref) => {
                    this.inputs['fname'] = ref;
                  }}
                  onChangeText={(text) => {
                    this.onChange('fname', text);
                  }}
                  onSubmitEditing={() => {
                    this.focusNextField('lname');
                  }}
                />
                <Input
                  required

                  handleBlur={ () => this.onBlur('lname') }
                  handleFocus={ () => this.onFocus('lname') }
                  inputStyle={{ 
                    borderColor: this.state.lname.borderColor, borderWidth:1,
                    borderRadius:3,
                    // shadowColor: this.state.shadow,
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 1,
                    // },
                    // shadowOpacity: 0.20,
                    // shadowRadius: 1.41,
                    // elevation: 2,
                    // color:colors.grey
                  }} 

                  placeholder="Last Name"
                  // label="Last name"
                  textValue={this.state.lname}
                  returnKeyType="next"
                  onRef={(ref) => {
                    this.inputs['lname'] = ref;
                  }}
                  onChangeText={(text) => {
                    this.onChange('lname', text);
                  }}
                  onSubmitEditing={() => {
                    this.focusNextField('email');
                  }}
                />
                <Input
                  required

                  handleBlur={ () => this.onBlur('email') }
                  handleFocus={ () => this.onFocus('email') }
                  inputStyle={{ 
                    borderColor: this.state.email.borderColor, borderWidth:1,
                    borderRadius:3,
                    // shadowColor: this.state.shadow,
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 1,
                    // },
                    // shadowOpacity: 0.20,
                    // shadowRadius: 1.41,
                    // elevation: 2,
                    // color:colors.grey
                  }} 

                  placeholder="Email"
                  // label="Email"
                  keyboardType={'email-address'}
                  textValue={this.state.email.value}
                  returnKeyType="next"
                  onRef={(ref) => {
                    this.inputs['email'] = ref;
                  }}
                  onChangeText={(text) => {
                    this.onChange('email', text);
                  }}
                  onSubmitEditing={() => {
                    this.focusNextField('phoneNumber');
                  }}
                />
                <Input
                  required

                  handleBlur={ () => this.onBlur('phoneNumber') }
                  handleFocus={ () => this.onFocus('phoneNumber') }
                  inputStyle={{ 
                    borderColor: this.state.phoneNumber.borderColor, borderWidth:1,
                    borderRadius:3,
                    // shadowColor: this.state.shadow,
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 1,
                    // },
                    // shadowOpacity: 0.20,
                    // shadowRadius: 1.41,
                    // elevation: 2,
                    // color:colors.grey
                  }} 

                  placeholder="Mobile Number"
                  // label="Mobile No."
                  textValue={this.state.phoneNumber.value}
                  returnKeyType="next"
                  onRef={(ref) => {
                    this.inputs['phoneNumber'] = ref;
                  }}
                  onChangeText={(text) => {
                    this.onChange('phoneNumber', text);
                  }}
                  keyboardType={'phone-pad'}
                  onSubmitEditing={() => {
                    this.focusNextField('address');
                  }}
                />
                <Input
                  required

                  handleBlur={ () => this.onBlur('address') }
                  handleFocus={ () => this.onFocus('address') }
                  inputStyle={{ 
                    borderColor: this.state.address.borderColor, borderWidth:1,
                    borderRadius:3,
                    // shadowColor: this.state.shadow,
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 1,
                    // },
                    // shadowOpacity: 0.20,
                    // shadowRadius: 1.41,
                    // elevation: 2,
                    // color:colors.grey,
                    height: 100
                  }} 

                  placeholder="Address"
                  // label="Address"
                  textValue={this.state.address.value}
                  onRef={(ref) => {
                    this.inputs['address'] = ref;
                  }}
                  onChangeText={(text) => {
                    this.onChange('address', text);
                  }}
                  multiline={true}
                  // inputStyle={{height: 100}}
                />

              </View>
             
              <View style={{flexDirection:'row', margin: metrics.defaultMargin, borderRadius:3}}>
                  {this.state.loading ? (
                    <View style={[styles.btn,{backgroundColor:colors.primary}]}>
                        <BarIndicator color="white" size={28} />
                    </View>
                    ) : (
                      <>
                        
                          <TouchableWithoutFeedback
                          onPress={() => {
                            this.onButtonPress();
                          }}>
                          <View style={[styles.btn,{backgroundColor:colors.primary}]}>
                            <Text style={[styles.btnText,{color:'white'}]} >Order Now!</Text>
                          </View>
                          </TouchableWithoutFeedback>
                      </>
                    )}
                
              </View>
              </View>
            </KeyboardAwareScrollView>
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Cart} />
          </View>
        )}
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.primaryBold,
    fontSize: 28,
    marginVertical: metrics.defaultMargin,
    textAlign:'center'
  },
  buttonView: {
    backgroundColor: 'red',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    borderTopStartRadius: 30,
    paddingHorizontal: 30,
    marginLeft: metrics.defaultMargin,
    minHeight: 80,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.primaryBold,
  },
  iconView: {
    backgroundColor: 'rgb(255,255,255)',
    width: 50,
    marginRight: '5%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
  icon: {
    fontSize: 28,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: metrics.defaultMargin
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    fontWeight:'bold'
  },
  text: {
    fontFamily: fonts.secondary,
    fontSize: 16,
    color:colors.grey
  },
  btn:{
    flex:1,
    backgroundColor:'red',
    marginTop:metrics.defaultMargin,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    paddingVertical:metrics.smallMargin,

  },
  btnText:{
    textAlign:'center',
    fontWeight:'bold',
    fontFamily: fonts.secondaryBold,
    fontSize: 18,
  },
  infoContainer:{
    backgroundColor:'white',
    margin: metrics.defaultMargin,
    borderRadius:20,
    borderWidth:1,
    borderColor: colors.primary,
    paddingTop: metrics.defaultMargin
    },
});

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps, {addItem, deleteItem, emptyCart})(
  Checkout,
);
