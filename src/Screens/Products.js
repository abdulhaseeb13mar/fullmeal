import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Header from '../Components/Header';
import Button from '../Components/Button';
import RootView from '../Components/Wrapper';
import SearchBar from '../Components/SearchBar';
import CardComponent from '../Components/FoodCard';
import {colors, fonts, metrics, text} from '../utils/Theme';
import {connect} from 'react-redux';
import data from '../../data';
import {ItemCard, FoodCard, Wrapper} from '../Components';


export class Products extends React.Component {
    state={
        list:[]
    };
    componentDidMount(){
        if(this.props.route.params.category){
            let list=this.props.products.filter((val) =>
            val.categoryid==this.props.route.params.category
          );
          this.setState({list})
        }else{
            this.setState({list: this.props.products})
        }
    }
    UNSAFE_componentWillReceiveProps(props) {
        if(this.props.route.params.category){
            let list=props.products.filter((val) =>
            val.categoryid==props.route.params.category
          );
          this.setState({list})
        }else{
            this.setState({list: this.props.products})
        }
      }
    render() {
        // console.log('items in', this.props.route.params.items)
        return (
            <Wrapper bottom={0}>
            <Header textStyle={{fontWeight:'bold'}} title="Products" />
            <View style={{paddingBottom:metrics.largeMargin*2}} >
                {/* <HorizontalList
                    style={{ paddingTop: 5 }}
                    horizontal={false}
                    data={this.props.route.params.items}
                    renderItem={({ item }) => (
                        <FoodCard item={item} />
                    )}
                /> */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    // data={list}
                    data={this.state.list}
                    style={{padding: metrics.defaultMargin}}
                    keyExtractor={() => Math.random().toString()}
                    renderItem={({item}) => (
                    <FoodCard
                        item={item}
                        // style={{marginBottom: metrics.defaultMargin, width: '100%'}}
                    />
                    )}
                />
            </View>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      products: state.products,
    };
  };
  
  export default connect(mapStateToProps)(Products);
