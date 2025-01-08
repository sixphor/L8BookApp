import React, {useState} from 'react';
import {datasource} from "./Data";
import {TextInput, View, Text, Button, Alert, StyleSheet} from "react-native";
// import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFDD0',
        flex: 1,
        padding: 20,
    },

    pageTitle: {
        fontSize: 22,
        color: '#FFD700',
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#000',
        padding: 10,
        borderWidth: 1,
        borderColor: '#FFD700',
    },

    inputHeader: {
        fontSize: 20,
        color: '#000000',
        marginVertical: 20,
        fontWeight: 'bold',
    },

    inputFieldSmall: {
        borderWidth: 1,
        borderColor: '#FFD700',
        backgroundColor: '#FFF',

    },

    inputFieldLarge: {
        borderWidth: 1,
        borderColor: '#FFD700',
        backgroundColor: '#FFF',
        height: 100,
        padding: 10,
        textAlignVertical: 'top',
    },

    pickerStyle : {
        backgroundColor: '#FFF',
        padding: 1,
    },

    buttonStyle: {
        marginTop: 30,
    },
});

const Edit = ({navigation, route}) => {

    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

    const [name, setName] = useState(route.params.name);
    const [isbn, setIsbn] = useState(route.params.isbn);
    const [image, setImage] = useState(route.params.image);
    const [copies, setCopies] = useState(route.params.copies);

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.pageTitle}>Edit Book!</Text>
                <Text style={styles.inputHeader}>Book Title</Text>
                <TextInput
                    style={styles.inputFieldSmall}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.inputHeader}>ISBN</Text>
                <TextInput
                    style={styles.inputFieldSmall}
                    value={isbn}
                    onChangeText={setIsbn}
                />
                <Text style={styles.inputHeader}>Copies</Text>
                <TextInput
                    style={styles.inputFieldLarge}
                    // multiline={true}
                    value={copies}
                    onChangeText={setCopies}
                />
            </View>
            <View>
                <Text style={styles.inputHeader}>Cover (Image URL)</Text>
                <TextInput
                    style={styles.inputFieldSmall}
                    multiline={true}
                    value={image}
                    onChangeText={setImage}
                />
            </View>
            <View style={[{padding: 10, flexDirection: 'row', justifyContent: 'space-between',}]}>
                <View style={{flex: 1, margin: 10}}>
                    <Button title={"SAVE"}
                            onPress={() => {

                                let indexNum = 0;
                                if (route.params.title === 'Fiction') {
                                    indexNum = 0;
                                }
                                else if (route.params.title === 'Non-Fiction') {
                                    indexNum = 1;
                                }

                                mydata[indexNum].data[myindex].name = name;
                                mydata[indexNum].data[myindex].isbn = isbn;
                                mydata[indexNum].data[myindex].copies = copies;
                                mydata[indexNum].data[myindex].image = image;
                                let stringdata = JSON.stringify(mydata);
                                setData(stringdata);
                            }}
                    />
                </View>
                <View style={{flex: 1, margin: 10}}>
                    <Button title="DELETE"
                            onPress={() => {
                                let indexNum = 0;
                                if (route.params.title === 'Fiction') {
                                    indexNum = 0;
                                }
                                else if (route.params.title === 'Non-Fiction') {
                                    indexNum = 1;
                                }

                                Alert.alert("Are you sure?", '',
                                    [{text: 'Yes', onPress: () => {
                                            mydata[indexNum].data.splice(myindex, 1);
                                            let stringdata = JSON.stringify(mydata);
                                            setData(stringdata);
                                        }},
                                        {text: 'No'}])
                            }
                            }
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
