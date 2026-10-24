# A/B + NVME Workflow Verification

Verification timestamp: 2026-09-29 (UTC)

## Scope

- Repository: `xaoex/reality-simulation-code`
- A/B workflow branch reviewed: `copilot/run-ab-test-in-workflows`
- NVME workflow branch reviewed: `copilot/run-ab-tests-on-nvme`

## A/B workflow evidence (pull_request event)

The following sampled A/B-related workflow runs were `completed/success`:

- `.github/workflows/AB-Summary-Since-Banmastargatanc-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227831
- `.github/workflows/AB-dev-summary-c-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227826
- `.github/workflows/AB-summary-c-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227842
- `.github/workflows/AB-summary-complete-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227864
- `.github/workflows/ab-since-nkoping-c-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227855
- `.github/workflows/ab-test-current-c-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227875
- `.github/workflows/ab-test-nkoping-c-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227827
- `.github/workflows/ab-test-max-since-last-c-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227874
- `.github/workflows/ab-test—full-since-nkopingc-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227860
- `.github/workflows/current-ab-derivate-c-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227836
- `.github/workflows/realassabtestmaxall-c-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227840
- `.github/workflows/run-ab-test-in-workflows-c-cpp.yml`  
  https://github.com/xaoex/reality-simulation-code/actions/runs/27491227837

## NVME workflow evidence

Successful runs on `copilot/run-ab-tests-on-nvme`:

- `Run Tests` (pull_request)  
  https://github.com/xaoex/reality-simulation-code/actions/runs/36334906301
- `Publish Docker Package` (pull_request)  
  https://github.com/xaoex/reality-simulation-code/actions/runs/36334906231
- `C/C++ CI` (push)  
  https://github.com/xaoex/reality-simulation-code/actions/runs/36334904465
- `CMake on multiple platforms +all +qa` (push)  
  https://github.com/xaoex/reality-simulation-code/actions/runs/36334904503

Known failing run:

- `.github/workflows/nvme-full-load.yml` (push, `completed/failure`)  
  https://github.com/xaoex/reality-simulation-code/actions/runs/36334903698

For this failing run, GitHub Actions API currently reports no jobs for the run (`total_count = 0`) and therefore no failed job logs were available through the API response.

## Re-running the current configuration
The NVMe full-load workflow is manually dispatched. By default, its test suites and A/B replay jobs run on a self-hosted runner with the `self-hosted`, `linux`, `x64`, and `nvme` labels. The discovery job remains on GitHub-hosted Ubuntu. The runner must be online and have the required labels and tools installed.

```sh
gh workflow run nvme-full-load.yml \
  -f max_parallel_ab_jobs=4
```

To override the default and use GitHub-hosted Ubuntu runners:
The NVMe full-load workflow is manually dispatched. By default, the test jobs require a registered self-hosted runner with the `self-hosted`, `linux`, `x64`, and `nvme` labels:

```sh
gh workflow run nvme-full-load.yml \
  -f runner_labels='["self-hosted","linux","x64","nvme"]' \
  -f max_parallel_ab_jobs=4
```

To run without the NVMe runner, explicitly select GitHub-hosted Ubuntu runners:

```sh
gh workflow run nvme-full-load.yml \
  -f runner_labels='["ubuntu-latest"]' \
  -f max_parallel_ab_jobs=4
```

The runner must have Node.js 20, Python 3 with pip, CMake, and a C compiler/build tools installed. The workflow discovers all A/B-named workflows and replays their `run` steps; the current 13 A/B workflows all execute the same autotools commands. The companion checks can also be run locally:

```sh
npm test
npm run build
./configure && make && make check && make distcheck
cmake -S . -B /tmp/reality-simulation-build
cmake --build /tmp/reality-simulation-build
ctest --test-dir /tmp/reality-simulation-build --output-on-failure
```


These workflows do not perform NVMe device I/O or benchmark storage hardware. The `runner_labels` input selects where the workflow runs; the default requires an NVMe-labelled self-hosted runner, while the Ubuntu override runs the same configuration and build checks without NVMe hardware. A real storage benchmark would need a separate, explicitly designed hardware test.

The full-load workflow also runs its npm, autotools, and CMake suites unconditionally because all three configurations are present in this repository. Job-level conditions must not use `hashFiles()`, which is unavailable in that context.
