import EmailManager from "../../domain/manager/emailManager.js";

export const sendEmail = async  (req, res, next) =>
{
  try
  {
    const manager = new EmailManager();
    await manager.send('forgotPassword.hbs');

    res.send({ status: 'success' });
  }
  catch (e)
  {
		next(e);
	}
};
