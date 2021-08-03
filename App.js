import React, { useState } from 'react';
import { View,Text } from 'react-native';
import Registro from './components/Pages/Registro';
import Splash from './components/Pages/Splash';

const App = () => {
  const [estado, setEstado] = useState(false);

  return estado ? (
    <View style={{ flex: 1 }}>
      <Registro
        setEstado={setEstado}
       />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <Splash 
      setEstado={setEstado}
       />
    </View>
  );
};

export default App;
