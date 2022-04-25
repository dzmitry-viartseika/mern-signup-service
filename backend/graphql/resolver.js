const Client = require('../models/client-model');
const Enum = require('enum');

const ADMIN = 'ADMIN';
const CLIENT = 'CLIENT';
const ALL = 'ALL';

const ClientRole = new Enum(
    [
      ALL,
      ADMIN,
      CLIENT,
    ],
    { freeze: true }
);



module.exports = {
  async getAllUsers(arg) {
    console.log('enum', ClientRole.ALL);
    try {
      const { role, searchText = '', page, limit } = arg.input.filter;
      const params = {};

      if (ClientRole.ALL.is(role) && !searchText) {
        const data = await Client.paginate(params, {
          page,
          limit
        });
        return data;
      }

      if ((ClientRole.ADMIN.is(role) || role === ClientRole.CLIENT.is(role)) && !searchText) {
        params.role = { $in: [role === 'ADMIN' ? 'ADMIN' : 'CLIENT'] }
        const data = await Client.paginate(params, {
          page,
          limit
        });
        return data;
      }

      if (searchText) {
        const data = await Client.paginate({$text: {$search: searchText}});
        return data;
      }

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
