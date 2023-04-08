import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import QRCode from './src/components/QRCode';
import DataForm from './src/components/DataForm';

interface QRData {
  clientID: number;
  clientName:string;
  agency:string;
}

const App = () => {

  const [qrData, setQrData] = useState<QRData>({ 
    clientID: 302,
    clientName:'Client Name',
    agency:'Agency Name'
  });
  
  const path = `${RNFS.DocumentDirectoryPath}/data.json`;

  const deleteDataFile = async () => {
    try {
      const fileExists = await RNFS.exists(path);
      if (fileExists) {
        await RNFS.unlink(path);
        console.log('File deleted successfully');
      } else {
        console.log('File does not exist');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  useEffect(() => {
    deleteDataFile();
  }, []);  

  const [showQRCode, setShowQRCode] = useState(false);

  const handleSaveData = async (data: QRData) => {
    try {
      console.log('Saving!!!!');
      await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
      console.log('Data saved successfully!!!');
      setQrData(data);
      setShowQRCode(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };  

  return (
    <View style={styles.container}>
      {showQRCode ? (
        <QRCode inp={qrData}/>
      ) : (
        <DataForm setQrData={handleSaveData}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
