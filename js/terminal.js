class PowerShellTerminal {
    constructor() {
        this.terminal = document.getElementById('terminal');
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.commandHistory = [];
        this.historyIndex = -1;

        this.initializeTerminal();
    }

    initializeTerminal() {
        this.input.addEventListener('keydown', (e) => this.handleInput(e));
        this.displayWelcomeMessage();
    }

    displayWelcomeMessage() {
        this.appendOutput(`
Windows PowerShell
Copyright (C) Microsoft Corporation. Wszelkie prawa zastrzeżone.

Wpisz 'help' aby zobaczyć dostępne polecenia.
        `, 'welcome-message');
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim();
            if (command) {
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        }
    }

    executeCommand(command) {
        this.appendOutput(`PS> ${command}`, 'command-input');

        const commands = {
            'help': () => this.showHelp(),
            'clear': () => this.clearTerminal(),
            'get-date': () => new Date().toLocaleString('pl-PL'),
            'get-location': () => 'Ścieżka: C:\\Users\\learner',
            'get-process': () => this.mockProcessList(),
            'get-childitem': () => this.mockDirectoryListing(),
        };

        const cmdLower = command.toLowerCase();
        if (commands[cmdLower]) {
            this.appendOutput(commands[cmdLower]());
        } else {
            this.appendOutput(`Termin '${command}' nie jest rozpoznawany jako nazwa polecenia cmdlet, funkcji, pliku skryptu lub programu wykonywalnego.`, 'error-output');
        }
    }

    showHelp() {
        return `
Dostępne Polecenia:
- help: Wyświetl tę pomoc
- clear: Wyczyść terminal
- get-date: Wyświetl aktualną datę i czas
- get-location: Wyświetl aktualną lokalizację
- get-process: Lista uruchomionych procesów
- get-childitem: Lista elementów w bieżącym katalogu
        `;
    }

    mockProcessList() {
        return `
Uchwyty  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI NazwaProcesu
-------  ------    -----      -----     ------     --  -- ------------
    429      24    44948      42100       2.45   7528   1 chrome
    892      51    99356      69632       5.66   1234   1 explorer
    223      12    13196      4988        0.03   9876   0 svchost
        `;
    }

    mockDirectoryListing() {
        return `
Tryb                 OstatniZapis          Długość Nazwa
----                 ------------          ------- ----
d-----         7/15/2023     13:45                Dokumenty
d-----         7/15/2023     13:45                Pobrane
-a----         7/15/2023     13:45           1234 przykład.txt
-a----         7/15/2023     13:45          12345 readme.md
        `;
    }

    clearTerminal() {
        this.output.innerHTML = '';
        return '';
    }

    appendOutput(text, className = 'command-output') {
        const output = document.createElement('div');
        output.className = className;
        output.textContent = text;
        this.output.appendChild(output);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }
}

function initializeTerminal() {
    window.powerShellTerminal = new PowerShellTerminal();
}