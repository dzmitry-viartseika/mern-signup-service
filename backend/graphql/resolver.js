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
    const candidate = await Client.findOne({ email: client.email });
    if (candidate) {
      return 'Данный клиент уже зарегистрирован';
    }
    const response = await Client.create({ email: client.email, firstName: client.firstName, lastName: client.lastName, role: client.role, phoneNumber: client.phoneNumber });
    console.log('response', response);
    return response;
  },

  async deleteClient ({id}) {
    const client = await Client.findOne({_id: id});
    if (!client) {
      return { message: 'Not Found' };
    }

    client.remove();
    return  {
      status: '200',
      message: 'Пользователь удален'
    }
  },

  async editClient( {id, client} ) {
    const currentClient = await Client.findOne({ _id: id });
    if (!currentClient) {
      return { message: 'Not Found' }
    }
    currentClient.firstName = client.firstName;
    currentClient.lastName = client.lastName;
    currentClient.email = client.email;
    currentClient.role = client.role;
    currentClient.phoneNumber = client.phoneNumber;
    currentClient.save();
    return  {
      status: '200',
      message: 'Клиент обновлен',
    }
  }
}
