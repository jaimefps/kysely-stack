import { secrets } from "../secrets"

export function config() {
  return {
    secrets: secrets(),
    firebase: {
      apiKey: "AIzaSyDJu_O9kdXprKXtuB05Kn0OZAHjOeRNh40",
      authDomain: "keysly-stack.firebaseapp.com",
      projectId: "keysly-stack",
      storageBucket: "keysly-stack.appspot.com",
      messagingSenderId: "609586811739",
      appId: "1:609586811739:web:2a3ebeae45b6b32d03407e",
    },
  }
}
