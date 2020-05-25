import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

class UserController {

	// protected userRepository = getRepository(User);

  static listAll = async (req: Request, res: Response) => {
  	try {
      const users = await getRepository(User).find({
				select: ["id", "username", "role"]
			});
			return res.status(200).json({data: users});
  	} catch (error) {
			console.log(error);
      return res.status(404).json(error);
    }
  }

  static getOneById = async (req: Request, res: Response) => {
  	try {
			// convert id from string to number
			const id: number = parseInt(req.params.id);
      const user = await getRepository(User).findOneOrFail(id, {
				select: ["id", "username", "role"]
			});
			return res.status(200).json({data: user});
  	} catch (error) {
			console.log(error)
      return res.status(404).json(error)
    }
  }

	static newUser = async (req: Request, res: Response) => {
  	try {
			let { username, password }: User = req.body;
			let user: User = new User();
			user.username = username;
			user.password = password;
			user.role = 'user';
			// hash user password
			user.hashPassword();
			// store user data into User table
			await getRepository(User).save(user);
			return res.status(200).json({message: 'successfully created!'});
  	} catch (error) {
			console.log(error);
      return res.status(404).json(error);
    }
	}
	
	static editUser = async (req: Request, res: Response) => {
		const id: number = parseInt(req.params.id);
		const { username, role, password } = req.body
		let user: User;
		// fetch user from db
		try {
			user = await getRepository(User).findOneOrFail(id, {
				select: ["username", "role"]
			});
		} catch(error) {
			return res.status(404).json('User not found!');
		}
		console.log(user);
		// validate new value on model
		user.username = username;
		user.password = password;
		user.role = role;
		console.log(user);
		// save this change
  	try {
      await getRepository(User).save(user);
			return res.status(200).json({message: 'successfully updated!'});
  	} catch (error) {
			console.log(error);
      return res.status(404).json(error);
    }
	}
	
	static deleteUser = async (req: Request, res: Response) => {
  	try {
			const id: number = parseInt(req.params.id);
			const user = await getRepository(User).findOneOrFail(id);
			await getRepository(User).delete(id);
			return res.status(200).json({message: 'successfully deleted!'});
  	} catch (error) {
			console.log(error);
      return res.status(404).json('User not found!');
    }
  }
}

export default UserController;