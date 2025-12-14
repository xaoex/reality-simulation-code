/**
 * Reality CSEMS - Maxopt Injector (C)
 * Header file for maximum optimization injection
 * 
 * Version: 1.0.0
 * Author: xaoex
 */

#ifndef MAXOPT_INJECTOR_H
#define MAXOPT_INJECTOR_H

typedef struct MaxoptInjector MaxoptInjector;

/**
 * Initialize maxopt injector
 */
MaxoptInjector* maxopt_injector_init();

/**
 * Inject maxopt optimizations
 */
int maxopt_inject(MaxoptInjector* injector);

/**
 * Verify maxopt optimization
 */
int maxopt_verify(MaxoptInjector* injector);

/**
 * Get optimization status
 */
void maxopt_get_status(MaxoptInjector* injector);

/**
 * Cleanup injector
 */
void maxopt_injector_free(MaxoptInjector* injector);

#endif /* MAXOPT_INJECTOR_H */
