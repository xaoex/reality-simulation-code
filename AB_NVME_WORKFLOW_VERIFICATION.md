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
