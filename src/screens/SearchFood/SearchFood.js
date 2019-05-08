import React from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AIcon from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modalbox'
import { styles } from './styles'
import { Badge } from '../../components/Badge';
import { FoodItem } from '../../components/FoodItem'
import NumericInput from 'react-native-numeric-input'
import { CircleWithText } from '../../components/CircleWithText'


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

export default class SearchFood extends React.Component{
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

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{backgroundColor:'grey',flexDirection:'row',alignItems:'center',padding:10,justifyContent:'space-between'}}>
          <TouchableOpacity onPress={this.back}>            
            <Icon name="md-arrow-round-back" color="black" size={25} />      
          </TouchableOpacity>
          <TextInput placeholder="Search Food" style={{borderRadius:20,borderWidth:1,backgroundColor:'white',width:300}} value={this.state.search} />
        </View>
        {/* <View style={{flex:1}} >
          <Text>History</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Badge text="Noodles" onPress={this.fillSearch}/>
            <Badge text="Rice" onPress={this.fillSearch}/>
            <Badge text="Egg" onPress={this.fillSearch}/>
          </View>
          <View style={{alignItems:'center'}}>
              <Icon name="md-search" size={50} />
              <Text>You can search using</Text>
              <Text>any keywords or use</Text>
              <Text>the ones in the history</Text>
          </View>
        </View> */}
        <View style={{flex:1}}>
            <Text>Search Result</Text>
            <FlatList
              data={this.state.data}
              keyExtractor={item=>item.id}
              renderItem={this._renderItem}
            />
        </View>
        <Modal style={styles.modal} position="center" isOpen={this.state.isOpen}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={styles.modalTitle}>ADD FOOD</Text>
              <TouchableOpacity onPress={this.toggleModal}>
                <AIcon name="close" size={24} />
              </TouchableOpacity>
            </View>
            <Text>Fried Noodles</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <NumericInput 
                    value={this.state.value} 
                    onChange={value => this.setState({value})} 
                    iconSize={25}
                    type="up-down" />
                  <Text>Serving</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text>200</Text>
                  <Text>KCAL</Text>
              </View>
            </View>
            <Text style={{textDecorationLine:'underline'}}>Nutrition Informations</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <CircleWithText number="70" type="carb" />
              <CircleWithText number="20" type="pro" />
              <CircleWithText number="50" type="fat" />
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',paddingHorizontal:20}}>
              <TouchableOpacity>
                <Text>ADD</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>CANCEL</Text>
              </TouchableOpacity>
            </View>
        </Modal>
      </View>
    )
  }
}