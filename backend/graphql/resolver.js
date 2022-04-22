const Client = require('../models/client-model');
const aggregateQuery = Client.aggregate();


module.exports = {
  async getAllUsers(arg) {
    try {
      const { role = 'ALL', searchText = '', page, limit } = arg.input.filter;
      const params = {};
      if (role === 'ADMIN' || role === 'CLIENT' && !searchText) {
        params.role = { $in: [role === 'ADMIN' ? 'ADMIN' : 'CLIENT'] }
        const data = await Client.paginate(params, {
          page,
          limit
        });
        return data;
      }
      if (role === 'ALL' && !searchText) {
        console.log('all')
        const data = await Client.paginate(params, {
          page,
          limit
        });
        console.log('data', data)
        return data;
      }
      if (!searchText) {
        const data = await Client.paginate(params, {
          page,
          limit
        });
        return data;
        //  clients = await Client.find({})
        //      .skip(Number(page) > 0 ? ( ( Number(page) - 1 ) * Number(limit) ) : 0)
        //      .limit(Number(limit))
        //      .sort({
        //        firstName: 'desc'
        //      })
        //      .exec();
        // console.log('clients', clients);
        // return clients;
      }
      if (searchText) {
        console.log('search')
        // clients = await Client.find({$text: {$search: searchText}});
        params.role = { $in: [role === 'ADMIN' ? 'ADMIN' : 'CLIENT'] }
        const data = await Client.paginate(params, {$text: {$search: searchText}});
        console.log('data', data);
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
