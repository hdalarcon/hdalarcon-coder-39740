import userSchema from "../models/user.model.js";

class UserMongooseDao
{
  async paginate(paginate)
  {
    try {
      const { limit, page } = paginate;
      const userDocuments = await userSchema.paginate({}, { limit, page });
  
      userDocuments.docs = userDocuments.docs.map(document => ({
        id: document._id,
        firstName: document.firstName,
        lastName: document.lastName,
        email: document.email,
        age: document.age
      }));
  
      return userDocuments;
    } catch (error) {
      throw new Error(`Error al realizar la paginacion.`);
    }

  }

  async getOne(id)
  {
    try {
      const userDocument = await userSchema.findOne({ _id: id });

      if(!userDocument)
      {
        throw new Error('User dont exist.');
      }
  
      return {
          id: userDocument?._id,
          firstName: userDocument?.firstName,
          lastName: userDocument?.lastName,
          email: userDocument?.email,
          age: userDocument?.age,
          password: userDocument?.password
      }
    } catch (error) {
      throw new Error(`Error al recuperar el usuario con id ${id}`);
    }
  }

  async getOneByEmail(email)
  {
    try {
      const userDocument = await userSchema.findOne({ email });

      if(!userDocument)
      {
        throw new Error('User dont exist.');
      }
  
      return {
          id: userDocument?._id,
          firstName: userDocument?.firstName,
          lastName: userDocument?.lastName,
          email: userDocument?.email,
          age: userDocument?.age,
          password: userDocument?.password
      }
    } catch (error) {
      throw new Error(`No existe un usuario con email ${email}`);
    }
  }

  async create(data)
  {
    try {
      const userDocument = await userSchema.create(data);

      return {
          id: userDocument._id,
          firstName: userDocument.firstName,
          lastName: userDocument.lastName,
          email: userDocument.email,
          age: userDocument.age,
          password: userDocument.password,
      }
    } catch (error) {
      throw new Error(`No se pudo crear el usuario.`);
    }
  }

  async updateOne(id, data)
  {
    try {
      const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true});

      if(!userDocument)
      {
        throw new Error('User dont exist.');
      }
  
      return {
          id: userDocument._id,
          firstName: userDocument.firstName,
          lastName: userDocument.lastName,
          email: userDocument.email,
          age: userDocument.age
      }
    } catch (error) {
      throw new Error(`No existe un usuario con id ${is} para poder actualizarlo.`);
    }
  }

  async deleteOne(id)
  {
    try {
      return userSchema.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(`No se pudo eliminar el usuario con id ${id}.`);
    }
  }
}

export default UserMongooseDao;
