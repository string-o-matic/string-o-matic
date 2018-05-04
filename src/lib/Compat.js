class Compat {

  static fixtures = {
    supportsSecureRandom: null
  };

  static supportsSecureRandom = () => {
    if (Compat.fixtures.supportsSecureRandom !== null) {
      return Compat.fixtures.supportsSecureRandom;
    } else {
      return typeof window.crypto === 'object' && typeof window.crypto.getRandomValues === 'function';
    }
  };

}

export default Compat;