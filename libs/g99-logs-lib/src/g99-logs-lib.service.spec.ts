import { Test, TestingModule } from '@nestjs/testing';
import { G99LogsLibService } from './g99-logs-lib.service';

describe('G99LogsLibService', () => {
  let service: G99LogsLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [G99LogsLibService],
    }).compile();

    service = module.get<G99LogsLibService>(G99LogsLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
