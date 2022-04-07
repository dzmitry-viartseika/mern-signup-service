const User = require('../models/user-model');
const Client = require('../models/client-model');

module.exports = {
  async getAllUsers() {
    try {
      const clients = await Client.find({});
      return clients;
    } catch (e) {
      console.error(e);
    }
  },

  async addNewClient ({client}) {
    console.log('client', client);
    const candidate = await Client.findOne({ email: client.email });
    console.log('candidate', candidate);
    if (candidate) {
      return 'Данный клиент уже зарегистрирован';
    }
    const response = await Client.create({ email: client.email, firstName: client.firstName, lastName: client.lastName, role: client.role, phoneNumber: client.phoneNumber });
    console.log('response', response);
    return response;
  }
}
