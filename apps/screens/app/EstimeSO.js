import React, { Component } from "react";
import {
  Alert,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import _ from "lodash";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import { base_url } from "../../configs/const";
import { Theme } from "../../configs/theme";
import { Button, Footer, IconTextBox } from "../../components";
import { StylePanel } from "../../configs/styles";
import stringsoflanguages from "../../locale";
import Checkbox from "../../components/Checkbox";
const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true
  }
};
export default class EstimateSO extends Component {
  state = {
    selectedStar: 0,
    comment: "",
    imgUrl: "",
    height: 1,
    selectedCategoryTab: [],
    selectedTab: 0,
    selectedComplaints: [],
    categoryTab: [
      {
        name: "comfort",
        complaints: [
          { _id: "01", name: "Кондиционирование", isChecked: false },
          { _id: "02", name: "Отопление", isChecked: false },
          {
            _id: "03",
            name: "Функционирующий санузел",
            isChecked: false
          },
          { _id: "04", name: "Места для сидения", isChecked: false },
          {
            _id: "05",
            name: "Место для составления документов",
            isChecked: false
          }
        ]
      },
      {
        name: "service",
        complaints: [
          { _id: "06", name: "Образцы заявлений", isChecked: false },
          { _id: "07", name: "Информационные стенды", isChecked: false },
          { _id: "08", name: "График личного приёма", isChecked: false },
          {
            _id: "09",
            name: "График судебных заседаний",
            isChecked: false
          },
          {
            _id: "10",
            name: "Организация приёма/ выдачи документов",
            isChecked: false
          },
          { _id: "11", name: "Пропускной режим", isChecked: false },
          {
            _id: "12",
            name: "Условия для маломобильных групп",
            isChecked: false
          },
          { _id: "13", name: "Качество АВФ", isChecked: false }
        ]
      },
      {
        name: "procedure",
        complaints: [
          {
            _id: "14",
            name: "Своевременность извещений",
            isChecked: false
          },
          {
            _id: "15",
            name: "Своевременность выдачи судебных актов/ документов",
            isChecked: false
          },
          {
            _id: "16",
            name: "Возможность проведения дистанционного судебного процесса",
            isChecked: false
          },
          {
            _id: "17",
            name: "Своевременность выдачи АВФ",
            isChecked: false
          },
          {
            _id: "18",
            name: "Разъяснение судебного акта",
            isChecked: false
          }
        ]
      },
      {
        name: "personal",
        complaints: [
          { _id: "19", name: "Вежливость", isChecked: false },
          { _id: "20", name: "Компетентность", isChecked: false },
          { _id: "21", name: "Полнота информации", isChecked: false },
          {
            _id: "22",
            name: "Cоблюдение закона о языках",
            isChecked: false
          },
          { _id: "23", name: "Обратная связь", isChecked: false }
        ]
      }
    ]
  };

  cons = this.props.navigation.getParam("cons", "default");
  vedom = this.props.navigation.getParam("vedom", "default");
  componentDidMount() {
    console.log("complaint", this.cons._id);
  }
  handleStar = selectedStar => {
    this.setState({
      selectedStar
    });
  };
  handleSendBtn = () => {
    if (this.state.selectedStar === 0) {
      Alert.alert("Оцените учреждения по 5 шкaле перед отпрaвкой жaлобы");
    } else {
      this.setState(state => ({
        selectedCategoryTab: state.categoryTab
      }));
      this.postReview();
    }
  };

  // clear = () => {
  //     for (var i = 0; i < this.state.selectedCategoryTab.length; i++) {
  //       _.remove(this.state.categoryTab[i].complaints, function(e) {
  //         return e.isChecked === false;
  //       });
  //     }
  //     _.remove(this.state.categoryTab, function(e) {
  //       return e.complaints.length === 0;
  //     });
  //     const result = this.state.categoryTab.map(cactegory =>  ({
  //       ...cactegory,
  //       complaints: cactegory.complaints.map(comp => comp.name)
  //     }))
  //     this.setState({
  //       result:JSON.stringify(result)
  //     })
  //     console.log("result: " + JSON.stringify(result));
  //         console.log(this.state.categoryTab, "DDDD");

