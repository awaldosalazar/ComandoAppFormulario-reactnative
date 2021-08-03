import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Linking,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Image,
  AsyncStorage,
  Alert,
} from 'react-native';
import { TextInput, Button, Card, Icon } from 'react-native-paper';
import { BottomSheet, ListItem } from 'react-native-elements';
import Constants from 'expo-constants';
//import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
// or any pure javascript modules available in npm


const image = {
  uri:
    'https://www.moto1pro.com/sites/default/files/2018-yamaha-mt-03-eu-night-fluo-action-003.jpg',
};

const Registro = ({ setEstado }) => {
  useEffect(() => inicio());
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const inicio = () => {
    let id = setTimeout(() => setEstado2(false), 3000);
  };

  const finalizar = () => {
    _storeData();
    setEstado(false);
  };
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('registro', 'registrado');
    } catch (error) {
      // Error saving data
    }
  };

  const [timer, setTimer] = useState();
  const [email, setEmail] = useState('');
  const [lada, setLada] = useState('52');
  const [numero, setNumero] = useState('');
  const [usuario, setUsuario] = useState('');
  const [marca, setMarca] = useState('');
  const [submarca, setSubmarca] = useState('');
  const [placa, setPlaca] = useState('');
  const [app, setApp] = useState('');
  const [mochila, setMochila] = useState('');
  const [sangre, setSangre] = useState('');
  const [alergia, setAlergia] = useState('');
  const [nameContact, setNameContact] = useState('');
  const [contacto, setContacto] = useState('');
  const [estado, setEstado2] = useState(true);
  const [boton, setBoton] = useState(false);
  //const [timePassed, setTimePassed] = React.useState(true);

  //carga de las imagenes
  const [isVisible, setIsVisible] = useState(false);
  const [imageperfil, setImageperfil] = useState('');
  const [imageapp, setImageapp] = useState('');
  const [imagemoto, setImagemoto] = useState('');
  const selectupload = () => {
    setIsVisible(true);
  };
  const list = [
    {
      title: 'Foto Perfil',
      containerStyle: {
        backgroundColor: imageperfil.length > 0 ? 'green' : 'red',
      },
      titleStyle: { color: 'white' },
      onPress: () => pickImage('perfil'),
    },
    {
      title: 'Foto de la APP',
      containerStyle: {
        backgroundColor: imageapp.length > 0 ? 'green' : 'red',
      },
      titleStyle: { color: 'white' },
      onPress: () => pickImage('app'),
    },
    {
      title: 'Foto de la moto con placa',
      containerStyle: {
        backgroundColor: imagemoto.length > 0 ? 'green' : 'red',
      },
      titleStyle: { color: 'white' },
      onPress: () => pickImage('moto'),
    },
    {
      title:
        imageperfil.length > 0 && imageapp.length > 0 && imagemoto.length > 0
          ? 'Listo Cerrar'
          : 'Cancelar',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];
  const crearcadena = (categoria, imageuri) => {
    let localUri = imageuri;
    let filename = localUri.split('/').pop();
    let extension = filename.split('.');
    numero.split('').reverse().join('').substr(0, 4);
    numero.split('').reverse().join('');
    let nombre = usuario.split(' ');
    return (
      categoria +
      usuario.replace(/\s+/g, '').toLowerCase() +
      numero.split('').reverse().join('').substr(0, 4) +
      '.' +
      extension[1]
    );
  };

  //seleccionamos la imagen:
  const pickImage = async (tiposelect) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled && tiposelect === 'perfil') {
      setImageperfil(result.uri);
    } else if (!result.cancelled && tiposelect === 'app') {
      setImageapp(result.uri);
    } else if (!result.cancelled && tiposelect === 'moto') {
      setImagemoto(result.uri);
    }
  };

  const handleWhatsAppPress = async () => {
    setBoton(true);
    let alergiasAct = '',
      numerotel = 0,
      numeroemrge = 0;
    numerotel = parseInt(numero);
    numeroemrge = parseInt(contacto);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      imageperfil != null &&
      imageperfil != '' &&
      imageapp != null &&
      imageapp != '' &&
      imagemoto != null &&
      imagemoto != ''
    ) {
      if (
        numero.length > 0 &&
        usuario.length > 0 &&
        marca.length > 0 &&
        submarca.length > 0 &&
        placa.length > 0 &&
        app.length > 0 &&
        mochila.length > 0 &&
        sangre.length > 0 &&
        nameContact.length > 0 &&
        contacto.length > 0
      ) {
        if (Number.isInteger(numerotel) && Number.isInteger(numeroemrge)) {
          if (reg.test(email) === true) {
            if (alergia.length > 0) {
              alergiasAct = alergia;
            } else {
              alergiasAct = 'sa';
            }
            //Sube formulario
            
            let perfil = crearcadena('photoperfile', imageperfil);
            let appimage = crearcadena('photoapp', imageapp);
            let moto = crearcadena('photomoto', imagemoto);

            let localUri = imageperfil;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let localUri2 = imageapp;
            let filename2 = localUri2.split('/').pop();
            let match2 = /\.(\w+)$/.exec(filename2);
            let type2 = match2 ? `image/${match2[1]}` : `image`;

            let localUri3 = imagemoto;
            let filename3 = localUri3.split('/').pop();
            let match3 = /\.(\w+)$/.exec(filename3);
            let type3 = match3 ? `image/${match3[1]}` : `image`;

            
            let formData = new FormData();
            formData.append('photoperfil', {
              uri: localUri,
              name: perfil,
              type
            });
            formData.append('photoapp', {
              uri: localUri2,
              name: appimage,
              type
            });
            formData.append('photomoto', {
              uri: localUri3,
              name: moto,
              type
            });
            formData.append('email',email);
            formData.append('nombre',usuario);
            formData.append('lada',lada);
            formData.append('numero',numero);
            formData.append('marca',marca);
            formData.append('submarca',submarca);
            formData.append('placa',placa);
            formData.append('app',app);
            formData.append('mochila',mochila);
            formData.append('sangre',sangre);
            formData.append('alergias',alergiasAct);
            formData.append('contactoname',nameContact);
            formData.append('contacto',contacto);
            
            

            let response = await fetch(
              'https://comandorider.000webhostapp.com/appRequest/mvc/updatauser.php',
              {
                method: 'POST',
                body: formData,
                header: {
                  Accept: 'application/json',
                  'content-type': 'multipart/form-data',
                },
              }
            );

            let result = await response.text();
            let resultadofinal = result.split(',');
            if(resultadofinal[0] === '1'){
              Alert.alert('Registro Exitoso',`Tu codigo Comando Riders es [*${resultadofinal[1]}*]`);
              
              let id = setTimeout(() => finalizar(),3000);
            }else{
                setBoton(false);
              Alert.alert('Ocurrio un erro','Tuvimos un problema porfavor intentelo mas tarde o contacte a un coordinador');
            }
            

           
          } else {
            setBoton(false);
            Alert.alert(
              'Verifique el correo',
              'Verifique que su correo este escrito de forma correcta'
            );
          }
        } else {
          setBoton(false);
          Alert.alert(
            'Verifique los numeros',
            'Los datos ingresados en el campo de numeros son INCORRECTOS'
          );
        }
      } else {
        setBoton(false);
        Alert.alert(
          'Campos de formulario faltantes',
          'Tienes que llenar el formulario completamente, el campo alergias no es necesario'
        );
        return;
      }
    } else {
      setBoton(false);
      Alert.alert(
        'Falta de documentos',
        'Verifica que todos los campos del documento se pongan en verde'
      );
      return;
    }
  };

  return (
    <ImageBackground source={image} style={styles.container}>
      <Text style={styles.paragraph}>Registro de Comando Riders</Text>

      <ScrollView>
        <Card style={styles.card}>
          <Text style={styles.paragraph}>Ingrese Los Datos Generados</Text>
          <Button
            style={{ margin: 10, backgroundColor: '#00bb2d' }}
            theme={{ colors: { primary: 'rgb(227, 227, 227)' } }}
            title="Subir Archivos"
            icon="upload"
            disabled={boton}
            //mode="contained"
            onPress={selectupload}>
            Subir información
          </Button>
          <TextInput
            style={styles.label}
            maxLength={40}
            label="Correo Electronico"
            placeholder="example@gmail.com"
            underLinerColor="red"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
            inlineImageLeft="search_icon"
            theme={{
              colors: {
                placeholder: 'white',
                text: 'white',
                primary: '#7ADEBA',
                underlineColor: 'transparent',
              },
            }}
          />

          <View>
            <TextInput
              style={styles.lada}
              label="Lada"
              placeholder="52"
              editable={false}
              keyboardType="phone-pad"
              onChangeText={(text) => setLada(text)}
              value={lada}
              maxLength={3}
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                  primary: '#7ADEBA',
                  underlineColor: 'transparent',
                },
              }}
            />
            <TextInput
              style={styles.number}
              label="Número de celular"
              placeholder="3330303335"
              keyboardType="phone-pad"
              onChangeText={(text) => setNumero(text)}
              value={numero}
              maxLength={10}
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                  primary: '#7ADEBA',
                  underlineColor: 'transparent',
                },
              }}
            />
          </View>

          <TextInput
            style={styles.label}
            maxLength={40}
            label="Nombre Completo Del Usuario"
            placeholder="Juan Perez Ruiz"
            underLinerColor="red"
            onChangeText={(text) => setUsuario(text)}
            value={usuario}
            inlineImageLeft="search_icon"
            theme={{
              colors: {
                placeholder: 'white',
                text: 'white',
                primary: '#7ADEBA',
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            style={styles.label}
            maxLength={15}
            label="Marca De La Moto"
            placeholder="ITALIKA | YAMAHA | PATITO"
            onChangeText={(text) => setMarca(text)}
            value={marca}
            theme={{
              colors: {
                placeholder: 'white',
                text: 'white',
                primary: '#7ADEBA',
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            style={styles.label}
            maxLength={15}
            label="Submarca"
            placeholder="Rt200 | DM150 | DT200"
            onChangeText={(text) => setSubmarca(text)}
            value={submarca}
            theme={{
              colors: {
                placeholder: 'white',
                text: 'white',
                primary: '#7ADEBA',
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            style={styles.label}
            maxLength={10}
            label="Placa de la moto"
            placeholder="xxxxx"
            onChangeText={(text) => setPlaca(text)}
            value={placa}
            theme={{
              colors: {
                placeholder: 'white',
                text: 'white',
                primary: '#7ADEBA',
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            style={styles.label}
            maxLength={30}
            label="APP"
            placeholder="Uber | Didi | SinDelantal"
            onChangeText={(text) => setApp(text)}
            value={app}
            theme={{
              colors: {
                placeholder: 'white',
                text: 'white',
                primary: '#7ADEBA',
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            style={styles.label}
            maxLength={40}
            label="Mochila"
            placeholder="Uber | Didi | SinDelantal"
            onChangeText={(text) => setMochila(text)}
            value={mochila}
            theme={{
              colors: {
                placeholder: 'white',
                text: 'white',
                primary: '#7ADEBA',
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            style={styles.label}
            maxLength={5}
            label="Tipo de sangre"
            placeholder="O- | O+ | A+"
            onChangeText={(text) => setSangre(text)}
            value={sangre}
            theme={{
              colors: {
                placeholder: 'white',
                text: 'white',
                primary: '#7ADEBA',
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            style={styles.label}
            maxLength={20}
            label="Alergias"
            placeholder="Sin Alergias (SA)"
            onChangeText={(text) => setAlergia(text)}
            value={alergia}
            theme={{
              colors: {
                placeholder: 'white',
                text: 'white',
                primary: '#7ADEBA',
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            style={styles.label}
            maxLength={40}
            label="Nombre del contacto de emergencia"
            placeholder="Juan Perez Ruiz"
            onChangeText={(text) => setNameContact(text)}
            value={nameContact}
            theme={{
              colors: {
                placeholder: 'white',
                text: 'white',
                primary: '#7ADEBA',
                underlineColor: 'transparent',
              },
            }}
          />
          <View>
            <TextInput
              style={styles.lada}
              label="Lada"
              placeholder="52"
              editable={false}
              keyboardType="phone-pad"
              onChangeText={(text) => setLada(text)}
              value={lada}
              maxLength={3}
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                  primary: '#7ADEBA',
                  underlineColor: 'transparent',
                },
              }}
            />
            <TextInput
              style={styles.number}
              label="Número del contacto de emergencia"
              placeholder="3330303335"
              keyboardType="phone-pad"
              onChangeText={(text) => setContacto(text)}
              value={contacto}
              maxLength={10}
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                  primary: '#7ADEBA',
                  underlineColor: 'transparent',
                },
              }}
            />
          </View>

          <Button
            style={{ margin: 10, backgroundColor: '#00bb2d' }}
            theme={{ colors: { primary: 'rgb(227, 227, 227)' } }}
            title="Mandar Registro"
            icon="send"
            disabled={boton}
            //mode="contained"
            onPress={handleWhatsAppPress}>
            Mandar Registro
          </Button>
        </Card>
      </ScrollView>
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',

    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  card: {
    margin: 15,
    border: 0,
    color: 'transparent',
    backgroundColor: 'transparent',
  },
  lada: {
    maxHeight: 100,
    maxWidth: 64,
    marginLeft: 10,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
  number: {
    marginBottom: 10,
    maxHeight: 100,
    maxWidth: 228,
    marginLeft: 77,
    marginTop: -64,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
  label: {
    margin: 10,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
  paragraph: {
    margin: 25,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7ADEBA',
  },
});

export default Registro;
