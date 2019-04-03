import AsyncStorage from "@react-native-community/async-storage";

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(`@Arah:${key}`, JSON.stringify(value));
  } catch (error) {
    alert(error);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(`@Arah:${key}`);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    alert(error);
  }
};
