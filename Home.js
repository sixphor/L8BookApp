import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFDD0',
        flex: 1,
        padding: 10,
    },

    listContainer: {
        flexDirection: 'row',
        borderWidth: 0.2,
        borderRadius: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fffdea',
        marginHorizontal: 10,
        overflow: 'hidden',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 3,
        borderWidth: 1,
        width: '100%',
        backgroundColor: '#6A0DAD',
    },

    headerText: {
        color: '#000000',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
    },

    bookTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#006400',
        marginLeft: 3,
        flexWrap: 'wrap',
        display: 'flex',
        width: '200',
    },

    bookIsbn: {
        color: "#acacac",
        marginLeft: 3,
        fontWeight: 'thin',
        fontStyle: 'italic',
    },

    bookCopies: {
        fontSize: 14,
        width: '200',
        marginLeft: 3,
        // color: '#D8BFD8',
    },

    image: {
        width: 100,
        height: 140,
        marginRight: 10,
        borderRadius: 5,
    },

    titleContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#FFD700',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },

    listHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 5,
    },
});

const Home = ({navigation}) => {

    const [mydata, setMyData] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if(datastr !=null){
            jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        }
        else{
            setMyData(datasource)
        }
    };

    getData()

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.listContainer}
                              onPress={() =>
                              {
                                  let datastr = JSON.stringify(mydata);
                                  navigation.navigate('Edit', {
                                      index: index, title: section.title, name: item.name,
                                      isbn: item.isbn, image: item.image, copies: item.copies, datastring: datastr
                                  });
                              }
                              }
            >
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />
                <View>
                    <Text style={styles.bookTitle}>{item.name}</Text>
                    <Text style={styles.bookIsbn}>ISBN: {item.isbn}</Text>
                    <Text style={styles.bookCopies}>Copies: {item.copies}</Text>
                    <Text></Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Button title='Add Book' onPress={()=>{
                let datastr = JSON.stringify(mydata);
                navigation.navigate("Add", {datastring:datastr});
            }}
            />
            <SectionList sections={mydata} renderItem={renderItem}
                         renderSectionHeader={({section:{title,bgcolor}})=>(
                             <View style={[styles.header, { backgroundColor: bgcolor }]}>
                                 <Text style={[styles.headerText]}>{title}</Text>
                             </View>
                         )}/>
        </View>
    );
};

export default Home;
