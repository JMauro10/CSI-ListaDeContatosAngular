import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {PRIME_NG_CONFIG, providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {ReactiveFormsModule} from '@angular/forms';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({
    eventCoalescing: true }),
    provideRouter(routes),
    ReactiveFormsModule,
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]

};
