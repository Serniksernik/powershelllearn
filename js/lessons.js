const lessons = [
    {
        id: 1,
        title: "Wprowadzenie do PowerShell",
        content: `
PowerShell to framework automatyzacji zadań firmy Microsoft, składający się z powłoki wiersza poleceń i języka skryptowego.

Kluczowe Koncepcje:
- Polecenia PowerShell nazywane są cmdletami
- Cmdlety używają konwencji nazewnictwa Czasownik-Rzeczownik
- PowerShell jest zorientowany obiektowo, nie tekstowo
        `,
        examples: [
            {
                command: "Get-Help",
                description: "Uzyskuje pomoc na temat poleceń PowerShell",
                usage: "Get-Help Get-Process -Detailed"
            },
            {
                command: "Get-Command",
                description: "Wyświetla listę dostępnych poleceń",
                usage: "Get-Command -Verb Get"
            },
            {
                command: "Get-Verb",
                description: "Lista wszystkich standardowych czasowników PowerShell",
                usage: "Get-Verb | Sort-Object Group"
            },
            {
                command: "Get-Member",
                description: "Pokazuje właściwości i metody obiektu",
                usage: "Get-Process | Get-Member"
            },
            {
                command: "Get-Help about_*",
                description: "Wyświetla listę wszystkich tematów koncepcyjnych",
                usage: "Get-Help about_Operators"
            },
            {
                command: "Update-Help",
                description: "Aktualizuje lokalną dokumentację PowerShell",
                usage: "Update-Help -Force"
            },
            {
                command: `Get-Help Get-Process -Examples`,
                description: "Pokazuje przykłady użycia konkretnego polecenia",
                usage: "Get-Help Get-Process -Examples"
            },
            {
                command: "Get-Command -Module Microsoft.PowerShell.Security",
                description: "Wyświetla polecenia związane z bezpieczeństwem",
                usage: "Get-Command -Module Microsoft.PowerShell.Security"
            },
            {
                command: `$PSVersionTable`,
                description: "Sprawdza wersję PowerShell i inne informacje o środowisku",
                usage: "$PSVersionTable"
            },
            {
                command: "Get-Host",
                description: "Wyświetla informacje o hoście PowerShell",
                usage: "Get-Host | Select-Object Version,CurrentCulture"
            }
        ]
    },
    {
        id: 2,
        title: "Podstawowa Nawigacja i Operacje na Plikach",
        content: `
Naucz się nawigować po systemie plików i wykonywać podstawowe operacje na plikach w PowerShell.

Kluczowe Koncepcje:
- Get-Location (pwd): Pokazuje bieżącą lokalizację
- Set-Location (cd): Zmiana katalogu
- Get-ChildItem (dir/ls): Lista plików i katalogów
- New-Item: Tworzenie plików i katalogów
- Copy-Item: Kopiowanie
- Move-Item: Przenoszenie
- Remove-Item: Usuwanie
        `,
        examples: [
            {
                command: "Get-Location",
                description: "Pokazuje bieżący katalog",
                usage: "Get-Location"
            },
            {
                command: "Set-Location $HOME",
                description: "Przechodzi do katalogu domowego użytkownika",
                usage: "Set-Location $HOME"
            },
            {
                command: "Get-ChildItem -Path C:\\ -Recurse -Filter *.txt",
                description: "Wyszukuje rekursywnie wszystkie pliki .txt",
                usage: "Get-ChildItem -Path C:\\ -Recurse -Filter *.txt"
            },
            {
                command: `
New-Item -Path "C:\\Testy" -ItemType Directory
New-Item -Path "C:\\Testy\\test.txt" -ItemType File`,
                description: "Tworzy katalog i plik",
                usage: 'New-Item -Path "C:\\Testy\\test.txt" -ItemType File'
            },
            {
                command: "Copy-Item .\\source.txt .\\backup\\",
                description: "Kopiuje plik do katalogu backup",
                usage: "Copy-Item .\\source.txt .\\backup\\"
            },
            {
                command: "Move-Item .\\old\\* .\\new\\",
                description: "Przenosi wszystkie pliki ze starego do nowego katalogu",
                usage: "Move-Item .\\old\\* .\\new\\"
            },
            {
                command: "Remove-Item .\\temp\\* -Recurse -Force",
                description: "Usuwa wszystkie pliki w katalogu temp (rekursywnie)",
                usage: "Remove-Item .\\temp\\* -Recurse -Force"
            },
            {
                command: `
Get-ChildItem -Path C:\\ -Include *.log -Recurse |
Where-Object { $_.Length -gt 1MB }`,
                description: "Znajduje wszystkie pliki .log większe niż 1MB",
                usage: "Get-ChildItem -Path C:\\ -Include *.log -Recurse | Where-Object { $_.Length -gt 1MB }"
            },
            {
                command: `
Get-ChildItem |
Sort-Object LastWriteTime -Descending |
Select-Object -First 10`,
                description: "Pokazuje 10 ostatnio zmodyfikowanych plików",
                usage: "Get-ChildItem | Sort-Object LastWriteTime -Descending | Select-Object -First 10"
            },
            {
                command: `
$path = "C:\\Logs"
if (!(Test-Path $path)) {
    New-Item -Path $path -ItemType Directory
    "Utworzono katalog: $path"
} else {
    "Katalog już istnieje: $path"
}`,
                description: "Sprawdza i tworzy katalog jeśli nie istnieje",
                usage: 'Test-Path "C:\\Logs"'
            }
        ]
    },
    {
        id: 3,
        title: "Praca z Obiektami",
        content: `
PowerShell pracuje z obiektami zamiast z tekstem, co umożliwia zaawansowaną manipulację danymi.

Kluczowe Koncepcje:
1. Potok (|):
   - Symbol | przekazuje wyniki z jednego polecenia do następnego
   - Przykład: "Get-Process | Select-Object Name, CPU"
   - Get-Process pobiera wszystkie procesy
   - | przekazuje te procesy do Select-Object
   - Select-Object wybiera tylko nazwę i użycie CPU

2. Właściwości:
   - Każdy obiekt ma właściwości (np. Name, CPU, Path)
   - Dostęp przez kropkę: $process.Name

3. Metody:
   - Funkcje, które można wykonać na obiekcie
   - Wywoływane przez kropkę: $string.ToUpper()

4. Selekcja i Filtrowanie:
   - Select-Object: wybiera określone właściwości
   - Where-Object: filtruje obiekty według warunków
   - Group-Object: grupuje obiekty
   - Sort-Object: sortuje obiekty
        `,
        examples: [
            {
                command: "Get-Process | Select-Object Name, CPU, WorkingSet",
                description: "Wybiera konkretne właściwości procesów",
                usage: "Get-Process | Select-Object Name, CPU, WorkingSet"
            },
            {
                command: `
Get-Service |
Where-Object Status -eq 'Running' |
Sort-Object DisplayName`,
                description: "Filtruje uruchomione usługi i sortuje je po nazwie",
                usage: "Get-Service | Where-Object Status -eq 'Running' | Sort-Object DisplayName"
            },
            {
                command: `
Get-Process |
Group-Object Company |
Sort-Object Count -Descending |
Select-Object Name, Count`,
                description: "Grupuje procesy według producenta i pokazuje liczby",
                usage: "Get-Process | Group-Object Company | Sort-Object Count -Descending"
            },
            {
                command: `
Get-Process |
Where-Object WorkingSet -gt 100MB |
Select-Object Name, @{
    Name='WorkingSetMB';
    Expression={[math]::Round($_.WorkingSet/1MB, 2)}
}`,
                description: "Konwertuje bajty na megabajty w wynikach",
                usage: "Get-Process | Where-Object WorkingSet -gt 100MB"
            },
            {
                command: `
$processes = Get-Process
$totalMemory = ($processes |
Measure-Object WorkingSet -Sum).Sum / 1GB
"Całkowite użycie pamięci: $([math]::Round($totalMemory, 2)) GB"`,
                description: "Oblicza całkowite użycie pamięci",
                usage: "Get-Process | Measure-Object WorkingSet -Sum"
            },
            {
                command: `
Get-Service |
Select-Object Name, Status, @{
    Name='StartType';
    Expression={(Get-Service $_.Name).StartType}
}`,
                description: "Dodaje obliczoną właściwość do wyników",
                usage: "Get-Service | Select-Object Name, Status, @{Name='StartType'; Expression={(Get-Service $_.Name).StartType}}"
            },
            {
                command: `
Get-Process |
Sort-Object CPU -Descending |
Select-Object -First 5 |
Format-Table Name, CPU, WorkingSet -AutoSize`,
                description: "Pokazuje 5 procesów z największym użyciem CPU",
                usage: "Get-Process | Sort-Object CPU -Descending | Select-Object -First 5"
            },
            {
                command: `
Get-ChildItem |
Where-Object {$_.LastWriteTime -gt (Get-Date).AddDays(-7)} |
Select-Object Name, LastWriteTime`,
                description: "Znajduje pliki zmodyfikowane w ciągu ostatnich 7 dni",
                usage: "Get-ChildItem | Where-Object {$_.LastWriteTime -gt (Get-Date).AddDays(-7)}"
            },
            {
                command: `
$services = Get-Service
$running = $services.Where({$_.Status -eq 'Running'}).Count
$stopped = $services.Where({$_.Status -eq 'Stopped'}).Count
"Uruchomione: $running, Zatrzymane: $stopped"`,
                description: "Używa metody Where() do filtrowania obiektów",
                usage: "$services = Get-Service; $services.Where({$_.Status -eq 'Running'}).Count"
            },
            {
                command: `
Get-Process |
Select-Object Name, @{
    Name='Memory(MB)';
    Expression={[math]::Round($_.WorkingSet/1MB, 2)}
}, @{
    Name='CPU(s)';
    Expression={[math]::Round($_.CPU, 2)}
} |
Sort-Object 'Memory(MB)' -Descending |
Format-Table -AutoSize`,
                description: "Formatuje i prezentuje dane w czytelnej tabeli",
                usage: "Get-Process | Select-Object Name, @{Name='Memory(MB)'; Expression={[math]::Round($_.WorkingSet/1MB, 2)}}"
            }
        ]
    },
    {
        id: 4,
        title: "Zmienne i Typy Danych",
        content: `
W PowerShell zmienne rozpoczynają się od znaku $ i są dynamicznie typowane.

Kluczowe Koncepcje:
1. Deklaracja Zmiennych:
   - $nazwa = wartość
   - [typ]$nazwa = wartość (opcjonalne określenie typu)

2. Podstawowe Typy Danych:
   - String: $tekst = "Hello"
   - Integer: $liczba = 42
   - Boolean: $prawda = $true
   - Array: $tablica = @(1,2,3)
   - Hashtable: $hash = @{Klucz="Wartość"}

3. Sprawdzanie Typu:
   - $zmienna.GetType()
   - $zmienna -is [typ]
        `,
        examples: [
            {
                command: '$name = "Jan"; $age = 30; "$name ma $age lat"',
                description: "Podstawowe użycie zmiennych w tekście",
                usage: '$name = "Jan"; $age = 30; "$name ma $age lat"'
            },
            {
                command: '[int]$liczba = "42"; $liczba.GetType().Name',
                description: "Jawne określanie typu zmiennej",
                usage: '[int]$liczba = "42"; $liczba.GetType().Name'
            },
            {
                command: `
$data = @{
    Name = "Server01"
    IP = "192.168.1.100"
    Services = @("HTTP", "FTP", "DNS")
}
$data.Services`,
                description: "Tworzenie i używanie tablic asocjacyjnych (hashtables)",
                usage: '$data = @{Name="Server01"; IP="192.168.1.100"}; $data.Name'
            },
            {
                command: `
$servers = @("Server01", "Server02", "Server03")
foreach ($server in $servers) {
    "Sprawdzanie serwera: $server"
}`,
                description: "Pętla foreach z tablicą",
                usage: 'foreach ($server in $servers) { "Serwer: $server" }'
            },
            {
                command: `
[DateTime]$date = "2024-03-09"
$date.AddDays(30)
$date.DayOfWeek`,
                description: "Praca z datami",
                usage: '[DateTime]$date = "2024-03-09"; $date.AddDays(30)'
            },
            {
                command: `
$config = [PSCustomObject]@{
    ServerName = "WebServer01"
    MaxConnections = 1000
    IsEnabled = $true
}
$config | ConvertTo-Json`,
                description: "Tworzenie obiektów niestandardowych",
                usage: '$config = [PSCustomObject]@{ServerName="WebServer01"}'
            },
            {
                command: `
$numbers = 1..10
$sum = ($numbers | Measure-Object -Sum).Sum
$avg = ($numbers | Measure-Object -Average).Average
"Suma: $sum, Średnia: $avg"`,
                description: "Operacje na kolekcjach liczb",
                usage: '$numbers = 1..10; ($numbers | Measure-Object -Sum).Sum'
            },
            {
                command: `
$environmentVars = @{}
Get-ChildItem Env: | ForEach-Object {
    $environmentVars[$_.Name] = $_.Value
}
$environmentVars["PATH"]`,
                description: "Zbieranie zmiennych środowiskowych do hashtable",
                usage: 'Get-ChildItem Env: | ForEach-Object { $_.Name }'
            },
            {
                command: `
$multiline = @"
To jest
tekst
wieloliniowy
"@
$multiline.Split("\n").Count`,
                description: "Praca z tekstem wieloliniowym",
                usage: '$multiline = @"\\nLinia1\\nLinia2\\n"@'
            },
            {
                command: `
$processes = Get-Process
$report = [PSCustomObject]@{
    TotalProcesses = $processes.Count
    TotalMemoryMB = [math]::Round(($processes | Measure-Object WorkingSet -Sum).Sum / 1MB, 2)
    TopCPU = ($processes | Sort-Object CPU -Descending | Select-Object -First 1).Name
}
$report | Format-List`,
                description: "Tworzenie raportu z użyciem różnych typów danych",
                usage: '$report = [PSCustomObject]@{TotalProcesses=(Get-Process).Count}'
            }
        ]
    },
    {
        id: 5,
        title: "Skrypty i Funkcje",
        content: `
Funkcje pozwalają na grupowanie i wielokrotne wykorzystanie kodu.

Kluczowe Koncepcje:
1. Definiowanie Funkcji:
   function Nazwa-Funkcji {
       param($parametr1, $parametr2)
       # kod funkcji
   }

2. Parametry:
   - Obowiązkowe: [Parameter(Mandatory)]
   - Opcjonalne z wartością domyślną
   - Walidacja parametrów

3. Zwracanie Wartości:
   - return $wartość
   - Wszystko w potoku jest zwracane
        `,
        examples: [
            {
                command: `
function Get-DiskSpace {
    param (
        [Parameter(Mandatory)]
        [string]$DriveLetter
    )
    $disk = Get-Volume -DriveLetter $DriveLetter
    [PSCustomObject]@{
        Drive = $DriveLetter
        SizeGB = [math]::Round($disk.Size/1GB, 2)
        FreeGB = [math]::Round($disk.SizeRemaining/1GB, 2)
        PercentFree = [math]::Round(($disk.SizeRemaining/$disk.Size)*100, 2)
    }
}
Get-DiskSpace -DriveLetter "C"`,
                description: "Funkcja analizująca przestrzeń dyskową",
                usage: 'Get-DiskSpace -DriveLetter "C"'
            },
            {
                command: `
function Test-ServerConnection {
    param (
        [Parameter(Mandatory, ValueFromPipeline)]
        [string[]]$ComputerName,
        [int]$TimeoutSeconds = 5
    )
    process {
        foreach ($computer in $ComputerName) {
            $result = Test-Connection -ComputerName $computer -Count 1 -Quiet -TimeoutSeconds $TimeoutSeconds
            [PSCustomObject]@{
                Server = $computer
                IsOnline = $result
                Timestamp = Get-Date
            }
        }
    }
}
"server1", "server2" | Test-ServerConnection`,
                description: "Funkcja testująca połączenie z serwerami z obsługą potoku",
                usage: '"server1", "server2" | Test-ServerConnection'
            },
            {
                command: `
function New-LogEntry {
    param (
        [Parameter(Mandatory)]
        [string]$Message,

        [ValidateSet('Information', 'Warning', 'Error')]
        [string]$Severity = 'Information',

        [string]$LogPath = "C:\\Logs\\app.log"
    )

    $logEntry = "[$((Get-Date).ToString('yyyy-MM-dd HH:mm:ss'))][$Severity] $Message"
    Add-Content -Path $LogPath -Value $logEntry
    Write-Host $logEntry
}
New-LogEntry -Message "Aplikacja uruchomiona" -Severity "Information"`,
                description: "Funkcja do logowania z walidacją parametrów",
                usage: 'New-LogEntry -Message "Test" -Severity "Warning"'
            },
            {
                command: `
function Get-ServiceStatus {
    param (
        [Parameter(Mandatory)]
        [string[]]$ServiceNames
    )

    foreach ($service in $ServiceNames) {
        try {
            $status = Get-Service -Name $service -ErrorAction Stop
            [PSCustomObject]@{
                Name = $service
                Status = $status.Status
                StartType = $status.StartType
                Error = $null
            }
        } catch {
            [PSCustomObject]@{
                Name = $service
                Status = "Unknown"
                StartType = "Unknown"
                Error = $_.Exception.Message
            }
        }
    }
}
Get-ServiceStatus -ServiceNames "Spooler", "W32Time"`,
                description: "Funkcja sprawdzająca status usług z obsługą błędów",
                usage: 'Get-ServiceStatus -ServiceNames "Spooler"'
            },
            {
                command: `
function Backup-Files {
    param (
        [Parameter(Mandatory)]
        [string]$SourcePath,

        [Parameter(Mandatory)]
        [string]$DestinationPath,

        [string[]]$FileTypes = @("*.txt", "*.doc", "*.pdf")
    )

    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupPath = Join-Path $DestinationPath "Backup_$timestamp"

    if (-not (Test-Path $backupPath)) {
        New-Item -Path $backupPath -ItemType Directory
    }

    foreach ($type in $FileTypes) {
        Get-ChildItem -Path $SourcePath -Filter $type -Recurse |
        Copy-Item -Destination $backupPath -Force
    }

    return $backupPath
}
Backup-Files -SourcePath "C:\\Documents" -DestinationPath "D:\\Backups"`,
                description: "Funkcja wykonująca kopię zapasową plików",
                usage: 'Backup-Files -SourcePath "C:\\Docs" -DestinationPath "D:\\Backup"'
            },
            {
                command: `
function Convert-Size {
    param (
        [Parameter(Mandatory, ValueFromPipeline)]
        [long]$Bytes
    )

    $sizes = "B", "KB", "MB", "GB", "TB"
    $index = 0
    $value = $Bytes

    while ($value -ge 1024 -and $index -lt ($sizes.Count - 1)) {
        $value = $value / 1024
        $index++
    }

    return "{0:N2} {1}" -f $value, $sizes[$index]
}
1234567890 | Convert-Size`,
                description: "Funkcja konwertująca rozmiary w bajtach na czytelny format",
                usage: '1234567890 | Convert-Size'
            },
            {
                command: `
function Get-ProcessReport {
    [CmdletBinding()]
    param (
        [int]$Top = 5,
        [switch]$IncludeMemory,
        [switch]$IncludeCPU
    )

    $properties = @("Name")
    if ($IncludeMemory) { $properties += @{Name="MemoryMB"; Expression={[math]::Round($_.WorkingSet/1MB, 2)}}}
    if ($IncludeCPU) { $properties += "CPU" }

    Get-Process |
    Sort-Object WorkingSet -Descending |
    Select-Object -First $Top -Property $properties |
    Format-Table -AutoSize
}
Get-ProcessReport -Top 3 -IncludeMemory -IncludeCPU`,
                description: "Funkcja generująca raport o procesach z parametrami przełącznikowymi",
                usage: 'Get-ProcessReport -Top 3 -IncludeMemory'
            },
            {
                command: `
function Test-Password {
    param (
        [Parameter(Mandatory)]
        [string]$Password
    )

    $requirements = @(
        @{Test={$Password.Length -ge 8}; Message="Minimum 8 znaków"},
        @{Test={$Password -match "[A-Z]"}; Message="Wielka litera"},
        @{Test={$Password -match "[a-z]"}; Message="Mała litera"},
        @{Test={$Password -match "[0-9]"}; Message="Cyfra"},
        @{Test={$Password -match "[^a-zA-Z0-9]"}; Message="Znak specjalny"}
    )

    $results = foreach ($req in $requirements) {
        [PSCustomObject]@{
            Requirement = $req.Message
            Passed = & $req.Test
        }
    }

    return $results
}
Test-Password -Password "Test123!"`,
                description: "Funkcja sprawdzająca siłę hasła",
                usage: 'Test-Password -Password "MojeHaslo123!"'
            },
            {
                command: `
function Sync-FolderContent {
    param (
        [Parameter(Mandatory)]
        [string]$SourcePath,

        [Parameter(Mandatory)]
        [string]$DestinationPath,

        [switch]$Mirror
    )

    $source = Get-ChildItem -Path $SourcePath -Recurse
    $destination = Get-ChildItem -Path $DestinationPath -Recurse

    $comparison = Compare-Object -ReferenceObject $source -DifferenceObject $destination -Property Name, Length

    foreach ($diff in $comparison) {
        if ($diff.SideIndicator -eq "<=") {
            Copy-Item -Path (Join-Path $SourcePath $diff.Name) -Destination $DestinationPath -Force
            Write-Host "Skopiowano: $($diff.Name)"
        } elseif ($Mirror -and $diff.SideIndicator -eq "=>") {
            Remove-Item -Path (Join-Path $DestinationPath $diff.Name) -Force
            Write-Host "Usunięto: $($diff.Name)"
        }
    }
}
Sync-FolderContent -SourcePath "C:\\Source" -DestinationPath "D:\\Destination" -Mirror`,
                description: "Funkcja synchronizująca zawartość folderów",
                usage: 'Sync-FolderContent -SourcePath "C:\\Source" -DestinationPath "D:\\Dest"'
            },
            {
                command: `
function Watch-FileChanges {
    param (
        [Parameter(Mandatory)]
        [string]$Path,

        [int]$IntervalSeconds = 5
    )

    $lastHash = Get-FileHash -Path $Path | Select-Object -ExpandProperty Hash

    while ($true) {
        Start-Sleep -Seconds $IntervalSeconds
        $newHash = Get-FileHash -Path $Path | Select-Object -ExpandProperty Hash

        if ($newHash -ne $lastHash) {
            Write-Host "Plik zmieniony: $((Get-Date).ToString('HH:mm:ss'))"
            $lastHash = $newHash
        }
    }
}
Watch-FileChanges -Path "C:\\config.txt" -IntervalSeconds 10`,
                description: "Funkcja monitorująca zmiany w pliku",
                usage: 'Watch-FileChanges -Path "C:\\config.txt"'
            }
        ]
    },
    {
        id: 6,
        title: "Obsługa Błędów i Debugowanie",
        content: `
PowerShell oferuje zaawansowane mechanizmy obsługi błędów i debugowania.

Kluczowe Koncepcje:
1. Try-Catch:
   try {
       # kod który może generować błąd
   } catch {
       # obsługa błędu
   } finally {
       # kod wykonywany zawsze
   }

2. Typy Błędów:
   - Błędy kończące (terminating)
   - Błędy niekończące (non-terminating)

3. Debugowanie:
   - Set-PSBreakpoint
   - Debug-Process
   - Write-Debug
        `,
        examples: [
            {
                command: `
try {
    Get-Content "nieistniejący.txt"
} catch {
    Write-Host "Wystąpił błąd: $_"
}
                `,
                description: "Obsługa błędu przy próbie odczytu pliku",
                usage: 'try { Get-Content "nieistniejący.txt" } catch { Write-Host "Błąd: $_" }'
            },
            {
                command: '$ErrorActionPreference = "Stop"',
                description: "Zmiana zachowania przy błędach niekończących",
                usage: '$ErrorActionPreference = "Stop"'
            }
        ]
    },
    {
        id: 7,
        title: "Praca z Plikami i Systemem",
        content: `
PowerShell oferuje zaawansowane możliwości pracy z systemem plików.

Kluczowe Koncepcje:
1. Operacje na Plikach:
   - New-Item (tworzenie)
   - Set-Content (zapisywanie)
   - Get-Content (odczyt)
   - Remove-Item (usuwanie)

2. Manipulacja Ścieżkami:
   - Join-Path
   - Split-Path
   - Test-Path

3. Uprawnienia i Bezpieczeństwo:
   - Get-Acl
   - Set-Acl
        `,
        examples: [
            {
                command: 'New-Item -Path "test.txt" -ItemType File -Value "Hello World"',
                description: "Tworzenie nowego pliku z zawartością",
                usage: 'New-Item -Path "test.txt" -ItemType File -Value "Hello World"'
            },
            {
                command: 'Get-ChildItem -Path "C:" -Recurse -Filter "*.txt"',
                description: "Rekursywne wyszukiwanie plików tekstowych",
                usage: 'Get-ChildItem -Path "C:" -Recurse -Filter "*.txt"'
            }
        ]
    },
    {
        id: 8,
        title: "Automatyzacja Zadań",
        content: `
PowerShell excel uje w automatyzacji zadań systemowych i administracyjnych.

Kluczowe Koncepcje:
1. Zadania Zaplanowane:
   - Register-ScheduledTask
   - Get-ScheduledTask
   - Start-ScheduledTask

2. Zdalne Zarządzanie:
   - Enter-PSSession
   - Invoke-Command
   - New-PSSession

3. Zarządzanie Usługami:
   - Get-Service
   - Start-Service
   - Stop-Service
        `,
        examples: [
            {
                command: `
Get-Service | 
Where-Object Status -eq "Running" | 
Select-Object Name, DisplayName
                `,
                description: "Lista działających usług systemowych",
                usage: 'Get-Service | Where-Object Status -eq "Running" | Select-Object Name, DisplayName'
            },
            {
                command: 'Invoke-Command -ComputerName "Server01" -ScriptBlock { Get-Process }',
                description: "Zdalne wykonanie polecenia",
                usage: 'Invoke-Command -ComputerName "Server01" -ScriptBlock { Get-Process }'
            }
        ]
    },
    {
        id: 9,
        title: "Zaawansowana Obsługa Błędów",
        content: `
PowerShell oferuje rozbudowany system obsługi błędów, który pomaga w debugowaniu i tworzeniu niezawodnych skryptów.

Kluczowe Koncepcje:
1. Typy Błędów w PowerShell:
   - Błędy końcowe (Terminating Errors)
     • Zatrzymują wykonanie skryptu
     • Wymagają bezpośredniej obsługi
   - Błędy niekończące (Non-Terminating Errors)
     • Generują ostrzeżenia
     • Pozwalają na kontynuację wykonania
   - Błędy składni (Parse Errors)
     • Wykrywane przed wykonaniem
     • Związane z nieprawidłową składnią

2. Zmienne Systemowe Błędów:
   - $Error: Tablica zawierająca historię błędów
   - $ErrorActionPreference: Określa domyślną reakcję na błędy
   - $ErrorView: Kontroluje format wyświetlania błędów

3. Poziomy Obsługi Błędów:
   - Continue: Kontynuuj mimo błędu
   - SilentlyContinue: Ignoruj błąd
   - Stop: Zatrzymaj wykonanie
   - Inquire: Zapytaj użytkownika co zrobić
        `,
        examples: [
            {
                command: `
# Przykład obsługi różnych typów błędów
$ErrorActionPreference = "Stop"  # Ustawienie reakcji na błędy
try {
    Get-Content "nieistniejący.txt"
    1/0  # Błąd dzielenia przez zero
} catch [System.IO.FileNotFoundException] {
    Write-Host "Nie znaleziono pliku!"
} catch [System.DivideByZeroException] {
    Write-Host "Próba dzielenia przez zero!"
} catch {
    Write-Host "Inny błąd: $_"
} finally {
    Write-Host "Ten kod wykonuje się zawsze"
}`,
                description: "Kompleksowy przykład obsługi różnych typów błędów",
                usage: `
try {
    Get-Content "nieistniejący.txt"
} catch [System.IO.FileNotFoundException] {
    Write-Host "Nie znaleziono pliku!"
}`
            },
            {
                command: `
# Użycie ErrorAction dla pojedynczego polecenia
Get-Process "nieistniejący" -ErrorAction SilentlyContinue
if (-not $?) {
    Write-Host "Proces nie został znaleziony"
}`,
                description: "Kontrolowanie zachowania przy błędach dla pojedynczego polecenia",
                usage: 'Get-Process "nieistniejący" -ErrorAction SilentlyContinue'
            }
        ]
    },
    {
        id: 10,
        title: "Debugowanie i Rozwiązywanie Problemów",
        content: `
Skuteczne debugowanie to kluczowa umiejętność w pracy z PowerShell.

Kluczowe Koncepcje:
1. Narzędzia Debugowania:
   - Set-PSBreakpoint: Ustawianie punktów przerwania
   - Write-Debug: Wyświetlanie informacji debugowania
   - $DebugPreference: Kontrola zachowania debugowania

2. Techniki Diagnostyczne:
   - Verbose Output: Szczegółowe informacje o wykonaniu
   - Write-Progress: Śledzenie postępu długich operacji
   - Measure-Command: Pomiar czasu wykonania

3. Najlepsze Praktyki:
   - Używaj Write-Verbose do logowania
   - Implementuj obsługę błędów na każdym poziomie
   - Testuj skrypty w kontrolowanym środowisku
        `,
        examples: [
            {
                command: `
# Użycie punktów przerwania
$script = {
    $i = 1
    while ($i -le 5) {
        Write-Host "Iteracja $i"
        $i++
    }
}
Set-PSBreakpoint -Script $script -Line 2
& $script`,
                description: "Ustawianie punktu przerwania w skrypcie",
                usage: "Set-PSBreakpoint -Script skrypt.ps1 -Line 10"
            },
            {
                command: `
# Mierzenie czasu wykonania i diagnostyka
Measure-Command {
    Get-Process | Where-Object CPU -gt 10
} | Select-Object TotalMilliseconds`,
                description: "Pomiar czasu wykonania polecenia",
                usage: "Measure-Command { Get-Process }"
            }
        ]
    },
    {
        id: 11,
        title: "Zarządzanie Użytkownikami i Uprawnieniami",
        content: `
PowerShell oferuje zaawansowane narzędzia do zarządzania użytkownikami i uprawnieniami w systemie Windows.

Kluczowe Koncepcje:
1. Zarządzanie Kontami:
   - New-LocalUser: Tworzenie nowego użytkownika
   - Set-LocalUser: Modyfikacja istniejącego użytkownika
   - Remove-LocalUser: Usuwanie użytkownika
   - Get-LocalUser: Pobieranie informacji o użytkownikach

2. Grupy Lokalne:
   - Add-LocalGroupMember: Dodawanie do grupy
   - Remove-LocalGroupMember: Usuwanie z grupy
   - Get-LocalGroup: Lista grup

3. Uprawnienia:
   - Get-Acl: Sprawdzanie uprawnień
   - Set-Acl: Ustawianie uprawnień
   - New-Object System.Security.AccessControl.FileSystemAccessRule
        `,
        examples: [
            {
                command: `
# Tworzenie nowego użytkownika
New-LocalUser -Name "NowyUser" -Description "Konto testowe" -NoPassword
Add-LocalGroupMember -Group "Users" -Member "NowyUser"`,
                description: "Tworzenie użytkownika i dodawanie do grupy",
                usage: 'New-LocalUser -Name "NowyUser" -NoPassword'
            },
            {
                command: `
# Sprawdzanie uprawnień do pliku
Get-Acl C:\\Test\\plik.txt | Format-List`,
                description: "Wyświetlanie uprawnień do pliku",
                usage: 'Get-Acl C:\\Test\\plik.txt | Format-List'
            }
        ]
    },
    {
        id: 12,
        title: "Praca z Siecią i Diagnostyka",
        content: `
PowerShell zawiera wiele poleceń do diagnostyki sieci i rozwiązywania problemów z połączeniem.

Kluczowe Koncepcje:
1. Podstawowe Polecenia:
   - Test-NetConnection: Test połączenia
   - Get-NetIPAddress: Informacje o adresach IP
   - Get-NetAdapter: Informacje o kartach sieciowych
   - Resolve-DnsName: Rozwiązywanie nazw DNS

2. Monitorowanie Sieci:
   - Get-NetTCPConnection: Aktywne połączenia TCP
   - Get-NetRoute: Tabela routingu
   - Get-NetNeighbor: Tabela ARP

3. Zaawansowana Diagnostyka:
   - Test-NetConnection -TraceRoute
   - Get-NetConnectionProfile
   - Set-NetConnectionProfile
        `,
        examples: [
            {
                command: "Test-NetConnection -ComputerName google.com -Port 443",
                description: "Test połączenia HTTPS z google.com",
                usage: "Test-NetConnection -ComputerName google.com -Port 443"
            },
            {
                command: "Get-NetIPAddress | Where-Object AddressFamily -eq 'IPv4'",
                description: "Lista adresów IPv4",
                usage: "Get-NetIPAddress | Where-Object AddressFamily -eq 'IPv4'"
            }
        ]
    },
    {
        id: 13,
        title: "Tworzenie Zaawansowanych Skryptów",
        content: `
Tworzenie zaawansowanych skryptów wymaga znajomości dodatkowych technik i najlepszych praktyk.

Kluczowe Koncepcje:
1. Struktura Skryptu:
   - [CmdletBinding()]: Dodawanie zaawansowanych funkcji
   - Begin{}, Process{}, End{}: Bloki przetwarzania
   - Param(): Deklaracja parametrów
   - ValidateScript(): Walidacja danych

2. Zaawansowane Techniki:
   - Przetwarzanie potokowe
   - Obsługa danych wejściowych z potoku
   - Generowanie raportów
   - Logowanie wykonania

3. Najlepsze Praktyki:
   - Komentarze i dokumentacja
   - Modularyzacja kodu
   - Obsługa błędów
   - Testowanie
        `,
        examples: [
            {
                command: `
function Get-SystemInfo {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$ComputerName,
        [switch]$IncludeNetwork
    )

    process {
        $os = Get-WmiObject -Class Win32_OperatingSystem -ComputerName $ComputerName
        $cpu = Get-WmiObject -Class Win32_Processor -ComputerName $ComputerName

        $result = @{
            'System' = $os.Caption
            'Procesor' = $cpu.Name
            'RAM (GB)' = [math]::Round($os.TotalVisibleMemorySize/1MB, 2)
        }

        if ($IncludeNetwork) {
            $network = Get-WmiObject -Class Win32_NetworkAdapter -ComputerName $ComputerName |
                      Where-Object { $_.PhysicalAdapter }
            $result['Karty Sieciowe'] = $network.Count
        }

        [PSCustomObject]$result
    }
}
`,
                description: "Zaawansowana funkcja zbierająca informacje o systemie",
                usage: 'Get-SystemInfo -ComputerName "localhost" -IncludeNetwork'
            }
        ]
    },
    {
        id: 14,
        title: "Zarządzanie Systemem Windows",
        content: `
PowerShell umożliwia zaawansowane zarządzanie systemem Windows i jego komponentami.

Kluczowe Koncepcje:
1. Zarządzanie Systemem:
   - Get-ComputerInfo: Informacje o systemie
   - Restart-Computer: Restart systemu
   - Get-HotFix: Lista zainstalowanych aktualizacji
   - Get-EventLog: Przeglądanie dzienników zdarzeń

2. Zarządzanie Dyskami:
   - Get-Disk: Informacje o dyskach
   - Get-Partition: Informacje o partycjach
   - Get-Volume: Informacje o woluminach
   - Get-PhysicalDisk: Stan dysków fizycznych

3. Monitorowanie Wydajności:
   - Get-Counter: Liczniki wydajności
   - Get-Process: Monitorowanie procesów
   - Get-Service: Stan usług
        `,
        examples: [
            {
                command: `
# Sprawdzanie wykorzystania pamięci
Get-Counter '\\Memory\\Available MBytes' |
Select-Object -ExpandProperty CounterSamples |
Select-Object -Property CookedValue`,
                description: "Monitorowanie dostępnej pamięci RAM",
                usage: "Get-Counter '\\Memory\\Available MBytes'"
            },
            {
                command: `
# Analiza dziennika zdarzeń
Get-EventLog -LogName System -Newest 10 |
Select-Object TimeGenerated, Source, EventID, Message`,
                description: "Przeglądanie ostatnich zdarzeń systemowych",
                usage: "Get-EventLog -LogName System -Newest 10"
            }
        ]
    },
    {
        id: 15,
        title: "Integracja z Active Directory",
        content: `
PowerShell oferuje rozbudowane narzędzia do zarządzania Active Directory.

Kluczowe Koncepcje:
1. Podstawowe Operacje:
   - Get-ADUser: Informacje o użytkownikach
   - New-ADUser: Tworzenie użytkowników
   - Get-ADGroup: Informacje o grupach
   - Add-ADGroupMember: Dodawanie do grup

2. Zarządzanie OU:
   - Get-ADOrganizationalUnit
   - New-ADOrganizationalUnit
   - Move-ADObject

3. Wyszukiwanie:
   - Get-ADObject
   - Search-ADAccount
   - Get-ADComputer
        `,
        examples: [
            {
                command: `
# Wyszukiwanie nieaktywnych kontSearch-ADAccount -AccountDisabled |
Select-Object Name, LastLogonDate |
Sort-Object LastLogonDate`,
                description: "Lista wyłączonych kont AD",
                usage: "Search-ADAccount -AccountDisabled"
            },
            {
                command: `
# Tworzenie nowego użytkownika w AD
New-ADUser -Name "Jan Kowalski" -GivenName "Jan" -Surname "Kowalski" ` +
                    `-SamAccountName "jkowalski" -UserPrincipalName "jkowalski@domena.pl" ` +
                    `-Path "OU=Users,DC=domena,DC=pl" -AccountPassword (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force) ` +
                    `-Enabled $true`,
                description: "Tworzenie nowego użytkownika w AD",
                usage: 'New-ADUser -Name "Jan Kowalski" -SamAccountName "jkowalski"'
            }
        ]
    },
    {
        id: 16,
        title: "PowerShell i Bezpieczeństwo",
        content: `
Bezpieczeństwo jest kluczowym aspektem pracy z PowerShell.

Kluczowe Koncepcje:
1. Polityki Wykonywania:
   - Get-ExecutionPolicy
   - Set-ExecutionPolicy
   - Podpisywanie skryptów
   - Bezpieczne przechowywanie poświadczeń

2. Szyfrowanie i Certyfikaty:
   - Protect-CmsMessage
   - Unprotect-CmsMessage
   - Get-Certificate
   - New-SelfSignedCertificate

3. Audyt i Monitorowanie:
   - Start-Transcript
   - Enable-PSRemoting
   - Set-PSSessionConfiguration
        `,
        examples: [
            {
                command: `
# Szyfrowanie wrażliwych danych
$secret = "Tajne hasło"
$encrypted = Protect-CmsMessage -Content $secret -To cert:\\CurrentUser\\My\\CertificateThumbprint
$decrypted = Unprotect-CmsMessage -Content $encrypted`,
                description: "Szyfrowanie i deszyfrowanie danych",
                usage: 'Protect-CmsMessage -Content "Tajne dane" -To cert:\\CurrentUser\\My\\CertThumb'
            },
            {
                command: `
# Rozpoczęcie logowania sesji
Start-Transcript -Path "C:\\Logs\\SessionLog.txt" -IncludeInvocationHeader
Get-Process
Stop-Transcript`,
                description: "Logowanie wszystkich poleceń i ich wyników",
                usage: 'Start-Transcript -Path "C:\\Logs\\SessionLog.txt"'
            }
        ]
    }
];

function loadLessons() {
    const lessonList = document.querySelector('.lesson-list');
    lessonList.innerHTML = lessons.map(lesson => `
        <div class="lesson-card">
            <h3>${lesson.title}</h3>
            <div class="lesson-content">
                <p>${lesson.content}</p>
                <h4>Przykłady:</h4>
                ${lesson.examples.map(example => `
                    <div class="command-example">
                        <strong>${example.command}</strong>
                        <p>${example.description}</p>
                        <code>${example.usage}</code>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}