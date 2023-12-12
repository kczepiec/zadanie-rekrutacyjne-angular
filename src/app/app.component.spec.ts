import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { reducer } from './store/crypto/reducers/crypto.reducer';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, HttpClientTestingModule, StoreModule.forRoot({
        crypto: reducer,
      })],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zadanie-rekrutacyjne-crypto' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zadanie-rekrutacyjne-crypto');
  });

});
