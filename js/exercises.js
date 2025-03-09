const exercises = [
    {
        id: 1,
        title: "Praktyka Podstawowych Poleceń",
        description: "Przećwicz używanie podstawowych poleceń PowerShell",
        tasks: [
            {
                instruction: "Pobierz aktualną datę i czas",
                expectedCommand: "get-date",
                hint: "Użyj polecenia Get-Date"
            },
            {
                instruction: "Wyświetl wszystkie elementy w bieżącym katalogu",
                expectedCommand: "get-childitem",
                hint: "Użyj Get-ChildItem (podobne do 'dir' lub 'ls')"
            },
            {
                instruction: "Wyświetl pomoc dla polecenia Get-Process",
                expectedCommand: "get-help get-process",
                hint: "Użyj Get-Help z nazwą polecenia"
            }
        ]
    },
    {
        id: 2,
        title: "Zarządzanie Procesami",
        description: "Naucz się przeglądać i zarządzać procesami",
        tasks: [
            {
                instruction: "Wyświetl listę uruchomionych procesów",
                expectedCommand: "get-process",
                hint: "Użyj polecenia Get-Process"
            },
            {
                instruction: "Znajdź procesy używające więcej niż 100MB pamięci",
                expectedCommand: "get-process | where-object workingset -gt 100mb",
                hint: "Połącz Get-Process z Where-Object i porównaniem -gt"
            },
            {
                instruction: "Wyświetl 5 procesów z największym użyciem CPU",
                expectedCommand: "get-process | sort-object cpu -descending | select-object -first 5",
                hint: "Użyj Sort-Object i Select-Object z parametrem -First"
            }
        ]
    },
    {
        id: 3,
        title: "Praca z Plikami",
        description: "Ćwiczenia operacji na plikach i katalogach",
        tasks: [
            {
                instruction: "Utwórz nowy katalog o nazwie 'TestDir'",
                expectedCommand: "new-item -itemtype directory -name testdir",
                hint: "Użyj New-Item z parametrem -ItemType"
            },
            {
                instruction: "Utwórz nowy plik tekstowy w katalogu TestDir",
                expectedCommand: "new-item -path .\\testdir\\test.txt -itemtype file",
                hint: "Użyj New-Item określając ścieżkę i typ pliku"
            },
            {
                instruction: "Znajdź wszystkie pliki .txt w bieżącym katalogu",
                expectedCommand: "get-childitem -filter *.txt -recurse",
                hint: "Użyj Get-ChildItem z parametrami -Filter i -Recurse"
            }
        ]
    },
    {
        id: 4,
        title: "Praca ze Zmiennymi",
        description: "Ćwiczenia wykorzystania zmiennych w PowerShell",
        tasks: [
            {
                instruction: "Utwórz zmienną $name z Twoim imieniem i wyświetl ją",
                expectedCommand: "$name = 'Jan'; $name",
                hint: "Użyj przypisania z nazwą zmiennej zaczynającą się od $"
            },
            {
                instruction: "Utwórz tablicę liczb od 1 do 5",
                expectedCommand: "$numbers = 1..5",
                hint: "Użyj operatora zakresu .."
            },
            {
                instruction: "Stwórz hashtable z informacjami o komputerze",
                expectedCommand: "$pc = @{Name='PC1';IP='192.168.1.1';OS='Windows'}",
                hint: "Użyj składni @{} dla hashtable"
            }
        ]
    },
    {
        id: 5,
        title: "Praktyka Funkcji",
        description: "Ćwiczenia tworzenia i używania funkcji",
        tasks: [
            {
                instruction: "Utwórz funkcję Get-Square, która oblicza kwadrat liczby",
                expectedCommand: "function Get-Square { param($number) return $number * $number }",
                hint: "Użyj słowa kluczowego function i zdefiniuj parametr"
            },
            {
                instruction: "Stwórz funkcję Get-RandomPassword generującą hasło",
                expectedCommand: "function Get-RandomPassword { -join ((65..90) + (97..122) | Get-Random -Count 8 | % {[char]$_}) }",
                hint: "Użyj Get-Random i konwersji na znaki"
            }
        ]
    },
    {
        id: 6,
        title: "Obsługa Błędów",
        description: "Ćwiczenia z obsługi błędów w PowerShell",
        tasks: [
            {
                instruction: "Napisz try-catch do bezpiecznego otwarcia pliku",
                expectedCommand: "try { get-content 'nieistniejacy.txt' } catch { write-host 'Błąd: ' $_.Exception.Message }",
                hint: "Użyj bloków try i catch z obsługą błędu"
            },
            {
                instruction: "Użyj ErrorAction do ignorowania błędów",
                expectedCommand: "get-process 'nieistniejacy' -erroraction silentlycontinue",
                hint: "Dodaj parametr -ErrorAction"
            }
        ]
    }
];

function loadExercises() {
    const exerciseList = document.querySelector('.exercise-list');
    exerciseList.innerHTML = exercises.map(exercise => `
        <div class="exercise-card">
            <h3>${exercise.title}</h3>
            <p>${exercise.description}</p>
            <div class="tasks">
                ${exercise.tasks.map((task, index) => `
                    <div class="task" data-exercise-id="${exercise.id}" data-task-index="${index}">
                        <p><strong>Zadanie ${index + 1}:</strong> ${task.instruction}</p>
                        <button class="btn btn-secondary btn-sm show-hint">Pokaż Podpowiedź</button>
                        <div class="hint" style="display: none;">${task.hint}</div>
                        <div class="task-result"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    // Add event listeners for hints
    document.querySelectorAll('.show-hint').forEach(button => {
        button.addEventListener('click', (e) => {
            const hint = e.target.nextElementSibling;
            hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
        });
    });
}

function checkExercise(exerciseId, taskIndex, command) {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return false;

    const task = exercise.tasks[taskIndex];
    if (!task) return false;

    return command.toLowerCase() === task.expectedCommand.toLowerCase();
}

window.checkExercise = checkExercise;