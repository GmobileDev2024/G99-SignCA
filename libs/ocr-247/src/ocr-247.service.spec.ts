import { Test, TestingModule } from '@nestjs/testing';
import { Ocr247Service } from './ocr-247.service';

describe('Ocr247Service', () => {
  let service: Ocr247Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ocr247Service],
    }).compile();

    service = module.get<Ocr247Service>(Ocr247Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
