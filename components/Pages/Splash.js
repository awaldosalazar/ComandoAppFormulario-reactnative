import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Alert,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Logo from '../images/image.png';

const Splash = ({ setEstado }) => {
  useEffect(() => inicio());

  const inicio = () => {
    let id = setTimeout(() => _retrieveData(), 5000);
  };

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('registro', 'registrados');
    } catch (error) {
      // Error saving data
    }
  };
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('registro');

      console.log(value);
      if (value !== null) {
        if (value == 'registrado') {
          Alert.alert(
            '[***ATENCIÓN***]',
            'Se detecto que tu equipo ya se registro'
          );
        } else {
          setEstado(true);
        }
      } else {
        setEstado(true);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <View style={styles.backsplash}>
      <Animatable.View animation="fadeInDownBig" style={styles.backsplash}>
        <Animatable.Image
          animation="jello"
          easing="ease-in-out-quint"
          iterationCount="infinite"
          delay={500}
          source={Logo}
          style={styles.splashimage}
        />
      </Animatable.View>
      <Animatable.View
        animation="bounceInUp"
        delay={1050}
        style={styles.textanimation}>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.textanimation}>
          <Text style={styles.logotext}>
            COMANDO
            <Text style={styles.logotext2}> RIDERS</Text>
          </Text>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backsplash: {
    flex: 1,
    backgroundColor: '#eac102',
    alignItems: 'center',
  },
  splashimage: {
    width: 300,
    height: 270,
    margin: 250,
  },
  textanimation: {
    marginTop: -220,
  },
  logotext: {
    fontSize: 35,
    color: 'gray',
    fontWeight: 'bold',
    opacity: 0.9,
  },
  logotext2: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#E12222',
  },
});

export default Splash;
