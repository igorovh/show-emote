let infoLog;

window.addEventListener('DOMContentLoaded', () => {
    infoLog = document.querySelector('#info');
});

const logMessage = (message) => {
    const log = document.createElement('span');
    log.textContent = message;
    infoLog.appendChild(log);
    setTimeout(() => log.remove(), 3000);
}