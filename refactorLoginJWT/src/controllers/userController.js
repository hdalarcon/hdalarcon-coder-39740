import UserManager from "../manager/userManager.js";

export const list = async  (req, res) =>
{
  try {
    const { limit, page } = req.query;
    const manager = new UserManager();

    const users = await manager.paginate({ limit, page });

    res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
  } catch (error) {
    res.status(400).send({message: 'Error al ingresar el numero de pagina.'});
  }
};

export const getOne = async (req, res) =>
{
  try {
    const { id } = req.params;

    const manager = new UserManager();
    const user = await manager.getOne(id);

    res.send({ status: 'success', user });
  } catch (error) {
    res.status(404).send({error: error.message});
  }
};

export const save = async (req, res) =>
{
  try {
    const manager = new UserManager();
    const user = await manager.create(req.body);
    res.send({ status: 'success', user, message: 'User created.' })
    
  } catch (error) {
    res.status(404).send({error: error.message});
  }
};

export const update = async (req, res) =>
{
  const { id } = req.params;

  const manager = new UserManager();
  const result = await manager.updateOne(id, req.body);

  res.send({ status: 'success', result, message: 'User updated.' })
};

export const deleteOne = async (req, res) =>
{
  const { id } = req.params;

  const manager = new UserManager();
  await manager.deleteOne(id);

  res.send({ status: 'success', message: 'User deleted.' })
};
