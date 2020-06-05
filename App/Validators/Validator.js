const Ajv = require('ajv');
const { BadRequestError } = require('../Utils/ErrorHandler');

const ajv = new Ajv({ removeAdditional: true, coerceTypes: true });

module.exports = (schema) => {
  const compiler = ajv.compile(schema);
  const validator = {
    validate: (data) => compiler(data),
    getError: () => compiler.errors,
    formatError() {
      const validationError = compiler.errors[0];
      const { message, dataPath } = validationError;

      return `${dataPath ? `${dataPath.replace('.', '')} ` : ''}${message.replace('.', '')}`;
    },
    validateRequest(payload, options = {}) {
      const { logger = console.log } = options;
      const isValid = compiler(payload);

      if (!isValid) {
        const error = new BadRequestError(this.formatError());
        logger(`ERROR: with payload ${JSON.stringify(payload)} -- ${error.message}`);
        throw error;
      }

      return isValid;
    },
  };

  return validator;
};
