export class MockRepository {
  create = jest.fn(() => true);

  save = jest.fn(() => true);

  findOneById = jest.fn(() => true);

  remove = jest.fn(() => true);
}
