/**
 * Anonymous Calculus - Lambda/Anonymous Calculus System
 * Injectable mapping tool with anonymous functions
 * 
 * @version 1.0.0
 * @author xaoex
 */

/**
 * AnonymousCalculus - Lambda calculus system for transformations
 */
class AnonymousCalculus {
  constructor(options = {}) {
    this.options = {
      maxopt: options.maxopt !== false,
      memoize: options.memoize !== false,
      verbose: options.verbose !== false,
      ...options
    };
    
    this.lambdas = new Map();
    this.transforms = new Map();
    this.memoCache = new Map();
    
    this._initializeCoreLambdas();
  }
  
  /**
   * Initialize core lambda functions
   */
  _initializeCoreLambdas() {
    // Identity function: λx.x
    this.lambda('identity', x => x);
    
    // Constant function: λx.λy.x
    this.lambda('const', x => y => x);
    
    // Composition: λf.λg.λx.f(g(x))
    this.lambda('compose', f => g => x => f(g(x)));
    
    // Map: λf.λxs.[f(x) for x in xs]
    this.lambda('map', f => xs => xs.map(f));
    
    // Filter: λp.λxs.[x for x in xs if p(x)]
    this.lambda('filter', p => xs => xs.filter(p));
    
    // Reduce: λf.λa.λxs.fold(f, a, xs)
    this.lambda('reduce', f => a => xs => xs.reduce(f, a));
    
    // Pipe: λfs.λx.pipe(fs, x)
    this.lambda('pipe', (...fs) => x => fs.reduce((acc, f) => f(acc), x));
    
    // Take: λn.λxs.take(n, xs) - Takes first n elements from sequence
    // Formalized as: take: ℕ × List(α) → List(α)
    // Mathematical definition: take(n, [x₁, x₂, ..., xₘ]) = [x₁, x₂, ..., xₖ] where k = min(n, m)
    this.lambda('take', n => xs => {
      if (!Array.isArray(xs)) {
        throw new TypeError('take expects an array');
      }
      if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
        throw new TypeError('take expects a non-negative integer');
      }
      return xs.slice(0, n);
    });
    
