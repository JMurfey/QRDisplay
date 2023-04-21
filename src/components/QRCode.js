import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import QRCodeSVG from 'react-native-qrcode-svg';

const QRCode = ({inp}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fullDate, setFullDate] = useState('');
  const [time, setTime] = useState('');

  const updateDateTime = current => {
    const monthAbbr = new Intl.DateTimeFormat('en-US', {month: 'short'}).format(
      current,
    );
    const dayOfWeek = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
    }).format(current);
    setFullDate(
      `${dayOfWeek}, ${monthAbbr}. ${current.getDate()} ${current.getFullYear()}`,
    );
    setTime(
      current
        .toLocaleTimeString()
        .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
    );
  };

  const [qrStr, setQrStr] = useState('ABC');
  const [displayQR, setDisplayQR] = useState(false);

  useEffect(() => {
    updateDateTime(currentTime);

    const interval = setInterval(() => {
      const current = new Date();
      setCurrentTime(current);
      updateDateTime(current);

      const qrData = {
        datetime: current.getTime(),
        clientID: inp.clientID,
      };
      const jsonStr = JSON.stringify(qrData);
      setQrStr(jsonStr);
      setDisplayQR(true);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topLabelContainer}>
        <Text style={styles.topLabelText}>{inp.agency}</Text>
      </View>
      <View style={styles.bottomLabelContainer}>
        <Text style={styles.bottomLabelText}>{inp.clientName}</Text>
      </View>

      {displayQR ? (
        <QRCodeSVG value={qrStr} size={360} />
      ) : (
        <View>
          <Text style={styles.bottomLabelText}>Initializing</Text>
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{fullDate}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  topLabelContainer: {
    marginTop: 0,
    marginBottom: 5,
    alignItems: 'center',
  },
  topLabelText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
  },
  bottomLabelContainer: {
    marginTop: 0,
    marginBottom: 20,
    alignItems: 'center',
  },
  bottomLabelText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  timeText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default QRCode;
