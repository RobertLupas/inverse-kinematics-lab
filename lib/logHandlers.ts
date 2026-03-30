export function tryAndDisplayError(func: () => void) {
    clearLog();
    try {
        func();
    } catch (e) {
        displayLog((e as Error).message, true);
    }
}

function displayLog(log: string, error: Boolean = false) {
    clearLog();
    (document.getElementById("logsTitle") as HTMLSpanElement).style.display = "block";
    if (error) (document.getElementById("errors") as HTMLSpanElement).textContent = log;
    else (document.getElementById("log") as HTMLSpanElement).textContent = log;
}

function clearLog() {
    (document.getElementById("logsTitle") as HTMLSpanElement).style.display = "none";
    (document.getElementById("log") as HTMLSpanElement).textContent = "";
    (document.getElementById("errors") as HTMLSpanElement).textContent = "";
}