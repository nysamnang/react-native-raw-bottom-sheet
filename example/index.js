/* eslint-disable no-use-before-define */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import {
  View,
  ScrollView,
  DatePickerIOS,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import data from "./static.json";

FAIcon.loadFont();
MDIcon.loadFont();

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>REACT NATIVE RAW BOTTOMSHEET</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.Standard.open()} style={styles.button}>
            <Text style={styles.buttonTitle}>STANDARD</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.Scrollable.open()} style={styles.button}>
            <Text style={styles.buttonTitle}>SCROLLABLE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.DatePicker.open()} style={styles.button}>
            <Text style={styles.buttonTitle}>DATE PICKER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.Input.open()} style={styles.button}>
            <Text style={styles.buttonTitle}>TEXT INPUT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.Message.open()} style={styles.button}>
            <Text style={styles.buttonTitle}>MESSAGE</Text>
          </TouchableOpacity>
        </View>

        {/* List Menu */}
        <RBSheet
          ref={ref => {
            this.Standard = ref;
          }}
          height={330}
        >
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Create</Text>
            {data.lists.map(list => (
              <TouchableOpacity
                key={list.icon}
                style={styles.listButton}
                onPress={() => this.Standard.close()}
              >
                <MDIcon name={list.icon} style={styles.listIcon} />
                <Text style={styles.listLabel}>{list.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </RBSheet>

        {/* Grid Menu */}
        <RBSheet
          ref={ref => {
            this.Scrollable = ref;
          }}
          closeOnDragDown
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }
          }}
        >
          <ScrollView>
            <View style={styles.gridContainer}>
              {data.grids.map(grid => (
                <TouchableOpacity
                  key={grid.icon}
                  onPress={() => this.Scrollable.close()}
                  style={styles.gridButtonContainer}
                >
                  <View style={[styles.gridButton, { backgroundColor: grid.color }]}>
                    <FAIcon name={grid.icon} style={styles.gridIcon} />
                  </View>
                  <Text style={styles.gridLabel}>{grid.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </RBSheet>

        {/* Date Picker IOS */}
        <RBSheet
          ref={ref => {
            this.DatePicker = ref;
          }}
        >
          <View style={styles.dateHeaderContainer}>
            <TouchableOpacity
              onPress={() => this.DatePicker.close()}
              style={styles.dateHeaderButton}
            >
              <Text style={styles.dateHeaderButtonCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.DatePicker.close()}
              style={[styles.dateHeaderButton]}
            >
              <Text style={styles.dateHeaderButtonDone}>Done</Text>
            </TouchableOpacity>
          </View>
          <DatePickerIOS mode="date" date={new Date()} />
        </RBSheet>

        {/* TextInput */}
        <RBSheet
          ref={ref => {
            this.Input = ref;
          }}
          height={60}
          animationType="none"
          duration={200}
          customStyles={{
            wrapper: { backgroundColor: "#fff" }
          }}
        >
          <View style={styles.inputContainer}>
            <MDIcon name="photo-camera" style={styles.inputIcon} />
            <MDIcon name="tag-faces" style={styles.inputIcon} />
            <TextInput style={styles.input} autoFocus placeholder="Write a comment..." />
            <MDIcon
              name="send"
              style={[styles.inputIcon, styles.inputIconSend]}
              onPress={() => this.Input.close()}
            />
          </View>
        </RBSheet>

        {/* Alert */}
        <RBSheet
          ref={ref => {
            this.Message = ref;
          }}
          customStyles={{
            mask: { backgroundColor: "transparent" },
            container: { elevation: 100 }
          }}
        >
          <View style={styles.messageContainer}>
            <Text style={styles.messageTitle}>Awesome!</Text>
            <Text style={styles.message}>
              You can add your own component whatever you want. If you don't like our default style
              you can customize whatever you like.
            </Text>
            <View style={styles.messageButtonContainer}>
              <TouchableOpacity style={styles.messageButton} onPress={() => this.Message.close()}>
                <Text style={styles.messageButtonText}>CLOSE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.messageButton, styles.messageButtonRight]}
                onPress={() => this.Message.close()}
              >
                <Text style={[styles.messageButtonText, styles.messageButtonTextRight]}>GREAT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  textTitle: {
    fontSize: 20,
    marginTop: 120
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50
  },
  button: {
    width: 150,
    backgroundColor: "#4EB151",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 3,
    margin: 10
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },
  listContainer: {
    flex: 1,
    padding: 25
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666"
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  listIcon: {
    fontSize: 26,
    color: "#666",
    width: 60
  },
  listLabel: {
    fontSize: 16
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginBottom: 20
  },
  gridButtonContainer: {
    flexBasis: "25%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  gridButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  gridIcon: {
    fontSize: 30,
    color: "white"
  },
  gridLabel: {
    fontSize: 14,
    paddingTop: 10,
    color: "#333"
  },
  dateHeaderContainer: {
    height: 45,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dateHeaderButton: {
    height: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  dateHeaderButtonCancel: {
    fontSize: 18,
    color: "#666",
    fontWeight: "400"
  },
  dateHeaderButtonDone: {
    fontSize: 18,
    color: "#006BFF",
    fontWeight: "500"
  },
  inputContainer: {
    borderTopWidth: 1.5,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  inputIcon: {
    fontSize: 24,
    color: "#666",
    marginHorizontal: 5
  },
  inputIconSend: {
    color: "#006BFF"
  },
  input: {
    flex: 1,
    height: 36,
    borderRadius: 36,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    marginHorizontal: 10
  },
  messageContainer: {
    flex: 1,
    padding: 25
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222"
  },
  message: {
    fontSize: 17,
    lineHeight: 24,
    marginVertical: 20
  },
  messageButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  messageButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#3385ff",
    marginLeft: 10
  },
  messageButtonText: {
    color: "#3385ff",
    fontSize: 16,
    fontWeight: "bold"
  },
  messageButtonRight: {
    backgroundColor: "#3385ff"
  },
  messageButtonTextRight: {
    color: "#fff"
  }
});

export default App;