  //   };

  async postReview() {
    const { selectedStar, selectedCategoryTab, imgUrl, comment } = this.state;

    const token = await AsyncStorage.getItem("id_token");
    const user_id = await AsyncStorage.getItem("user_id");
    console.log("USER_ID", user_id, "TOKEN_REVIEW", token);
    var currentDate = new Date();
    var currentHour = currentDate.getHours();

    //lodash
    for (var i = 0; i < selectedCategoryTab.length; i++) {
      console.log(
        "this.state.selectedCategoryTab[i].complaints",
        selectedCategoryTab[i].complaints
      );
    }

    for (var i = 0; i < selectedCategoryTab.length; i++) {
      _.remove(selectedCategoryTab[i].complaints, function(e) {
        return e.isChecked === false;
      });
    }
    // _.remove(this.state.selectedCategoryTab, function(e) {
    //   return e.complaints.length === 0;
    // });

    const result = selectedCategoryTab.map(cactegory => ({
      ...cactegory,
      complaints: cactegory.complaints.map(comp => {
        if (comp.isChecked) {
          return comp.name;
        }
      })
    }));

    this.setState({
      selectedCategoryTab: result
    });
    console.log("this.state.selectedCategoryTab", selectedCategoryTab, result);

    axios
      .post(
        "http://188.166.223.192:9090/review",
        {
          user: user_id, //user_id
          agency: this.cons._id, //con_id
          rating: selectedStar,
          photos: [imgUrl],
          review_category: selectedCategoryTab, //only if rating is not equal to 5 send complaints
          comment: comment
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        console.log(response.data, "REVIEW78");
        this.setState({
          review_id: response.data.id
        });
        console.log(this.state.review_id, "REVIEW78");
        if (currentHour >= 8 && currentHour <= 20) {
          if (selectedStar === 5) {
            this.props.navigation.navigate("Called");
          } else if (selectedStar === 4) {
            this.props.navigation.navigate("WannaBeContacted", {
              review: this.state.review_id
            });
          } else {
            this.props.navigation.navigate("WaitForResponse", {
              review: this.state.review_id
            });
          }
        } else {
          Alert.alert("Жалобы вне рабочее время не принимаются!");
          //  this.props.navigation.navigate("AfterEightPm");
        }
      })
      .catch(error => {
        console.log(error, 66);
      });
  }
  //takePhoto
  chooseImage = () => {
    ImagePicker.showImagePicker(options, response => {
      this.setState({
        avatarSource: response.uri
      });
      console.log("Response = ", response, new Date());

      console.log(this.state.avatarSource, 110);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        let formData = new FormData();
        formData.append("file", {
          uri: response.uri,
          name: "image.png",
          type: "image/jpeg"
        });
        axios
          .post(base_url + "/upload/image", formData)
          .then(response => {
            this.setState({
              imgUrl: response.data.data.url
            });

            console.log(this.state.imgUrl, new Date());
          })
          .catch(err => {
            console.log(err.response, 136);
          });
      }
    });
  };
  handleCategory = (category, i) => {
    this.setState({
      category,
      selectedTab: i
    });
  };

  handleComplaints = _id => {
    const {categoryTab,selectedTab,selectedComplaints}=this.state
    const updatedSelectedCamera = selectedComplaints.find(
      obj => obj === _id
    );

    const selectedComplaint = updatedSelectedCamera
      ? selectedComplaints.filter(obj => obj !== _id)
      : [...selectedComplaints, _id];
    this.setState({
      selectedComplaints:selectedComplaint,
      categoryTab: [
        ...categoryTab.slice(0, selectedTab),
        {
          ...categoryTab[selectedTab],
          complaints: [
            ...categoryTab[selectedTab].complaints.map(
              o => ({
                ...o,
                isChecked: selectedComplaints.includes(o._id)
              })
            )
          ]
        },
        ...categoryTab.slice(selectedTab + 1)
      ]
    });
    console.log(
      "selectedComplaints",
      categoryTab[selectedTab]
    );
  };
  render() {
    const { avatarSource,category,imgUrl, categoryTab, selectedStar, selectedTab } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
            <View style={styles.headerView}>
              <Text style={[StylePanel.centerTextHeader, styles.header]}>
                {stringsoflanguages.estimate.header}
              </Text>
              <Text style={styles.subHeader}>
                {this.cons.name || this.cons.name_of_agency}
              </Text>
              {this.cons.photo ? (
                <Image
                  style={{
                    width: "100%",
                    height: 100,
                    marginTop: 16,
                    resizeMode: "contain"
                  }}
                  source={{
                    uri: base_url + "/" + this.cons.photo
                  }}
                />
              ) : null}
              <StarRating
                maxStars={5}
                rating={selectedStar}
                starSize={35}
                containerStyle={styles.starContainer}
                fullStarColor={Theme.colors.yellow}
                emptyStarColor={Theme.colors.yellow}
                selectedStar={selectedStar => this.handleStar(selectedStar)}
              />

              <View style={styles.contentView}>
                {selectedStar != 0 ? (
                  <React.Fragment>
                    {selectedStar === 5 ? null : ( // </Text> //   Что понравилось? // <Text style={styles.complaintHeader}>
                      <React.Fragment>
                        <Text style={styles.complaintHeader}>
                          {stringsoflanguages.estimate.category}
                        </Text>
                        <View style={styles.categoryBoxContainer}>
                          <IconTextBox
                            boxStyle={[
                              styles.categoryBox,
                              category === "comfort" ? styles.yellowBorder : {}
                            ]}
                            onPress={() => this.handleCategory("comfort", 0)}
                            imgStyle={styles.categoryImage}
                            img={require("../../assets/comfort.png")}
                            titleStyle={styles.categoryTitle}
                            title="КОМФОРТ"
                          />

                          <IconTextBox
                            boxStyle={[
                              styles.categoryBox,
                              category === "service" ? styles.yellowBorder : {}
                            ]}
                            onPress={() => this.handleCategory("service", 1)}
                            imgStyle={styles.categoryImage}
                            img={require("../../assets/service.png")}
                            titleStyle={styles.categoryTitle}
                            title="СЕРВИС"
                          />

                          <IconTextBox
                            boxStyle={[
                              styles.categoryBox,
                              category === "procedure"
                                ? styles.yellowBorder
                                : {}
                            ]}
                            onPress={() => this.handleCategory("procedure", 2)}
                            imgStyle={styles.categoryImage}
                            img={require("../../assets/help.png")}
                            titleStyle={styles.categoryTitle}
                            title="ПРОЦЕДУРЫ"
                          />
                          <IconTextBox
                            boxStyle={[
                              styles.categoryBox,
                              category === "personal" ? styles.yellowBorder : {}
                            ]}
                            onPress={() => this.handleCategory("personal", 3)}
                            imgStyle={styles.categoryImage}
                            img={require("../../assets/idcard.png")}
                            titleStyle={styles.categoryTitle}
                            title="ПЕРСОНАЛ"
                          />
                        </View>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : null}
              </View>
            </View>

            <View style={styles.contentView}>
              {selectedStar != 0 && category ? (
                <React.Fragment>
                  <React.Fragment>
                    {selectedStar === 5 ? null : ( // </Text> //   Что понравилось? // <Text style={styles.complaintHeader}>
                      <React.Fragment>
                        <Text style={styles.complaintHeader}>
                          {selectedStar < 4
                            ? stringsoflanguages.estimate.disappoint
                            : stringsoflanguages.estimate.do_not_like}
                        </Text>
                        <React.Fragment>
                          {categoryTab[selectedTab].complaints.map(o => {
                            return (
                              <View
                                key={o._id}
                                style={{
                                  paddingTop: 10,
                                  marginHorizontal: "3%"
                                }}
                              >
                                <Checkbox
                                  title={o.name}
                                  checked={o.isChecked}
                                  onChange={() => this.handleComplaints(o._id)}
                                />
                              </View>
                            );
                          })}
                        </React.Fragment>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                </React.Fragment>
              ) : null}
              <Text style={styles.commentTxt}>
                {stringsoflanguages.estimate.comment}
              </Text>

              <TextInput
                multiline={true}
                placeholder={stringsoflanguages.estimate.placeholder_txt}
                placeholderTextColor={Theme.colors.gray63}
                onChangeText={comment => this.setState({ comment })}
                value={this.state.comment}
                onContentSizeChange={event => {
                  this.setState({
                    height: event.nativeEvent.contentSize.height
                  });
                }}
                style={[
                  styles.commentInput,
                  { height: Math.max(80, this.state.height) }
                ]}
              />

              <TouchableOpacity
                style={styles.takePhoto}
                onPress={() => this.chooseImage()}
              >
                {imgUrl!== "" ? (
                  <React.Fragment>
                    {avatarSource ? (
                      <Image
                        source={{ uri: avatarSource }}
                        style={{
                          width: 40,
                          height: 40
                        }}
                        resizeMode="contain"
                      />
                    ) : (
                      <ActivityIndicator
                        size="large"
                        color={Theme.colors.yellow}
                      />
                    )}
                  </React.Fragment>
                ) : (
                  <Icon
                    name="ios-camera"
                    size={35}
                    color={Theme.colors.yellow}
                    style={{
                      paddingRight: 16
                    }}
                  />
                )}
                <Text style={styles.takePhotoTxt}>
                  {stringsoflanguages.estimate.attach_photo}
                </Text>
              </TouchableOpacity>
              <Button
                text={stringsoflanguages.send_btn_txt}
                sendBtn={StylePanel.sendBtn}
                textStyle={StylePanel.sendBtnTxt}
                onPress={() => this.handleSendBtn()}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <Footer footerStyle={StylePanel.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bcground
  },
  headerView: {
    flex: 1
  },
  header: {
    fontSize: Theme.fonts.sizes.h1,
    marginTop: 25
  },
  subHeader: {
    width: "92%",
    color: "white",
    textAlign: "center",
    marginHorizontal: "4%",
    fontSize: Theme.fonts.sizes.p5,
    marginTop: 10
  },
  starContainer: {
    marginVertical: 20,
    width: "60%",
    marginHorizontal: "20%"
  },
  contentView: {
    flex: 2,
    backgroundColor: Theme.colors.checkboxGray,
    marginHorizontal: "4%",
    marginVertical: 8
  },
  commentTxt: {
    width: "90%",
    marginHorizontal: "4%",
    color: Theme.colors.gray63,
    fontSize: Theme.fonts.sizes.p6,
    marginTop: 16,
    marginBottom: 10
  },
  takePhotoTxt: {
    marginVertical: 24,
    color: "white",
    fontSize: Theme.fonts.sizes.p6
  },
  commentInput: {
    color: "white",
    marginBottom: 10,
    fontSize: Theme.fonts.sizes.p6,
    backgroundColor: Theme.colors.bcground,
    paddingLeft: 10,
    marginHorizontal: "4%",
    borderColor: Theme.colors.gray63,
    borderWidth: 1
  },
  takePhoto: {
    marginHorizontal: "4%",
    flexDirection: "row",
    alignItems: "center"
  },
  complaintHeader: {
    textAlign: "center",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.h6,
    fontWeight: "100",
    marginTop: 24,
    marginBottom: 14
  },
  categoryBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16
  },
  categoryImage: {
    width: 32,
    height: 32
  },

  categoryTitle: {
    textAlign: "center",
    marginTop: 6,
    fontSize: Theme.fonts.sizes.p1,
    color: "white"
  },
  categoryBox: {
    backgroundColor: Theme.colors.bcground,
    width: 60,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  categoryView: {
    backgroundColor: Theme.colors.bcground,
    width: "17%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  yellowBorder: {
    borderColor: Theme.colors.yellow,
    borderWidth: 1
  }
});
