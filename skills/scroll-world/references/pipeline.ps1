# Pipeline: PowerShell batch scripts for Windows environments

$script:WORK = "$env:TEMP\scroll-world"
$script:ASSETS = ".\assets"
New-Item -ItemType Directory -Force -Path $script:WORK, "$script:ASSETS\vid" | Out-Null

$script:NAMES = @("farm", "kitchen", "shop", "delivery", "plaza", "finale")
$script:VMODEL = "seedance_2_0"
$script:DIVE_DUR = 8
$script:CONN_DUR = 5

# --- Step 1: Higgsfield Generation Functions ---
function New-HiggsfieldDive {
    param(
        [string]$name,
        [string]$vModel = $script:VMODEL,
        [int]$duration = $script:DIVE_DUR
    )
    $prompt = Get-Content "$script:WORK\dive_$name.txt" -Raw
    higgsfield generate create $vModel --prompt $prompt `
      --start-image "$script:WORK\still_$name.png" `
      --mode std --resolution 1080p --aspect_ratio 16:9 --duration $duration `
      --wait --wait-timeout 20m --json > "$script:WORK\dive_$name.json"
}

function New-HiggsfieldConn {
    param(
        [int]$index,
        [string]$startPng,
        [string]$endPng,
        [string]$vModel = $script:VMODEL,
        [int]$duration = $script:CONN_DUR
    )
    $prompt = Get-Content "$script:WORK\conn_$index.txt" -Raw
    higgsfield generate create $vModel --prompt $prompt `
      --start-image $startPng --end-image $endPng `
      --mode std --resolution 1080p --aspect_ratio 16:9 --duration $duration `
      --wait --wait-timeout 20m --json > "$script:WORK\conn_$index.json"
}

# --- Step 2: Boundary Frame Extraction ---
function Extract-BoundaryFrames {
    param([string]$name)
    ffmpeg -v error -y -ss 0 -i "$script:WORK\dive_$name.mp4" -frames:v 1 -q:v 2 "$script:WORK\first_$name.png"
    ffmpeg -v error -y -sseof -0.15 -i "$script:WORK\dive_$name.mp4" -frames:v 1 -q:v 2 "$script:WORK\last_$name.png"
}

# --- Step 3: Scrub-Optimized Video Encoding ---
function Encode-ScrubVideo {
    param([string]$inputMp4, [string]$outputMp4, [int]$gop = 8)
    ffmpeg -v error -y -i $inputMp4 -an -vf "unsharp=5:5:0.8:5:5:0.0" `
      -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p `
      -g $gop -keyint_min $gop -sc_threshold 0 -movflags +faststart $outputMp4
}

# Process all dives
foreach ($n in $script:NAMES) {
    if (Test-Path "$script:WORK\dive_$n.mp4") {
        Encode-ScrubVideo "$script:WORK\dive_$n.mp4" "$script:ASSETS\vid\$n.mp4"
        Extract-BoundaryFrames $n
    }
}

# Process connectors
$conns = Get-ChildItem "$script:WORK\conn_*.mp4"
$i = 1
foreach ($c in $conns) {
    Encode-ScrubVideo $c.FullName "$script:ASSETS\vid\conn$i.mp4"
    $i++
}

Write-Host "Encoding and boundary frame extraction complete!" -ForegroundColor Green

