import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockService } from '../common/mocks/service/service.mock';
import { ResponseMessage } from '../shared/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: MockService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    const user: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date().toISOString(),
      location: 'Earth',
      timezone: 'Asia/Jakarta',
    };

    it('should successfully create user', async () => {
      const response = await usersController.create(user);
      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.message).toEqual(ResponseMessage.USER.CREATED);
    });
  });

  describe('delete', () => {
    it('should successfully delete user', async () => {
      const response = await usersController.delete(1);
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.message).toEqual(ResponseMessage.USER.DELETED);
    });

    it('should return 404 if no user found', async () => {
      jest.spyOn(usersService, 'delete').mockResolvedValueOnce(null);

      const response = await usersController.delete(1);
      expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
      expect(response.message).toEqual(ResponseMessage.USER.NOT_FOUND);
    });
  });
});
