const User = require('../models/user-model');
const Client = require('../models/client-model');

module.exports = {
  async getAllUsers(arg) {
    try {
      console.log('arg', arg);
      const { role = 'ALL', searchText = '', page, limit } = arg.input.filter;
      let clients;
      if (!searchText) {
         clients = await Client.find({})
             .skip(Number(page) > 0 ? ( ( Number(page) - 1 ) * Number(limit) ) : 0)
             .limit(Number(limit))
             .sort({
               firstName: 'desc'
             })
             .exec();
        console.log('clients', clients);
        return clients;
      }
      if (searchText) {
        clients = await Client.find({$text: {$search: searchText}});
      }

      if (role === 'ALL') {
        return clients;
      }
      const filteredUsers = clients.filter((item) => item.role === role);
      return filteredUsers;
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
