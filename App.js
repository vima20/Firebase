import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { convertFirebaseTimeStampToJS } from './helper/Functions'; // Import the date conversion function

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('created', 'desc') // Add orderBy criteria
      .onSnapshot(querySnapshot => {
        const fetchedMessages = [];
        querySnapshot.forEach(documentSnapshot => {
          fetchedMessages.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        setMessages(fetchedMessages);
      });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {messages.map(message => (
        <View key={message.id} style={styles.messageContainer}>
          <Text style={styles.messageText}>{message.text}</Text>
          <Text style={styles.dateTime}>{convertFirebaseTimeStampToJS(message.created)}</Text> // Display creation date and time
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 12,
    color: 'gray',
  },
});

export default App;
