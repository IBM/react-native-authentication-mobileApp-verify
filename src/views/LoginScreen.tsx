import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import Config from 'react-native-config';
import {
  PaperProvider,
  Portal
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from '../services/user-service';

export default function LoginScreen() {
  const navigation: any = useNavigation();

  const _onLoad = async state => {
    if (state.url.indexOf('code') != -1) {
      let token1 = state.url.split('code=')[1];
      let token = token1.split('&grant_id')[0];

      const response = await userService.getAccessToken(token);
      await AsyncStorage.setItem('login_token', JSON.stringify(response.data));
      navigation.navigate('Home');
    }
  };

  return (
    <PaperProvider>
      <Portal>
        <SafeAreaView style={styles.container}>
          <WebView
            onNavigationStateChange={_onLoad}
            source={{
              uri: `${Config.baseUrl}/oauth2/authorize/?client_id=${Config.client_id}&client_secret=${Config.client_secret}&response_type=code&redirect_uri=http://localhost:8081/home&scope=openid`,
            }}
          />
        </SafeAreaView>
      </Portal>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
  },
  backbuttonView: {
    padding: 12,
    justifyContent: 'flex-start',
  },
  backButton: {
    marginLeft: 16,
  },
  formContainer: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 32,
  },
  linkText: {
    color: '#5E5BFF',
  },
  forgotText: {
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  newAccountLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  normalText: {
    marginBottom: 20,
  },
  textField: {
    marginVertical: 4,
  },
  signupButton: {
    backgroundColor: '#5E5BFF',
    marginVertical: 8,
  },
});
