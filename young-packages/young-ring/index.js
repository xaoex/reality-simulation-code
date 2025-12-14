/**
 * Young Ring - Abstract Mathematical Ring
 * 
 * A Young Ring is an algebraic structure Y = (R, +, ×, 0, 1) where:
 * - (R, +, 0) is an abelian group (additive structure)
 * - (R, ×, 1) is a monoid (multiplicative structure)
 * - Left Distribution: a × (b + c) = (a × b) + (a × c)
 * - Right Distribution: (a + b) × c = (a × c) + (b × c)
 * 
 * Combines relational algebra with group and ring theory foundations.
 * 
 * @module young-ring
 * @version 1.0.0-template
 * @author xaoex
 */

class YoungRing {
  constructor(elements = [], addOp = null, mulOp = null, zeroVal = 0, oneVal = 1) {
    this.elements = new Set(elements);
    this.addOp = addOp || ((a, b) => a + b);
    this.mulOp = mulOp || ((a, b) => a * b);
    this.zero = zeroVal;
    this.one = oneVal;
  }

  /**
   * Addition operation in the ring
   */
  add(a, b) {
    return this.addOp(a, b);
  }

  /**
   * Multiplication operation in the ring
   */
  multiply(a, b) {
    return this.mulOp(a, b);
  }

  /**
   * Relational Algebra: Selection (σ)
   * Filter elements based on predicate
   */
  select(predicate) {
    return new Set([...this.elements].filter(predicate));
  }

  /**
   * Relational Algebra: Projection (π)
   * Map elements using a function
   */
  project(mapper) {
    return new Set([...this.elements].map(mapper));
  }

  /**
   * Relational Algebra: Join (⋈)
   * Combine with another ring's elements
   */
  join(otherRing) {
    const result = new Set();
    for (const a of this.elements) {
      for (const b of otherRing.elements) {
        result.add([a, b]);
      }
    }
    return result;
  }

  /**
   * Check if element is in the ring
   */
  contains(element) {
    return this.elements.has(element);
  }
}

module.exports = {
  YoungRing,
  version: '1.0.0-template',
  packageName: '@xaoex/young-ring'
};