    // Drop: λn.λxs.drop(n, xs) - Drops first n elements from sequence
    // Formalized as: drop: ℕ × List(α) → List(α)
    // Mathematical definition: drop(n, [x₁, x₂, ..., xₘ]) = [xₙ₊₁, xₙ₊₂, ..., xₘ] where n < m
    // Complementary to take: take(n, xs) ⊕ drop(n, xs) = xs (concatenation property)
    this.lambda('drop', n => xs => {
      if (!Array.isArray(xs)) {
        throw new TypeError('drop expects an array');
      }
      if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
        throw new TypeError('drop expects a non-negative integer');
      }
      return xs.slice(n);
    });
    
    if (this.options.verbose) {
      console.log('[AnonymousCalculus] Core lambdas initialized');
    }
  }
  
  /**
   * Define a lambda function
   */
  lambda(name, fn) {
    if (this.options.memoize) {
      fn = this._memoize(fn);
    }
    
    this.lambdas.set(name, fn);
    return fn;
  }
  
  /**
   * Get a lambda function
   */
  get(name) {
    return this.lambdas.get(name);
  }
  
  /**
   * Apply a lambda function
   */
  apply(name, ...args) {
    const fn = this.lambdas.get(name);
    if (!fn) {
      throw new Error(`Lambda function '${name}' not found`);
    }
    return fn(...args);
  }
  
  /**
   * Memoize a function
   */
  _memoize(fn) {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }
  
  /**
   * Curry a function
   */
  curry(fn, arity = fn.length) {
    return function curried(...args) {
      if (args.length >= arity) {
        return fn(...args);
      }
      return (...moreArgs) => curried(...args, ...moreArgs);
    };
  }
  
  /**
   * Compose multiple functions (right to left)
   */
  compose(...fns) {
    return x => fns.reduceRight((acc, fn) => fn(acc), x);
  }
  
  /**
   * Pipe multiple functions (left to right)
   */
  pipe(...fns) {
    return x => fns.reduce((acc, fn) => fn(acc), x);
  }
  
  /**
   * Map transformation
   */
  map(fn, data) {
    if (Array.isArray(data)) {
      return data.map(fn);
    }
    if (typeof data === 'object') {
      return Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, fn(v)])
      );
    }
    return fn(data);
  }
  
  /**
   * Filter transformation
   */
  filter(predicate, data) {
    if (Array.isArray(data)) {
      return data.filter(predicate);
    }
    if (typeof data === 'object') {
      return Object.fromEntries(
        Object.entries(data).filter(([k, v]) => predicate(v))
      );
    }
    return data;
  }
  
  /**
   * Reduce transformation
   */
  reduce(fn, initial, data) {
    if (Array.isArray(data)) {
      return data.reduce(fn, initial);
    }
    if (typeof data === 'object') {
      return Object.values(data).reduce(fn, initial);
    }
    return initial;
  }
  
  /**
   * Take - Algebraic operation for sequence prefix extraction
   * 
   * Formal Definition:
   *   take: ℕ × List(α) → List(α)
   *   take(n, xs) = { xᵢ | i ∈ [0, min(n, |xs|)) }
   * 
   * Properties (Discrete Mathematics):
   *   1. Length invariant: |take(n, xs)| = min(n, |xs|)
   *   2. Prefix property: ∀i < min(n, |xs|): take(n, xs)[i] = xs[i]
   *   3. Idempotence: take(n, take(m, xs)) = take(min(n, m), xs)
   *   4. Empty preservation: take(n, []) = []
   *   5. Zero property: take(0, xs) = []
   *   6. Identity on length: n ≥ |xs| ⟹ take(n, xs) = xs
   *   7. Monotonicity: n ≤ m ⟹ take(n, xs) ⊆ take(m, xs)
   * 
   * Algebraic Laws:
   *   - Concatenation decomposition: xs = take(n, xs) ⊕ drop(n, xs)
   *   - Associativity with composition: take(n) ∘ take(m) = take(min(n, m))
   *   - Distributivity over concatenation: take(n, xs ⊕ ys) = 
   *       if n ≤ |xs| then take(n, xs)
   *       else xs ⊕ take(n - |xs|, ys)
   * 
   * @param {number} n - Non-negative integer count of elements to take
   * @param {Array} data - Input sequence
   * @returns {Array} First n elements of the sequence
   */
  take(n, data) {
    if (!Array.isArray(data)) {
      throw new TypeError('take expects an array as second argument');
    }
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('take expects a non-negative integer as first argument');
    }
    
    if (this.options.verbose) {
      console.log(`[AnonymousCalculus.take] Taking ${n} elements from array of length ${data.length}`);
    }
    
    return data.slice(0, n);
  }
  
  /**
   * Drop - Algebraic operation for sequence suffix extraction
   * 
   * Formal Definition:
   *   drop: ℕ × List(α) → List(α)
   *   drop(n, xs) = { xᵢ | i ∈ [min(n, |xs|), |xs|) }
   * 
   * Properties (Discrete Mathematics):
   *   1. Length invariant: |drop(n, xs)| = max(0, |xs| - n)
   *   2. Suffix property: ∀i ≥ min(n, |xs|): drop(n, xs)[i - n] = xs[i]
   *   3. Idempotence: drop(n, drop(m, xs)) = drop(n + m, xs)
   *   4. Empty preservation: drop(n, []) = []
   *   5. Zero property: drop(0, xs) = xs
   *   6. Absorption: n ≥ |xs| ⟹ drop(n, xs) = []
   *   7. Antimonotonicity: n ≤ m ⟹ drop(m, xs) ⊆ drop(n, xs)
   * 
   * Algebraic Laws:
   *   - Concatenation decomposition: xs = take(n, xs) ⊕ drop(n, xs)
   *   - Associativity with composition: drop(n) ∘ drop(m) = drop(n + m)
   *   - Distributivity over concatenation: drop(n, xs ⊕ ys) =
   *       if n ≥ |xs| then drop(n - |xs|, ys)
   *       else drop(n, xs) ⊕ ys
   *   - Complementarity: take(n, xs) ∩ drop(n, xs) = ∅ (disjoint sets)
   *   - Duality: drop(n, xs) = take(|xs| - n, reverse(xs)) when properly reversed
   * 
   * @param {number} n - Non-negative integer count of elements to drop
   * @param {Array} data - Input sequence
   * @returns {Array} Remaining elements after dropping first n
   */
  drop(n, data) {
    if (!Array.isArray(data)) {
      throw new TypeError('drop expects an array as second argument');
    }
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('drop expects a non-negative integer as first argument');
    }
    
    if (this.options.verbose) {
      console.log(`[AnonymousCalculus.drop] Dropping ${n} elements from array of length ${data.length}`);
    }
    
    return data.slice(n);
  }
  
  /**
   * Give:a - Assertive resource transfer operator
   * 
   * Formal Definition:
   *   give:a: ℕ × List(α) × List(α) → (List(α) × List(α)) ⊥
   *   give:a(n, source, dest) = (drop(n, source), dest ⊕ take(n, source))
   * 
   * Properties:
   *   - Conservation: |src'| + |dst'| = |src| + |dst|
   *   - Assertion: throws if n > |source|
   * 
   * @param {number} n - Number of elements to transfer
   * @param {Array} source - Source array
   * @param {Array} dest - Destination array
   * @returns {Array} [newSource, newDest]
   * @throws {Error} If n > source.length
   */
  givea(n, source, dest) {
    if (!Array.isArray(source) || !Array.isArray(dest)) {
      throw new TypeError('givea expects arrays as second and third arguments');
    }
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('givea expects a non-negative integer as first argument');
    }
    if (n > source.length) {
      throw new Error(`InsufficientElementsException: Cannot give ${n} elements from array of length ${source.length}`);
    }
    
    const transferred = this.take(n, source);
    const newSource = this.drop(n, source);
    const newDest = [...dest, ...transferred];
    
    if (this.options.verbose) {
      console.log(`[AnonymousCalculus.givea] Transferred ${n} elements: ${source.length} -> ${newSource.length}, ${dest.length} -> ${newDest.length}`);
    }
    
    return [newSource, newDest];
  }
  
  /**
   * Gett:a - Assertive acquisition operator
   * 
   * Formal Definition:
   *   gett:a: ℕ × List(α) × List(α) → (List(α) × List(α)) ⊥
   *   gett:a(n, source, dest) = (drop(n, source), take(n, source) ⊕ dest)
   * 
   * Difference from give:a: prepends to destination instead of appending
   * 
   * @param {number} n - Number of elements to acquire
   * @param {Array} source - Source array
   * @param {Array} dest - Destination array
   * @returns {Array} [newSource, newDest]
   * @throws {Error} If n > source.length
   */
  getta(n, source, dest) {
    if (!Array.isArray(source) || !Array.isArray(dest)) {
      throw new TypeError('getta expects arrays as second and third arguments');
    }
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('getta expects a non-negative integer as first argument');
    }
    if (n > source.length) {
      throw new Error(`AcquisitionException: Cannot get ${n} elements from array of length ${source.length}`);
    }
    
    const acquired = this.take(n, source);
    const newSource = this.drop(n, source);
    const newDest = [...acquired, ...dest];
    
    if (this.options.verbose) {
      console.log(`[AnonymousCalculus.getta] Acquired ${n} elements: ${source.length} -> ${newSource.length}, ${dest.length} -> ${newDest.length}`);
    }
    
    return [newSource, newDest];
  }
  
  /**
   * Robb:a - House rob dynamic programming
   * 
   * Formal Definition:
   *   robb:a: List(ℕ) → ℕ
   *   Computes maximum sum of non-adjacent elements
   * 
   * Recurrence: rob(xs) = max(rob(take(n-1, xs)), xs[n-1] + rob(take(n-2, xs)))
   * 
   * Properties:
   *   - Optimality: Returns global maximum for non-adjacent subsequence
   *   - Complexity: O(n) time, O(1) space
   * 
   * @param {Array<number>} houses - Array of house values
   * @returns {number} Maximum sum of non-adjacent elements
   */
  robba(houses) {
    if (!Array.isArray(houses)) {
      throw new TypeError('robba expects an array');
    }
    if (houses.length === 0) return 0;
    if (houses.length === 1) return houses[0];
    
    // Dynamic programming with space optimization
    let prev2 = 0;
    let prev1 = houses[0];
    
    for (let i = 1; i < houses.length; i++) {
      const current = Math.max(prev1, prev2 + houses[i]);
      prev2 = prev1;
      prev1 = current;
    }
    
    if (this.options.verbose) {
      console.log(`[AnonymousCalculus.robba] Maximum rob value from ${houses.length} houses: ${prev1}`);
    }
    
    return prev1;
  }
  
  /**
   * Do:a - Monadic action execution operator
   * 
   * Formal Definition:
   *   do:a: (α → β ⊥) × List(α) → List(β) ⊥
   *   Executes action on each element with short-circuit on failure
   * 
   * Properties:
   *   - Fail-fast: Returns error on first failure
   *   - Monadic: Corresponds to mapM in Haskell
   * 
   * @param {Function} action - Function that may throw or return null/undefined
   * @param {Array} data - Input array
   * @returns {Array} Transformed array
   * @throws {Error} If any action fails
   */
  doa(action, data) {
    if (typeof action !== 'function') {
      throw new TypeError('doa expects a function as first argument');
    }
    if (!Array.isArray(data)) {
      throw new TypeError('doa expects an array as second argument');
    }
    
    const result = [];
    for (let i = 0; i < data.length; i++) {
      try {
        const value = action(data[i]);
        if (value === null || value === undefined) {
          throw new Error(`ActionFailedException: Action failed at index ${i}`);
        }
        result.push(value);
      } catch (error) {
        if (this.options.verbose) {
          console.log(`[AnonymousCalculus.doa] Action failed at index ${i}:`, error.message);
        }
        throw error;
      }
    }
    
    if (this.options.verbose) {
      console.log(`[AnonymousCalculus.doa] Successfully executed action on ${data.length} elements`);
    }
    
    return result;
  }
  
  /**
   * ETL Transform - Extract, Transform, Load
   */
  etl(extractFn, transformFn, loadFn) {
    return data => {
      // Extract
      const extracted = extractFn(data);
      if (this.options.verbose) {
        console.log('[ETL] Extracted:', extracted);
      }
      
      // Transform
      const transformed = transformFn(extracted);
      if (this.options.verbose) {
        console.log('[ETL] Transformed:', transformed);
      }
      
      // Load
      const loaded = loadFn(transformed);
      if (this.options.verbose) {
        console.log('[ETL] Loaded:', loaded);
      }
      
      return loaded;
    };
  }
  
  /**
   * Polypipes - Multiple parallel pipes
   */
  polypipes(...pipelines) {
    return data => {
      return pipelines.map(pipeline => {
        if (Array.isArray(pipeline)) {
          return this.pipe(...pipeline)(data);
        }
        return pipeline(data);
      });
    };
  }
  
  /**
   * Maxpipes - Maximum optimization pipes
   */
  maxpipes(...fns) {
    const optimized = fns.map(fn => 
      this.options.memoize ? this._memoize(fn) : fn
    );
    return this.pipe(...optimized);
  }
  
  /**
   * Anonymous mapper - Injectable mapping tool
   */
  mapper(strategy = 'one-to-one') {
    const strategies = {
      'one-to-one': (fn, data) => this.map(fn, data),
      'one-to-many': (fn, data) => this.map(x => [x, fn(x)], data),
      'many-to-one': (fn, data) => this.reduce((acc, x) => fn(acc, x), null, data),
      'many-to-many': (fn, data) => this.map(x => this.map(fn, x), data)
    };
    
    return strategies[strategy] || strategies['one-to-one'];
  }
  
  /**
   * Log to common bayes situation (verbose logging)
   */
  logToCommonBayes(data, situation = 'default') {
    if (this.options.verbose) {
      console.log(`[CommonBayes/${situation}] Data:`, JSON.stringify(data, null, 2));
    }
    return data;
  }
  
  /**
   * Build world within anonymous calculus
   */
  buildWorld(config) {
    const world = {
      lambdas: this.lambdas,
      transforms: new Map(),
      maxopt: this.options.maxopt
    };
    
    // Apply configuration
    if (config.transforms) {
      config.transforms.forEach(t => {
        world.transforms.set(t.name, this.lambda(t.name, t.fn));
      });
    }
    
    if (this.options.verbose) {
      console.log('[AnonymousCalculus] World built with', world.transforms.size, 'transforms');
    }
    
    return world;
  }
  
  /**
   * Get system status
   */
  getStatus() {
    return {
      lambdas: this.lambdas.size,
      transforms: this.transforms.size,
      memoized: this.options.memoize,
      maxopt: this.options.maxopt,
      verbose: this.options.verbose
    };
  }
}

