module.exports = {
  title: 'Users',
  type: 'object',
  propertaries: {

    password: {
      type: 'text',
    },
    newPassword: {
      type: 'text',
    },
  },
  required: ['password', 'newPassword'],
};
