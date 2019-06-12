import React from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AIcon from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modalbox'
import { styles } from './styles'
import { Badge } from '../../components/Badge';
import { FoodItem } from '../../components/FoodItem'
import NumericInput from 'react-native-numeric-input'
import { CircleWithText } from '../../components/CircleWithText'

import Color from '../../config/Color'
import { FloatingButton } from '../../components/FloatingButton';

const foodArr = [{
  id: '1',
  name: 'Fried Noodles',
  calorie: '200 KCAL',
  portion: 1
},{
  id: '2',
  name: 'Fried Noodles',
  calorie: '200 KCAL',
  portion: 1
},{
  id: '3',
  name: 'Fried Noodles',
  calorie: '200 KCAL',
  portion: 1
},{
  id: '4',
  name: 'Fried Noodles',
  calorie: '200 KCAL',
  portion: 1
},{
  id: '5',
  name: 'Fried Noodles',
  calorie: '200 KCAL',
  portion: 1
},]

export default class SearchFoodMeal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      value: 0,
      search: '',
      data: foodArr
    }
  }

  back = () => {
    this.props.navigation.goBack();
  }

  toggleModal = () => {
    this.setState({isOpen:!this.state.isOpen})
  }

  fillSearch = () => {
    console.log(this.props.text)
    this.setState({search:this.props.text})
  }

  _renderItem = ({item}) => (
    <FoodItem
      id={item.id}
      name={item.name}
      onPressItem={this.toggleModal}
      calorie={item.calorie}
      portion={item.portion}
    />
  );

  addInMeal = () => {
    this.props.navigation.navigate('AddInMeal')
  }

  render(){
    return(
      <View style={styles.container}>
          <StatusBar backgroundColor={Color.BLUE} barStyle="dark-content" />
          <View style={styles.rowSearch}>
            <TouchableOpacity onPress={this.back}>            
              <Icon name="md-arrow-round-back" color={Color.APP_WHITE} size={24} />      
            </TouchableOpacity>
            <TextInput placeholder="Search Food" placeholderTextColor={Color.LIGHT_GREY} style={styles.search} />
          </View>
         {this.state.search==''?<View style={styles.blankContainer} >
          <Text style={styles.text}>History</Text>
          <View style={styles.row}>
            <Badge text="Noodles" onPress={this.fillSearch} bgColor={Color.LIGHT_BLUE}/>
            <Badge text="Rice" onPress={this.fillSearch} bgColor={Color.LIGHT_BLUE}/>
            <Badge text="Egg" onPress={this.fillSearch} bgColor={Color.LIGHT_BLUE}/>
          </View>
          <View style={styles.center}>
              <Icon name="md-search" size={50} color={Color.FONT_GREY} />
              <Text style={styles.centerText}>You can search using</Text>
              <Text style={styles.centerText}>any keywords or use</Text>
              <Text style={styles.centerText}>the ones in the history</Text>
          </View>
          <FloatingButton bgColor={Color.BLUE} iconName="shopping-basket" onPress={this.addInMeal}/>
        </View>: 
        <View style={styles.blankContainer}>
            <Text style={styles.text}>Search Results</Text>
            <FlatList
              data={this.state.data}
              keyExtractor={item=>item.id}
              renderItem={this._renderItem}
            />
        </View>}
        <Modal style={styles.modal} position="center" isOpen={this.state.isOpen}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>ADD FOOD</Text>
              <TouchableOpacity onPress={this.toggleModal}>
                <AIcon name="close" size={20} color={Color.FONT_GREY} />
              </TouchableOpacity>
            </View>
            <Text style={styles.foodName}>Fried Noodles</Text>
            <View style={styles.blankRow}>
              <View style={[styles.row,styles.noMargin]}>
                  <NumericInput
                    value={this.state.value} 
                    onChange={value => this.setState({value})} 
                    iconSize={18}
                    type="up-down" />
                  <Text style={styles.right}>Serving</Text>
              </View>
              <View style={styles.row}>
                  <Text style={styles.kcal}>200</Text>
                  <Text style={styles.right}>KCAL</Text>
              </View>
            </View>
            <Text style={styles.underline}>Nutrition Informations</Text>
            <View style={[styles.blankRow,styles.marginVertical]}>
              <CircleWithText number="70" type="carb" />
              <CircleWithText number="20" type="pro" />
              <CircleWithText number="50" type="fat" />
            </View>
            <View style={styles.blankRow} >
              <View style={styles.blank}/>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity>
                  <Text style={styles.modalButton}>ADD</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modalButton}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
    )
  }
}