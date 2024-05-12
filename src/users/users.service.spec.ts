import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository } from '../common/mocks/repository/repository.mock';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY_TOKEN, UserRepository } from './user.repository';
import { UsersService } from './users.service';

describe('UserService', () => {
  let usersService: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: MockRepository,
        },
        UsersService,
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
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
      const response = await usersService.create(user);
      expect(response).toBeTruthy();
    });
  });

  describe('delete', () => {
    it('should successfully delete user', async () => {
      const response = await usersService.delete(1);
      expect(response).toBeTruthy();
    });

    it('should return null if no user is found', async () => {
      jest.spyOn(userRepository, 'findOneById').mockResolvedValueOnce(null);

      const response = await usersService.delete(1);
      expect(response).toBe(null);
    });
  });
});
