export default {
  onAuthStateChanged: jest
   	.fn((value) => value), // default implementation
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(false)),
  auth: jest.fn()
};