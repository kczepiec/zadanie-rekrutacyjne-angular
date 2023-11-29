import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TableComponent } from '../../shared/components/ui/Table/Table.component';
import { PercentageChangeDirective } from '../../shared/directives/PercentageChange.directive';
import { CryptoService } from '../../shared/services/Crypto.service';
import { reducer } from '../../store/crypto/reducers/crypto.reducer';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let cryptoService: CryptoService;
  let controller: HttpTestingController;
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
        HomeComponent,
        TableComponent,
        PercentageChangeDirective,
        StoreModule.forRoot({
          crypto: reducer,
        }),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [CryptoService, provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    cryptoService = TestBed.inject(CryptoService);
    controller = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
