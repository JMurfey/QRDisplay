import React from 'react';
import { View, StyleSheet } from 'react-native';
import DataForm from './src/components/DataForm';
import QRCode from './src/components/QRCode';

const App = () => {
  return (
    <View style={styles.container}>
      <QRCode value={JSON.stringify(data)} agency={"METRO STAFF"} client={"JBSS"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
