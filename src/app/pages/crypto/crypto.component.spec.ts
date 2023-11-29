import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { TableComponent } from '../../shared/components/ui/Table/Table.component';
import { PercentageChangeDirective } from '../../shared/directives/PercentageChange.directive';
import { CryptoService } from '../../shared/services/Crypto.service';
import { reducer } from '../../store/crypto/reducers/crypto.reducer';
import { DataTestMock } from '../../tests/DataMock';
import { CryptoComponent } from './crypto.component';

describe('CryptoComponent', () => {
  let component: CryptoComponent;
  let fixture: ComponentFixture<CryptoComponent>;
  let cryptoService: CryptoService;
  let controller: HttpTestingController;
  let activatedRoute: ActivatedRoute;
  let store: MockStore<{
    crypto: [];
    favorites: [];
    errorMessage: string | undefined;
  }>;
  const initialState = { crypto: [], favorites: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CryptoComponent,
        TableComponent,
        PercentageChangeDirective,
        StoreModule.forRoot({
          crypto: reducer,
        }),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        CryptoService,
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'BTC' }),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    cryptoService = TestBed.inject(CryptoService);
    controller = TestBed.inject(HttpTestingController);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get crypto id from route params on initialization', () => {
    activatedRoute.params.subscribe((params) => {
      component.cryptoId = params['id'];
    });
    expect(component.cryptoId).toBe('BTC');
  });

  it('should get crypto details from store', () => {
    const spy = spyOn(store, 'select').and.returnValue(of(DataTestMock[0]));
    component.loadComponent();
    expect(spy).toHaveBeenCalledWith(jasmine.any(Function));
    expect(component.crypto).toEqual(DataTestMock[0]);
  });
});
