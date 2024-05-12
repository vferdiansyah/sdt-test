export class MockService {
  create = jest.fn();

  delete = jest.fn(() => true);
}
