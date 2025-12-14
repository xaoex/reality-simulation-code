# Subpackage Organization Structure

This document describes the organized structure of each subpackage in the reality-simulation-code repository.

## Organization Pattern

Each subpackage follows a consistent, organized structure inspired by `.realitycsems`:

```
.subpackage/
├── config/          # Configuration files
├── lib/             # Main source code / library files
├── tests/           # Test files
├── examples/        # Usage examples
├── docs/            # Documentation
├── releases/        # Release information
└── README.md        # Main documentation
```

## Subpackages

### .anonymouscalc - Anonymous Calculus System

Lambda/Anonymous calculus mapping tool with ETL transformations.

**Structure:**
- `config/` - System configuration
- `lib/anonymous-calculus.js` - Main lambda calculus implementation
- `tests/` - Test files for lambda operations
- `examples/` - ETL, polypipes, composition examples
- `docs/` - API documentation and guides
- `releases/` - Version history

### .baes - Bayesian Situations System

Bayesian common situations for maximize, optimize, and discover.

**Structure:**
- `config/` - System configuration
- `lib/baes-system.js` - Bayesian situation implementation
- `tests/` - Test files for maximization and optimization
- `examples/` - Maximization and pattern discovery examples
- `docs/` - API documentation and guides
- `releases/` - Version history

### .coolems - Cool Enterprise Management System

Reality + CS integration with predictive models.

**Structure:**
- `config/` - System configuration
- `lib/coolems-system.js` - Enterprise management implementation
- `tests/` - Test files for enterprise features
- `examples/` - Enterprise integration and predictive model examples
- `docs/` - API documentation and guides
- `releases/` - Version history

### .realitycsems - Reality CSEMS Layer System

Git-like layer system with 100% maxopt injection (already well-organized).

**Structure:**
- `config/` - System configuration
- `packages/` - Multi-language implementations
- `refs/` - Layer references (git-like)
- `releases/` - Release information
- `README.md` - Main documentation

## Benefits of This Organization

1. **Consistency** - All subpackages follow the same structure
2. **Discoverability** - Easy to find tests, examples, and documentation
3. **Maintainability** - Clear separation of concerns
4. **Scalability** - Easy to add new features in appropriate directories
5. **Documentation** - Each directory has its own README
6. **Releases** - Track version history consistently

## Migration Notes

- Moved `lambdas/` → `lib/` in `.anonymouscalc`
- Moved `situations/` → `lib/` in `.baes`
- Moved `modules/` → `lib/` in `.coolems`
- Updated all internal references
- All tests still pass ✓

## Future Additions

Each subpackage can easily add:
- Additional test files in `tests/`
- New examples in `examples/`
- Extended documentation in `docs/`
- Version tracking in `releases/`

---

*Organized structure for divide and conquer approach - December 2025*
