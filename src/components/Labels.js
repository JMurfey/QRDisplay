import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import RNFS from 'react-native-fs';

const Label = () => {
  const [agency, setAgency] = useState('');
  const [client, setClient] = useState('');

  useEffect(() => {
    const readLabels = async () => {
      const labelsFile = `${RNFS.DocumentDirectoryPath}/labels.txt`;
      try {
        const contents = await RNFS.readFile(labelsFile, 'utf8');
        const [agencyText, clientText] = contents.split('\n');
        setAgency(agencyText);
        setClient(clientText);
      } catch (error) {
        console.error(error);
      }
    };
    readLabels();
  }, []);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
        {agency}
      </Text>
      <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
        {client}
      </Text>
    </View>
  );
};

export default Label;
