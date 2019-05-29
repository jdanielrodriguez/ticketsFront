import { TestBed } from '@angular/core/testing';

import { EventosFuncionesService } from './eventos-funciones.service';

describe('EventosFuncionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventosFuncionesService = TestBed.get(EventosFuncionesService);
    expect(service).toBeTruthy();
  });
});
