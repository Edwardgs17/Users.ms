module.exports = {
  title: 'Users',
  type: 'object',
  propertaries: {
    document: {
      type: 'number',
    },
    fullname: {
      type: 'text',
    },
    birthday: {
      type: 'text',
    },
    date: {
      type: 'date',
    },
    location: {
      type: 'text',
    },
    email: {
      type: 'text',
    },
    password: {
      type: 'text',
    },
  },
  required: ['email', 'password'],
};
