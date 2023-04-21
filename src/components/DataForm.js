import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import RNFS from 'react-native-fs';

const DataForm = ({setQrData}) => {
  const [agency, setAgency] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientID, setClientID] = useState('0');
  const [checkingForData, setCheckingForData] = useState(true);

  const path = `${RNFS.DocumentDirectoryPath}/data.json`;

  useEffect(() => {
    const loadData = async () => {
      try {
        const dataExists = await RNFS.exists(path);
        if (dataExists) {
          const rawData = await RNFS.readFile(path, 'utf8');
          const parsedData = JSON.parse(rawData);
          setAgency(parsedData.agency);
          setClientName(parsedData.clientName);
          setClientID(parsedData.clientID.toString());
          console.log('Data loaded successfully!!!');
          setQrData(parsedData);
        } else {
          console.log('Data file does not exist');
        }
      } catch (error) {
        console.error('An error occurred while loading data:', error);
      } finally {
        setCheckingForData(false);
      }
    };
    console.log('Going to load data');
    loadData();
  }, []);

  const saveData = async () => {
    const data = {
      agency,
      clientName,
      clientID: parseInt(clientID, 10), // parse as integer with radix 10
    };

    try {
      console.log('Saving!!!!');
      await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
      console.log('Data saved successfully!!!');
      setQrData(data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  if (checkingForData) {
    return <Text style={styles.checkingText}>Checking for Data...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Staffing Agency:</Text>
      <TextInput style={styles.input} value={agency} onChangeText={setAgency} />
      <Text style={styles.label}>Client Name:</Text>
      <TextInput
        style={styles.input}
        value={clientName}
        onChangeText={setClientName}
      />
      <Text style={styles.label}>Client ID:</Text>
      <TextInput
        style={styles.input}
        value={clientID}
        onChangeText={value => setClientID(value.toString())}
        keyboardType="numeric"
      />
      <Button title="Save Data" onPress={saveData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: 240,
  },
  checkingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DataForm;
