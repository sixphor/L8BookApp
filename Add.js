import React, {useState} from 'react';
// import {datasource} from "./Data";
import {TextInput, View, Text, Button, StyleSheet} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Add = ({navigation, route}) => {
    const [title, setTitle] = useState(''); //This is Fiction or Non-Fiction, NOT the book title
    const [name, setName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [image, setImage] = useState('');
    const [copies, setCopies] = useState('');

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.pageTitle}>ADD A BOOK!</Text>
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
                    value={copies}
                    onChangeText={setCopies}
                />

            </View>
            <View>
                <Text style={styles.inputHeader}>Type</Text>
                <View style={styles.pickerStyle}>
                    <RNPickerSelect
                        value={title}
                        onValueChange={(value) => setTitle(value)}
                        items={[
                            {label: "Fiction", value: "Fiction"},
                            {label: "Non-Fiction", value: "Non-Fiction"},
                        ]}
                    />
                </View>
                <Text style={styles.inputHeader}>Cover (Image URL)</Text>
                <TextInput
                    style={styles.inputFieldSmall}
                    multiline={true}
                    value={image}
                    onChangeText={setImage}
                />
            </View>
            <View style={styles.buttonStyle}>
                <Button title={"ADD BOOK"}
                        onPress={() => {
                            let mydata = JSON.parse(route.params.datastring);
                            let item = {
                                name: name,
                                isbn: isbn,
                                copies: copies,
                                image: image,
                            };
                            let indexNum = 0;
                            if (title === 'Fiction') {
                                indexNum = 0;
                            }
                            else if (title === 'Non-Fiction') {
                                indexNum = 1;
                            }


                            mydata[indexNum].data.push(item);
                            let stringdata = JSON.stringify(mydata);
                            setData(stringdata);
                        }}
                />
            </View>
        </View>
    );
};

export default Add;
