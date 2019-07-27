import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, AsyncStorage, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../../components/Button';
import { CircleWithText } from '../../components/CircleWithText'
import AIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modalbox'
import { Form, Field } from 'react-native-validate-form'
import InputField from '../../components/InputField'
import { styles } from './styles'

import Color from '../../config/Color'

const required = value => (value ? undefined : 'Required');
const weight = value => value && ( value < 30 || value > 200) ? 'Should be in range 30-300' : undefined;
const height = value => value && ( value < 100 || value > 270) ? 'Should be in range 100-270' : undefined;
const isNumber = value => value && (isNaN(parseFloat(value)) && !isFinite(value)) ? 'Should be number' : undefined;

export default class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      errors: [],
      isOpen: false,
      activityInfo: false,
      bodyInfo: false,
      isEdit: false,
      data: {
        weight: '',
        height: '',
      },
      user: {
        name: '',
        age: '',
        gender: '',
        status: '',
        weight: '',
        height: '',
        bmi: '',
        carbohydrate: '',
        protein: '',
        fat: '',
        activity_level: '',
      }
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onChange(key, text) {
    const data = this.state.data
    data[key] = text
    this.setState({ data })
  }

  async onSubmit() {
    const token = await AsyncStorage.getItem('token');
    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + token}
    let response = await fetch(`http://103.252.100.230/fact/member/user`, {method: 'PUT', body, headers})
    let json = await response.json()
    console.log("JSON #1", json)
    if (json.message === "Success") {
      this.onRefresh()
      Alert.alert('Success','Height and Weight updated',[{text:'OK',onPress: ()=>this.setState({isEdit:!this.state.isEdit})}])
    }
  }

  async onRefresh() {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/user`, {headers})
    const json = await response.json()
    console.log("profile json",json)
    const user = {
      name: json.results.name,
      age: new Date().getFullYear() - json.results.birth_year,
      gender: json.results.gender == 1 ? "male" : "female",
      status: json.results.status,
      weight: json.results.weight,
      height: json.results.height,
      bmi: json.results.bmi,
      carbohydrate: json.results.carbohydrate,
      protein: json.results.protein,
      fat: json.results.fat,
      activity_level: json.results.activity_level
    }
    const data = {
      weight: json.results.weight.toString(),
      height: json.results.height.toString()
    }

    this.setState({ user })
    this.setState({ data })
  }

  editProfile = () => {
    this.props.navigation.navigate('EditProfile')
  }

  changePass = () => {
    this.props.navigation.navigate('ChangePassword')
  }

  logout = () => {
    this.setState({isOpen:!this.state.isOpen})
  }

  myActivity = () => {
    this.props.navigation.navigate('MyActivity')
  }

  toggleActivity = () => {
    this.setState({activityInfo:!this.state.activityInfo})
  }

  toggleBody = () => {
    this.setState({bodyInfo:!this.state.bodyInfo})
  }

  toggleEdit = () => {
    this.setState({isEdit:!this.state.isEdit})
  }

  goToBase = async () => {
    await AsyncStorage.setItem('token', '')
    this.props.navigation.navigate('Base')
    this.setState({isOpen:false})
  }

  componentDidMount() {
    const { navigation } = this.props;
    // this.focusListener = navigation.addListener("didFocus", () => {
    //   console.log("did focus")
      this.onRefresh()
    // });
  }

  renderAdvice = (level) => {
    if (level == "Low")
        return "Try to exercise more, start by 1 hours per day. There are many advantages you can get from it."
    else if (level == "Medium")
        return "Good job! Keep it up, but don't push yourself too hard. Your body also need time to rest."
    else
        return "Make sure you have rest time equal to your activity/exercise."
  }

  renderPict = (level) => {
    if (level == "Low")
      return require('../../assets/img/light.png')
    else if (level == "Medium")
      return require('../../assets/img/medium.png')
    else
      return require('../../assets/img/very.png')
  }

  renderParagraph = (level) => {
    if (level == "Low")
        return "75% of sitting/standing and 25% of standing/moving. Example of jobs : Designer, Office (Desk) Employee, Teacher, Host, and etc. In leisure time, have little or no exercise. Doing housework is included in this level. If doing exercise will be about 1-2 days/week."
    else if (level == "Medium")
        return "40% of sitting/standing and 60% of working (moving). Example of jobs : Nurse, Chef, Server at restaurants, Trainer, and etc. Example of exercises such as light swimming/cycling, jogging, playing double tennis and etc. Gardening is included in this level of activity. If doing exercise will be about 3-5 days/week."
    else
        return "25% of sitting/standing and 75% of working (lifting and moving). Jobs that demand physical strength are included in this level such as construction workers, farmer. athlete and etc. Example of exercises such as swimming laps, running, hiking, jumping rope, playing single tennis and etc. If doing exercise will be about 6-7 days/week and 2 times/day for athlete."
  }

  submitForm = () => {
    let submitResults = this.myForm.validate();

    let errors = [];

    submitResults.forEach(item => {
      errors.push({ field: item.fieldName, error: item.error });
    });

    this.setState({ errors: errors });
  }

  renderSource = (gender) => {
    if (gender == 1)
      return require('../../assets/img/male.png')
    else
      return require('../../assets/img/female.png')
  }

  render(){
    return(
      <View style={styles.container}>
        <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.RED,Color.LIGHT_RED]} style={styles.coloredCont}>
            {/*<TouchableOpacity style={{alignSelf:'flex-end'}} onPress={this.editProfile}>
                <MIcon name="edit" size={24} color={Color.APP_WHITE} />
            </TouchableOpacity>*/}
            {(this.state.user.gender === 'male')
              ? <Image style={styles.image} source={require('../../assets/img/male.png')} />
              : <Image style={styles.image} source={require('../../assets/img/female.png')} />}
            <Text style={styles.name}>{this.state.user.name}</Text>
            <Text style={styles.status}>{this.state.user.age} y.o {this.state.user.gender}</Text>
            <Text style={styles.status}>{this.state.user.status}</Text>
        </LinearGradient>
        <View style={styles.row}>
            <TouchableOpacity style={styles.buttonInRow} onPress={this.toggleBody}>
              <IonIcon name="md-body" size={30} color={Color.RED} />
              <Text style={styles.buttonText}>Body</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonInRow} onPress={this.toggleActivity}>
              <FaIcon name="line-chart" size={30} color={Color.RED} />
              <Text style={styles.buttonText}>Activity Level</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonInRow} onPress={this.myActivity}>
              <FaIcon name="list-alt" size={30} color={Color.RED}/>
              <Text style={styles.buttonText}>My Activities</Text>
            </TouchableOpacity>
        </View>
        <TouchableHighlight onPress={this.changePass} underlayColor={Color.LIGHTER_GREY}>
          <View style={styles.longRowButton} >
            <Text style={styles.longRowText}>Edit Profile</Text>
            <AIcon name="right" size={20} color={Color.FONT_GREY} />
          </View>
        </TouchableHighlight>
        <View style={styles.buttonCont}>
          <Button text="LOG OUT" txtColor={Color.APP_WHITE} bgColor={Color.LIGHT_RED} size="long" onPress={this.logout} />
        </View>
        <Modal style={styles.smallModal} coverScreen={true} position="center" isOpen={this.state.isEdit} backdropPressToClose={false} swipeToClose={false}>
            <View style={[styles.headerModal,{margin: 0}]}>
              <Text style={styles.modalTitle}>EDIT</Text>
              <TouchableOpacity onPress={this.toggleEdit}>
                <AIcon name="close" size={20} color={Color.FONT_GREY} />
              </TouchableOpacity>
            </View>
            <Form
              ref={(ref) => this.myForm = ref}
              validate={true}
              submit={this.onSubmit}
              errors={this.state.errors} // you still need to pass errors as props to Form
            >
              <View style={styles.row}>
                <Text style={styles.label}>Weight</Text>
                <Field
                    required
                    component={InputField}
                    validations={[ required, weight, isNumber ]}
                    name="weight"
                    value={this.state.data.weight}
                    onChangeText={(val) => this.onChange('weight',val)}
                    customStyle={styles.numInput}
                    keyboardType="numeric"
                    errors={this.state.errors} // explicitly pass down errors as props if your <Field /> is inside an element
                  />
                <Text style={styles.text}>kg</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Height</Text>
                <Field
                  required
                  component={InputField}
                  validations={[ required, height, isNumber ]}
                  name="height"
                  value={this.state.data.height}
                  keyboardType="numeric"
                  onChangeText={(val) => this.onChange('height', val)}
                  customStyle={styles.numInput}
                  errors={this.state.errors} // explicitly pass down errors as props if your <Field /> is inside an element
                />
                <Text style={styles.text}>cm</Text>
              </View>
            </Form>
            <TouchableOpacity onPress={this.submitForm}>
              <Text style={styles.modalButton}>OK</Text>
            </TouchableOpacity>
        </Modal>
        <Modal style={styles.bottomModal} position="bottom" isOpen={this.state.bodyInfo} coverScreen={true} backdropPressToClose={false} swipeToClose={true}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>BODY INFORMATION</Text>
              <TouchableOpacity onPress={this.toggleBody}>
                <AIcon name="close" size={20} color={Color.FONT_GREY} />
              </TouchableOpacity>
            </View>
            <View style={styles.roundedBox}>
              <View style={styles.half}>

                <View style={[styles.row,styles.evenly]}>
                  <Text style={styles.label}>Weight</Text>
                  <Text style={styles.text}>:</Text>
                  <Text style={[styles.text,styles.info]}>{this.state.user.weight} kg</Text>
                </View>
                <View style={[styles.row,styles.evenly]}>
                  <Text style={styles.label}>Height</Text>
                  <Text style={styles.text}>:</Text>
                  <Text style={[styles.text,styles.info]}>{this.state.user.height} cm</Text>
                </View>
                <View style={[styles.row,styles.evenly]}>
                  <Text style={styles.label}>BMI</Text>
                  <Text style={styles.text}>:</Text>
                  <Text style={[styles.text,styles.info]}>{parseFloat(this.state.user.bmi).toFixed(1)}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={this.toggleEdit}>
                <MIcon name="edit" size={20} color={Color.RED} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.label,styles.belowMargin]}>Nutritions</Text>
            <View style={[styles.row,styles.evenly]}>
              <CircleWithText number={this.state.user.carbohydrate} type="carb" />
              <CircleWithText number={this.state.user.protein} type="pro" />
              <CircleWithText number={this.state.user.fat} type="fat" />
            </View>
        </Modal>
        <Modal style={styles.bottomModal} position="bottom" isOpen={this.state.activityInfo}
          coverScreen={true}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>ACTIVITY LEVEL</Text>
              <TouchableOpacity onPress={this.toggleActivity}>
                <AIcon name="close" size={20} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.bold,styles.belowMargin]}>{this.state.user.activity_level.toUpperCase()}</Text>
            <View style={[styles.row,styles.belowMargin]}>
              <Image style={styles.square} source={this.renderPict(this.state.user.activity_level)} />
              <Text style={[styles.text,styles.paragraph]}>{this.renderParagraph(this.state.user.activity_level)}</Text>
            </View>
            <View style={[styles.roundedBox,styles.vertical]}>
              <Text style={styles.bold}>Advices :</Text>
              <Text style={styles.text}>{this.renderAdvice(this.state.user.activity_level)}</Text>
            </View>
        </Modal>
        <Modal style={styles.extraSmallModal} position="center" isOpen={this.state.isOpen} backdropPressToClose={false} swipeToClose={false}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>LOG OUT</Text>
              <TouchableOpacity onPress={this.logout}>
                <AIcon name="close" size={20} color={Color.FONT_GREY} />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>Are you sure you want to log out your account?</Text>
            <View style={styles.blankRow} >
              <View style={styles.blank}/>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity onPress={()=>this.setState({isOpen:false})}>
                  <Text style={styles.modalButton}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToBase}>
                  <Text style={styles.modalButton}>YES</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
    )
  }
}
