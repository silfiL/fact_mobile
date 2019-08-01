import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StatusBar, AsyncStorage} from 'react-native'
import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/AntDesign'
import FloatingLabel from 'react-native-floating-labels'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { GridButton } from '../../components/GridButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'
import { Form, Field } from 'react-native-validate-form';
import InputField  from '../../components/InputField'

import Color from '../../config/Color'

const required = value => (value ? undefined : 'Required');
const calories = value => value && ( value < 0 || value > 5000) ? 'Food Calories should be in range 0-5000 kcal' : undefined;
const nutrient = value => value && ( value < 0 || value > 100) ? 'Carb/Protein/Fat should be in range 0-100 g' : undefined;
const isNumber = value => value && (isNaN(parseFloat(value)) && !isFinite(value)) ? 'Total Calories/Carb/Protein/Fat should be number' : undefined;
const name = value => value && !/^[a-z].*/i.test(value) ? 'Food name should start with letter (A-Z)' : undefined;
const nameLength = value => value && value.length > 30 ? "Food name's maximum is 40 characters" : undefined;

export default class AddFood extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      //value: 0,
      data: {
        name: '',
        fat: '0',
        calorie: '',
        protein: '0',
        carbohydrate: '0',
        category: 0
      },
      errMessage: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(key, text) {
    const data = this.state.data
    data[key] = text
    this.setState({ data })
  }

  onSubmit = async() => {
    console.log("INi jalan kok")
    const body = JSON.stringify(this.state.data)
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}

    console.log(headers, body)
    let response = await fetch(`http://103.252.100.230/fact/member/food`, {method: 'POST', body, headers})
    let json = await response.json()
    console.log("add custom json",json)

    if (json.message === 'Success') {
      const data = {
        name: '',
        fat: '',
        calorie: '',
        protein: '',
        carbohydrate: '',
        category: 1
      }

      await this.setState({data, isOpen:!this.state.isOpen})
    } else
      this.setState({errMessage: json.message})
  }

  back = () => {
    this.props.navigation.goBack();
  }

  toggleModal = () => {
    const data = {
        name: '',
        fat: '0',
        calorie: '',
        protein: '0',
        carbohydrate: '0',
        category: 0
    }
    this.setState({isOpen:!this.state.isOpen,data:data,errMessage:''})
  }

  goToSearch = () => {
    this.props.navigation.navigate('SearchFood', {
      id: this.props.navigation.state.params.id,
      onDiaryRefresh: this.props.navigation.state.params.onDiaryRefresh,
      date: this.props.navigation.state.params.date
    })
  }

  recent = () => {
    this.props.navigation.navigate('RecentFood', {
      id: this.props.navigation.state.params.id,
      onDiaryRefresh: this.props.navigation.state.params.onDiaryRefresh,
      date: this.props.navigation.state.params.date
    })
  }

  meal = () => {
    this.props.navigation.navigate('Meal', {
      id: this.props.navigation.state.params.id,
      onDiaryRefresh: this.props.navigation.state.params.onDiaryRefresh,
      date: this.props.navigation.state.params.date
    })
  }

  categories = () => {
    this.props.navigation.navigate('CategoryList',{
      id: this.props.navigation.state.params.id,
      date: this.props.navigation.state.params.date
    })
  }

  submitForm = () => {
    this.setState({errMessage: ''})
    let submitResults = this.myForm.validate();

    let errors = [];

    submitResults.forEach(item => {
      errors.push({ field: item.fieldName, error: item.error });
    });

    this.setState({ errors: errors });
  }

  render(){
    let title = ''
    switch (this.props.navigation.state.params.id) {
      case 1: title = 'BREAKFAST'; break;
      case 2: title = 'LUNCH'; break;
      case 3: title = 'DINNER'; break;
      case 4: title = 'SNACK'; break;
    }
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.GREEN} barStyle="light-content" />
        <View style={styles.header}>
          <HeaderBackButton title={title} onPressBack={this.back} iconColor={Color.APP_WHITE} />
          <TextInput placeholder="Search Food Name" style={styles.search} placeholderTextColor={Color.LIGHT_GREY} onFocus={this.goToSearch}/>
        </View>
        <View style={styles.center}>
          <View style={styles.row}>
            <GridButton text="Recent" iconName="history" bgColor="#22747c" iconColor={Color.LIGHT_GREEN} onPress={this.recent}/>
            <GridButton text="Categories" iconName="format-list-bulleted" bgColor="#e8aa00" iconColor={Color.LIGHT_YELLOW} onPress={this.categories}/>
          </View>
          <View style={styles.row}>
            <GridButton text="Meal" iconName="food" bgColor={Color.BLUE} iconColor={Color.LIGHT_BLUE} onPress={this.meal}/>
            <GridButton text="Custom" iconName="plus" bgColor="#d65640" iconColor="#f9917f" onPress={this.toggleModal}/>
          </View>
          <Footer color={Color.FONT_GREY}/>
        </View>
        <Modal style={styles.modal} position="center" isOpen={this.state.isOpen} backdropPressToClose={false}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>ADD CUSTOM FOOD</Text>
              <TouchableOpacity onPress={this.toggleModal}>
                <Icon name="close" size={20} color={Color.FONT_GREY} />
              </TouchableOpacity>
            </View>
            {this.state.errMessage !== '' && <Text style={styles.errMessage}>{this.state.errMessage}</Text>}
            <Form
              ref={(ref) => this.myForm = ref}
              validate={true}
              submit={this.onSubmit}
              errors={this.state.errors}
            >
              <View style={styles.formRow}>
                <Text style={styles.label}>Food Name</Text>
                <Field
                    required
                    component={InputField}
                    validations={[ required, name, nameLength ]}
                    name="name"
                    placeholder="Enter Food Name"
                    value={this.state.data.name}
                    onChangeText={(val) => this.onChange('name',val)}
                    customStyle={styles.input}
                    errors={this.state.errors}
                    />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Total Calories (in kcal)</Text>
                <Field
                    required
                    component={InputField}
                    validations={[ required, isNumber, calories ]}
                    name="calorie"
                    placeholder="Enter Total Calorie"
                    value={this.state.data.calorie}
                    onChangeText={(val) => this.onChange('calorie',val)}
                    customStyle={styles.input}
                    keyboardType="decimal-pad"
                    errors={this.state.errors}
                    />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Total Carb (in g)</Text>
                <Field
                    required
                    component={InputField}
                    validations={[ isNumber, nutrient ]}
                    name="carb"
                    placeholder="Enter Total Carb"
                    value={this.state.data.carbohydrate}
                    onChangeText={(val) => this.onChange('carbohydrate',val)}
                    customStyle={styles.input}
                    keyboardType="decimal-pad"
                    errors={this.state.errors}
                    />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Total Protein (in g)</Text>
                <Field
                    required
                    component={InputField}
                    validations={[ isNumber, nutrient ]}
                    name="protein"
                    placeholder="Enter Total Protein"
                    value={this.state.data.protein}
                    onChangeText={(val) => this.onChange('protein',val)}
                    customStyle={styles.input}
                    keyboardType="decimal-pad"
                    errors={this.state.errors}
                    />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Total Fat (in g)</Text>
                <Field
                    required
                    component={InputField}
                    validations={[ isNumber, nutrient ]}
                    name="fat"
                    placeholder="Enter Total Fat"
                    value={this.state.data.fat}
                    onChangeText={(val) => this.onChange('fat',val)}
                    customStyle={styles.input}
                    keyboardType="decimal-pad"
                    errors={this.state.errors}
                    />
              </View>
            </Form>
            <View style={styles.blankRow} >
              <View style={styles.blank}/>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity onPress={this.submitForm}>
                  <Text style={styles.modalButton}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleModal}>
                  <Text style={styles.modalButton}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
    )
  }
}
