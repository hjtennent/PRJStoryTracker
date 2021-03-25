import MockAsyncStorage from 'mock-async-storage';
 
const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);

jest.mock('@react-native-firebase/messaging', () => {
  const messagingModule = () => ({
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('test-token')),
    onNotificationOpenedApp: jest.fn((value) => value),
  });
  messagingModule.AuthorizationStatus = {
    NOT_DETERMINED: -1,
    DENIED: 0,
    AUTHORIZED: 1,
    PROVISIONAL: 2,
  }
  return messagingModule;
});


jest.mock('@react-native-firebase/database', () => {
  const dbModule = () => ({
    ref: jest.fn((value) => ({
      on: jest.fn((value, func) => Promise.resolve(true)),
      off: jest.fn((value, func) => Promise.resolve(true)),
    })),
    child: jest.fn((value) => value),
    set: jest.fn((value) => Promise.resolve(value)),
    
  });
  return dbModule;
});

jest.mock('@react-native-firebase/auth', () => {
  const authModule = () => ({
    onAuthStateChanged: jest.fn((value) => value), // default implementation
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    currentUser: { uid: 'test' },
    signOut: jest.fn(() => Promise.resolve(true)),
  });
  return authModule;
});