import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, tap } from "rxjs"
import { CacheService } from '../services/cache.service';


@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: CacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.method !== "GET") {
            return next.handle(req)
        }

        const cacheItem = this.cacheService.load(req.url);

        if (cacheItem !== null) {
            const cachedResponse = Object.assign(new HttpResponse(), cacheItem);
            return of(cachedResponse.clone());
        } else {
            return next.handle(req).pipe(
                tap(stateEvent => {
                    if(stateEvent instanceof HttpResponse && stateEvent.status == 200) {
                        this.cacheService.save({
                            key: req.url,
                            data: stateEvent.clone(),
                            expirationMins: 5
                        });
                    }
                })
            );
        }
    }    
}
