import Data from './pipeline/Data';

class Globals {

  static pipelineSteps = [];

  static input = 'text';

  static textInput = 'Grumpy wizards make toxic brew for the evil queen and jack';

  static file = null;
  static fileInput = Data.string('');
  static fileError = null;

}

export default Globals;