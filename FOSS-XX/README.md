# FOSS-XX - Free and Open Source Software Store for Retro Computers

A free and open source software store for computers from the 80s onwards, inspired by F-Droid.

## Overview

FOSS-XX is a repository and catalog system for distributing free and open source software targeting retro and vintage computing platforms from the 1980s to present day. Similar to how F-Droid serves the Android ecosystem, FOSS-XX aims to preserve and distribute FOSS applications for classic computing environments.

## Supported Platforms

### 1980s
- Commodore 64/128
- Apple II series
- IBM PC/XT/AT (DOS)
- Amiga
- Atari ST
- MSX
- ZX Spectrum

### 1990s
- DOS (MS-DOS, FreeDOS)
- Windows 3.x/9x
- Classic Mac OS
- Linux (early distributions)
- OS/2
- BeOS

### 2000s
- Windows XP
- Mac OS X (early versions)
- Linux distributions
- FreeBSD/NetBSD/OpenBSD

### 2010s-Present
- Modern Linux
- Windows 10/11
- macOS
- BSD variants
- ReactOS
- Haiku

## Repository Structure

```
FOSS-XX/
├── repo/           # Repository metadata and index files
├── apps/           # Application packages and binaries
├── metadata/       # App metadata (descriptions, screenshots, etc.)
├── icons/          # Application icons
├── categories/     # Category definitions
└── index.json      # Main repository index
```

## Usage

### As a User

Browse the repository catalog at `index.json` to find available software for your platform.

### As a Developer

1. Fork this repository
2. Add your application metadata to the `metadata/` directory
3. Add application packages to `apps/`
4. Submit a pull request

## Categories

- **Development** - IDEs, compilers, debuggers
- **Games** - FOSS games and emulators
- **Graphics** - Image editors, viewers, art tools
- **Internet** - Browsers, email clients, FTP tools
- **Multimedia** - Audio/video players and editors
- **Office** - Word processors, spreadsheets, databases
- **System** - System utilities, file managers, shells
- **Education** - Learning tools and educational software
- **Science** - Scientific computing and visualization
- **Emulators** - Platform emulators for running retro software

## Metadata Format

Application metadata follows a JSON format similar to F-Droid's YAML format:

```json
{
  "id": "app.example.myapp",
  "name": "My Application",
  "summary": "Short description",
  "description": "Full description of the application",
  "license": "GPL-3.0",
  "website": "https://example.com",
  "source": "https://github.com/example/myapp",
  "categories": ["Development"],
  "platforms": ["dos", "linux", "windows"],
  "versions": [
    {
      "version": "1.0.0",
      "date": "2024-01-01",
      "downloads": {
        "dos": "apps/myapp-1.0.0-dos.zip",
        "linux": "apps/myapp-1.0.0-linux.tar.gz",
        "windows": "apps/myapp-1.0.0-windows.zip"
      },
      "checksums": {
        "dos": "sha256:...",
        "linux": "sha256:...",
        "windows": "sha256:..."
      }
    }
  ]
}
```

## Contributing

Contributions are welcome! Please see our contribution guidelines for more information.

## License

This repository catalog is released under the MIT license. Individual applications have their own licenses as specified in their metadata.

## Links

- [F-Droid](https://f-droid.org) - Inspiration for this project
- [xaoex](https://linktr.ee/xaoex)
- [oktays](https://linktr.ee/oktays)

## Part of Reality Simulation Code

FOSS-XX is part of the Reality Simulation codebase by xaoex.