// Export
module.exports = {
  AnonymousCalculus,
  
  // Factory function
  create: (options) => new AnonymousCalculus(options),
  
  // Quick lambdas
  λ: (fn) => fn,
  identity: x => x,
  compose: (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x),
  pipe: (...fns) => x => fns.reduce((acc, fn) => fn(acc), x),
  curry: (fn, arity = fn.length) => {
    return function curried(...args) {
      if (args.length >= arity) {
        return fn(...args);
      }
      return (...moreArgs) => curried(...args, ...moreArgs);
    };
  },
  
  // Algebraic sequence operations
  /**
   * Take - Extract prefix of sequence
   * Formalized as: take: ℕ × List(α) → List(α)
   * 
   * @param {number} n - Number of elements to take
   * @param {Array} xs - Input sequence
   * @returns {Array} First n elements
   */
  take: (n, xs) => {
    if (!Array.isArray(xs)) {
      throw new TypeError('take expects an array as second argument');
    }
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('take expects a non-negative integer as first argument');
    }
    return xs.slice(0, n);
  },
  
  /**
   * Drop - Extract suffix of sequence
   * Formalized as: drop: ℕ × List(α) → List(α)
   * 
   * @param {number} n - Number of elements to drop
   * @param {Array} xs - Input sequence
   * @returns {Array} Remaining elements after dropping first n
   */
  drop: (n, xs) => {
    if (!Array.isArray(xs)) {
      throw new TypeError('drop expects an array as second argument');
    }
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('drop expects a non-negative integer as first argument');
    }
    return xs.slice(n);
  },
  
  /**
   * Give:a - Assertive resource transfer
   * Formalized as: give:a: ℕ × List(α) × List(α) → (List(α) × List(α)) ⊥
   * 
   * @param {number} n - Number of elements to transfer
   * @param {Array} source - Source array
   * @param {Array} dest - Destination array
   * @returns {Array} [newSource, newDest]
   */
  givea: (n, source, dest) => {
    if (!Array.isArray(source) || !Array.isArray(dest)) {
      throw new TypeError('givea expects arrays');
    }
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('givea expects a non-negative integer');
    }
    if (n > source.length) {
      throw new Error(`Cannot give ${n} elements from array of length ${source.length}`);
    }
    const transferred = source.slice(0, n);
    return [source.slice(n), [...dest, ...transferred]];
  },
  
  /**
   * Gett:a - Assertive acquisition
   * Formalized as: gett:a: ℕ × List(α) × List(α) → (List(α) × List(α)) ⊥
   * 
   * @param {number} n - Number of elements to acquire
   * @param {Array} source - Source array
   * @param {Array} dest - Destination array
   * @returns {Array} [newSource, newDest]
   */
  getta: (n, source, dest) => {
    if (!Array.isArray(source) || !Array.isArray(dest)) {
      throw new TypeError('getta expects arrays');
    }
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('getta expects a non-negative integer');
    }
    if (n > source.length) {
      throw new Error(`Cannot get ${n} elements from array of length ${source.length}`);
    }
    const acquired = source.slice(0, n);
    return [source.slice(n), [...acquired, ...dest]];
  },
  
  /**
   * Robb:a - House rob dynamic programming
   * Formalized as: robb:a: List(ℕ) → ℕ
   * 
   * @param {Array<number>} houses - Array of house values
   * @returns {number} Maximum sum of non-adjacent elements
   */
  robba: (houses) => {
    if (!Array.isArray(houses)) {
      throw new TypeError('robba expects an array');
    }
    if (houses.length === 0) return 0;
    if (houses.length === 1) return houses[0];
    
    let prev2 = 0, prev1 = houses[0];
    for (let i = 1; i < houses.length; i++) {
      const current = Math.max(prev1, prev2 + houses[i]);
      prev2 = prev1;
      prev1 = current;
    }
    return prev1;
  },
  
  /**
   * Do:a - Monadic action execution
   * Formalized as: do:a: (α → β ⊥) × List(α) → List(β) ⊥
   * 
   * @param {Function} action - Function to execute
   * @param {Array} data - Input array
   * @returns {Array} Transformed array
   */
  doa: (action, data) => {
    if (typeof action !== 'function') {
      throw new TypeError('doa expects a function');
    }
    if (!Array.isArray(data)) {
      throw new TypeError('doa expects an array');
    }
    
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const value = action(data[i]);
      if (value === null || value === undefined) {
        throw new Error(`Action failed at index ${i}`);
      }
      result.push(value);
    }
    return result;
  }
};

module.exports.default = AnonymousCalculus;
