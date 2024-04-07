import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.namespaceToken = `${namespace}:accessToken`
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(this.namespaceToken);

    return accessToken ? accessToken : '';

  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(this.namespaceToken, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.namespaceToken);
  }
}

export default AuthStorage;