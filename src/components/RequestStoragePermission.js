import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import PermissionsAndroid from 'react-native/Libraries/PermissionsAndroid/PermissionsAndroid';

const RequestStoragePermission = ({onPermissionGranted}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [checkingPermissions, setCheckingPermissions] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        setPermissionGranted(granted);
      } catch (err) {
        console.warn(err);
      } finally {
        setCheckingPermissions(false);
      }
    };
    checkPermission();
  }, []);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to save data.',
          buttonPositive: 'Grant',
        },
      );
      setPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (permissionGranted) {
      onPermissionGranted();
    }
  }, [permissionGranted, onPermissionGranted]);

  if (checkingPermissions) {
    return (
      <View style={styles.container}>
        <Text>Checking for permissions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!permissionGranted && (
        <>
          <Text style={styles.message}>
            This app requires storage permission to save data. Please grant
            permission.
          </Text>
          <Button title="Grant Permission" onPress={requestPermission} />
        </>
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
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default RequestStoragePermission;
