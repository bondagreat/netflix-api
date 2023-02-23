module.exports =
  (schema, options = {}) =>
  (input) => {
    const { value, error } = schema.validate(input, options);
    if (error) {
      throw error;
    }
    return value;
  };
