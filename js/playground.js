class PowerShellPlayground {
    constructor() {
        this.editor = document.getElementById('code-editor');
        this.output = document.getElementById('syntax-highlight');
        this.runButton = document.getElementById('run-code');
        this.clearButton = document.getElementById('clear-code');
        this.codeOutput = document.getElementById('code-output');
        
        this.initializePlayground();
    }

    initializePlayground() {
        // Obsługa kolorowania składni w czasie rzeczywistym
        this.editor.addEventListener('input', () => {
            this.updateSyntaxHighlighting();
        });

        // Obsługa przycisków
        this.runButton.addEventListener('click', () => {
            this.executeCode();
        });

        this.clearButton.addEventListener('click', () => {
            this.clearPlayground();
        });

        // Obsługa tabulacji
        this.editor.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.editor.selectionStart;
                const end = this.editor.selectionEnd;
                this.editor.value = this.editor.value.substring(0, start) + '    ' + this.editor.value.substring(end);
                this.editor.selectionStart = this.editor.selectionEnd = start + 4;
                this.updateSyntaxHighlighting();
            }
        });

        // Inicjalizacja pustego edytora
        this.updateSyntaxHighlighting();
    }

    updateSyntaxHighlighting() {
        const code = this.editor.value;
        this.output.textContent = code;
        Prism.highlightElement(this.output);
    }

    executeCode() {
        const code = this.editor.value;
        // Symulacja wykonania kodu PowerShell
        // W prawdziwej implementacji tutaj byłoby wywołanie API lub WebSocket
        this.codeOutput.textContent = `Wykonywanie kodu PowerShell:
${code}

Wynik:
[Symulowany wynik wykonania kodu]`;
    }

    clearPlayground() {
        this.editor.value = '';
        this.codeOutput.textContent = '';
        this.updateSyntaxHighlighting();
    }
}

function initializePlayground() {
    window.powerShellPlayground = new PowerShellPlayground();
}
