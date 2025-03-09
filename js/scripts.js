const scripts = [
    {
        id: 1,
        title: "Monitor Wydajności Systemu",
        description: "Skrypt monitorujący kluczowe parametry wydajności systemu",
        code: `
# Monitor Wydajności Systemu
function Get-SystemPerformance {
    [CmdletBinding()]
    param (
        [int]$IntervalSeconds = 5,
        [int]$SampleCount = 12
    )

    $samples = @()
    for ($i = 1; $i -le $SampleCount; $i++) {
        $cpu = Get-Counter '\\Processor(_Total)\\% Processor Time' | 
               Select-Object -ExpandProperty CounterSamples | 
               Select-Object -ExpandProperty CookedValue

        $memory = Get-Counter '\\Memory\\Available MBytes' |
                 Select-Object -ExpandProperty CounterSamples |
                 Select-Object -ExpandProperty CookedValue

        $disk = Get-Counter '\\PhysicalDisk(_Total)\\% Disk Time' |
                Select-Object -ExpandProperty CounterSamples |
                Select-Object -ExpandProperty CookedValue

        $sample = [PSCustomObject]@{
            Timestamp = Get-Date
            CPU = [math]::Round($cpu, 2)
            MemoryAvailable = [math]::Round($memory/1024, 2)
            DiskUsage = [math]::Round($disk, 2)
        }

        $samples += $sample
        
        Clear-Host
        Write-Host "Monitor Wydajności Systemu - Próbka $i z $SampleCount"
        Write-Host "----------------------------------------"
        Write-Host "CPU: $($sample.CPU)%"
        Write-Host "Dostępna pamięć: $($sample.MemoryAvailable) GB"
        Write-Host "Użycie dysku: $($sample.DiskUsage)%"
        
        Start-Sleep -Seconds $IntervalSeconds
    }

    return $samples
}

# Użycie:
# Get-SystemPerformance -IntervalSeconds 2 -SampleCount 5
`
    },
    {
        id: 2,
        title: "Automatyczne Kopie Zapasowe",
        description: "Skrypt do automatyzacji kopii zapasowych z rotacją",
        code: `
# Automatyczne Kopie Zapasowe z Rotacją
function Start-BackupRotation {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [string]$SourcePath,
        
        [Parameter(Mandatory)]
        [string]$BackupBasePath,
        
        [int]$KeepBackups = 7,
        
        [string[]]$ExcludePatterns = @("*.tmp", "*.log"),
        
        [switch]$Compress
    )

    # Utworzenie katalogu kopii zapasowych jeśli nie istnieje
    if (-not (Test-Path $BackupBasePath)) {
        New-Item -Path $BackupBasePath -ItemType Directory
    }

    # Generowanie nazwy dla nowej kopii
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupPath = Join-Path $BackupBasePath "Backup_$timestamp"

    try {
        # Tworzenie kopii
        if ($Compress) {
            $zipPath = "$backupPath.zip"
            Compress-Archive -Path $SourcePath -DestinationPath $zipPath -Force
        } else {
            Copy-Item -Path $SourcePath -Destination $backupPath -Recurse -Force
        }

        # Czyszczenie starych kopii
        $allBackups = Get-ChildItem -Path $BackupBasePath |
                     Sort-Object CreationTime -Descending |
                     Select-Object -Skip $KeepBackups

        foreach ($backup in $allBackups) {
            Remove-Item -Path $backup.FullName -Recurse -Force
            Write-Host "Usunięto starą kopię: $($backup.Name)"
        }

        Write-Host "Kopia zapasowa utworzona pomyślnie: $($Compress ? $zipPath : $backupPath)"
    }
    catch {
        Write-Error "Błąd podczas tworzenia kopii zapasowej: $_"
    }
}

# Użycie:
# Start-BackupRotation -SourcePath "C:\\Projekty" -BackupBasePath "D:\\Backups" -Compress
`
    },
    {
        id: 3,
        title: "Audyt Bezpieczeństwa",
        description: "Skrypt przeprowadzający podstawowy audyt bezpieczeństwa systemu",
        code: `
# Audyt Bezpieczeństwa Systemu
function Start-SecurityAudit {
    [CmdletBinding()]
    param (
        [string]$ReportPath = "SecurityAudit_$(Get-Date -Format 'yyyyMMdd').html"
    )

    $report = @"
<!DOCTYPE html>
<html>
<head>
    <title>Raport Bezpieczeństwa Systemu</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .section { margin-bottom: 20px; }
        .warning { color: red; }
        .ok { color: green; }
    </style>
</head>
<body>
<h1>Raport Bezpieczeństwa Systemu - $(Get-Date)</h1>
"@

    # Sprawdzanie aktualizacji systemu
    $updates = Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 5
    $report += "<div class='section'><h2>Ostatnie Aktualizacje Systemu</h2><ul>"
    foreach ($update in $updates) {
        $report += "<li>$($update.HotFixID) - $($update.InstalledOn)</li>"
    }
    $report += "</ul></div>"

    # Sprawdzanie uruchomionych usług
    $services = Get-Service | Where-Object Status -eq 'Running'
    $report += "<div class='section'><h2>Uruchomione Usługi</h2><ul>"
    foreach ($service in $services) {
        $report += "<li>$($service.DisplayName) ($($service.Name))</li>"
    }
    $report += "</ul></div>"

    # Sprawdzanie otwartych portów
    $netstat = Get-NetTCPConnection | Where-Object State -eq 'Listen'
    $report += "<div class='section'><h2>Otwarte Porty TCP</h2><ul>"
    foreach ($connection in $netstat) {
        $report += "<li>Port $($connection.LocalPort) - $($connection.State)</li>"
    }
    $report += "</ul></div>"

    # Sprawdzanie użytkowników lokalnych
    $users = Get-LocalUser
    $report += "<div class='section'><h2>Konta Użytkowników</h2><ul>"
    foreach ($user in $users) {
        $status = if ($user.Enabled) { "class='ok'>Aktywne" } else { "class='warning'>Nieaktywne" }
        $report += "<li>$($user.Name) - <span $status</span></li>"
    }
    $report += "</ul></div>"

    # Sprawdzanie zasad haseł
    $passwordPolicy = Get-LocalSecurityPolicy | Where-Object Category -eq 'Password Policy'
    $report += "<div class='section'><h2>Zasady Haseł</h2><ul>"
    foreach ($policy in $passwordPolicy) {
        $report += "<li>$($policy.Name): $($policy.Value)</li>"
    }
    $report += "</ul></div>"

    $report += "</body></html>"
    $report | Out-File -FilePath $ReportPath -Encoding UTF8
    Write-Host "Raport został zapisany do: $ReportPath"
}

# Użycie:
# Start-SecurityAudit -ReportPath "C:\\Reports\\SecurityAudit.html"
`
    }
];

function loadScripts() {
    const scriptsList = document.querySelector('.scripts-list');
    scriptsList.innerHTML = scripts.map(script => `
        <div class="script-card mb-4">
            <h3>${script.title}</h3>
            <p>${script.description}</p>
            <pre><code class="language-powershell">${script.code}</code></pre>
        </div>
    `).join('');

    // Inicjalizacja kolorowania składni
    Prism.highlightAll();
}

// Dodanie do window aby było dostępne z main.js
window.loadScripts = loadScripts;
