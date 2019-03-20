import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import Checkbox from "./Checkbox";
import { Theme } from "../configs/theme";
import stringsoflanguages from "../locale";
import { ComplaintScoreFive } from "./complaintScoreFive";
const Complaint = ({
  staffIncompetence,
  waitTime,
  terribleWaitRoom,
  invalid,
  checkBoxPress,
  selectedStar
}) => {
  return (
    <View style={styles.container}>
      {selectedStar === 5 ? (
        // <View
        //   style={{
        //     flexDirection: "row"
        //   }}
        // >
        //   <ComplaintScoreFive
        //     title="Персонал"
        //     img={require("../assets/clock.png")}
        //   />
        //   <ComplaintScoreFive
        //     title="Быстрое обслуживание"
        //     img={require("../assets/clock.png")}
        //   />
        //   <ComplaintScoreFive
        //     title="Зал ожидания"
        //     img={require("../assets/clock.png")}
        //   />
        //   <ComplaintScoreFive
        //     title="Условия для лиц с ОВЗ"
        //     img={require("../assets/clock.png")}
        //   />
        // </View>
        <Checkbox
          title={stringsoflanguages.estimate.staff}
          checked={staffIncompetence}
          onChange={() =>
            checkBoxPress(staffIncompetence, "Некомпетентность персонала")
          }
        />
      ) : (
        <React.Fragment>
          <Checkbox
            title={stringsoflanguages.estimate.staff}
            checked={staffIncompetence}
            onChange={() =>
              checkBoxPress(staffIncompetence, "Некомпетентность персонала")
            }
          />
          <Checkbox
            title={stringsoflanguages.estimate.queue}
            checked={waitTime}
            onChange={() => checkBoxPress(waitTime, "Время ожидания в очереди")}
          />
          <Checkbox
            title={stringsoflanguages.estimate.room}
            checked={terribleWaitRoom}
            onChange={() =>
              checkBoxPress(terribleWaitRoom, "Ужасные условия в зале ожидания")
            }
          />
          <Checkbox
            title={stringsoflanguages.estimate.invalid}
            checked={invalid}
            onChange={() =>
              checkBoxPress(invalid, "Отсутствие условий для инвалидов")
            }
          />
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginHorizontal: "3%"
  }
});
export default Complaint;
