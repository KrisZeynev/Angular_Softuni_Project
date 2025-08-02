

import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../services"

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        console.log(`Access granted at: ${new Date().toLocaleTimeString()}`);
        return true;
    } else {
        return router.createUrlTree(['/login'])
    }
}