const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const UserRepository = require('../../App/Repositories/UsersRepository');
const Helper = require('../Helper');

chai.use(chaiHttp);
const API = '/api/user-ms/users/signin';
const API2 = '/api/user-ms/users/Login';
const API3 = '/api/user-ms/users';
const API4 = '/api/user-ms/users/recoverPass';


describe('User Test', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('Signin user', () => chai
    .request(app)
    .post(API)
    .send({

      email: 'jua@gmail.com',
      password: '1234',

    })
    .then(async (res) => {
      const { body, status } = res;
      console.log(body);
      const data = await UserRepository.getUserByEmail(body.email);
      assert.equal(data.email, 'jua@gmail.com');
      assert.equal(status, 200);
    }));

  it('Signin Error', () => chai
    .request(app)
    .post(API)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert(error, 400);
    }));
});

describe('User Test 2', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('Login user', async () => {
    const help = Helper.encrypt({ password: '1234' });
    await Helper.insertUser({

      email: 'jua@gmail.com',
      password: help,

    });

    return chai
      .request(app)
      .post(`${API2}`)
      .send({
        email: 'jua@gmail.com',
        password: '1234',
      })
      .then(async (res) => {
        const { body, status } = res;
        console.log(body);
        console.log(status);
        const [resp] = await Helper.gets('jua@gmail.com');
        console.log(resp);
        assert.equal(body.id, resp.id);
      });
  });
  it('Login user', async () => {
    await Helper.insertUser({

      email: 'jua@gmail.com',
      password: Helper.encrypt('1234'),

    });

    return chai
      .request(app)
      .post(`${API2}`)
      .send({
        email: 'juann@gmail.com',
        password: '',
      })
      .then(async (res) => {
        const { body, status } = res;
        console.log(body);
        console.log(status);
        assert.equal(body.id, null);
      });
  });
});

describe('User Test 3', () => {
  before(() => Helper.migrate());


  beforeEach(async () => {
    await Helper.clear();
  });

  const emails = 'jua@gmail.com';
  const nullEmail = 'juan@gmail.com';
  it('Update user', async () => {
    await Helper.insertUser({

      email: emails,
      password: '1234',

    });

    return chai
      .request(app)
      .put(`${API3}/${emails}`)
      .send({
        document: '1234',
        fullname: 'juan',
        birthday: '2002/02/04',
        date: '2019/03/04',
        location: 'armenia',
        email: 'jua@gmail.com',
        password: '1234',
      })
      .then(async (res) => {
        const { body, status } = res;
        console.log(body);
        console.log(status);
        const data = await UserRepository.getUserByEmail(body.email);
        assert.equal(data.email, 'jua@gmail.com');
        assert.equal(status, 200);
      });
  });
  it('update user validation error of email not exist', () => chai
    .request(app)
    .put(`${API3}/${nullEmail}`)
    .send({

      document: '1234',
      fullname: 'juan',
      birthday: '2002/02/04',
      date: '2019/03/04',
      location: 'armenia',
      password: '1234',

    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  describe('Users Test 4', () => {
    const getbyEmailByUser = 'juan@gmail.com';
    const getByUserNotExist = 'juann@gmail.com';

    before(() => Helper.migrate());

    beforeEach(async () => {
      await Helper.clear();
    });

    it('Test getByUser ', async () => {
      await Helper.insertUser({
        document: '1234',
        fullname: 'juan',
        birthday: '2002/02/04',
        date: '2019/03/04',
        location: 'armenia',
        email: 'juan@gmail.com',
        password: '1234',
      });

      return chai
        .request(app)
        .get(`${API3}/${getbyEmailByUser}`)
        .then((response) => {
          const { body, status } = response;
          assert.equal(status, 200);
          console.log(body);
        });
    });

    it('not users with the email to return', () => chai
      .request(app)
      .get(`${API3}/${getByUserNotExist}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
      }));
  });
  describe('User Test 5', () => {
    const email = 'jua@gmail.com';

    before(() => Helper.migrate());


    beforeEach(async () => {
      await Helper.clear();
    });

    it('Change Password', async () => {
      const help = Helper.encrypt({ password: '1234' });
      await Helper.insertUser({

        email,
        password: help,

      });

      return chai
        .request(app)
        .put(`${API3}/${email}/password`)
        .send({
          password: '1234',
          newPassword: '1234567',
        })
        .then(async (res) => {
          const { body, status } = res;
          console.log(body);
          console.log(status);
          const data = await UserRepository.getUserByEmail(email);
          console.log(data, help);
          assert.equal(body.id, data.id);
          assert.equal(status, 200);
        });
    });


    it('invalid data', async () => {
      const help = Helper.encrypt({ password: '1234' });
      await Helper.insertUser({

        email,
        password: help,

      });

      return chai
        .request(app)
        .put(`${API3}/${email}/password`)
        .send({

          password: '1234',
          newPassword: '1234567',
          email: 'juan@gmail.com',

        })
        .then((response) => {
          const { status } = response;
          assert.equal(status, 200);
        });
    });
  });
});


describe('User Test 6', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  const email = 'gustavoadolfovilladacamargo@gmail.com';
  const emailwrong = 'gustavoadolfovilladacamargoxx123@gmail.com';

  it('Recover Password Test', () => chai
    .request(app)
    .put(`${API4}/${email}`)
    .then(async (res) => {
      const { body, status } = res;
      assert.equal(status, 200);
      console.log(body);
    })
    .catch((error) => {
      assert.equal(error.status, 401);
      assert.ok(false);
      console.log(error);
    }));

  it('Empty Email Test', () => chai
    .request(app)
    .put(`${API4}/`)
    .then((error) => {
      assert.equal(error.status, 500);
      console.log(error.status);
    })
    .catch((error) => {
      console.log(error.status);
    }));


  it('Wrong Email Address Test', () => chai
    .request(app)
    .put(`${API4}/${emailwrong}`)
    .then(async (error) => {
      assert.equal(error.status, 401);
      console.log(error.status);
    })
    .catch((error) => {
      console.log(error.status);
    }));
});
