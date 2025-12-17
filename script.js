document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

// --- ESTADO GLOBAL DO JOGO ---
let playerState = {
    name: 'Hunter', level: 1, xp: 0, xpToNextLevel: 100, arks: 0, rank: 'E', rankPoints: 0,
    rankPointsToNext: 500, completedMissionsToday: [], completedGatesToday: [], shadowArmy: [],
    equippedWeapon: null, equippedSkill: null, xpMultiplier: 1, shadowFragments: 0,
    dailyMissions: [], inventory: [],
    weeklyChallenge: null, lastWeeklyResetDate: null, equippedShadowId: null,
};

let gateTimer = null, gateSeconds = 0;

// --- BANCOS DE DADOS (Permanecem os mesmos) ---
const RANKS = ['E', 'D', 'C', 'B', 'A', 'S'];
const MISSION_TEMPLATES = [ /* ... */ ];
const LOOT_TABLES = { /* ... */ };
const GATES_DATA = [ /* ... */ ];
const SHADOWS_DATA = [ /* ... */ ];
const SHOP_ITEMS = [ /* ... */ ];
const WEEKLY_CHALLENGE_TEMPLATES = [ /* ... */ ];
const EVENT_GATE_DATA = { /* ... */ };
const WORKOUT_PLANS_DB = [ /* ... */ ];

// --- FUNÇÕES PRINCIPAIS ---
function initializeApp() {
    loadGameState();
    if (playerState.dailyMissions.length === 0) { generateDailyMissionsAI(); }
    if (playerState.weeklyChallenge === null) { generateWeeklyChallenge(); }
    checkForWeeklyReset();
    updateUI();
    updateMissionUI();
    updateWeeklyChallengeUI();
    generateGates();
    generateShopItems();
    addSystemLog("[SISTEMA] O Hunter está online.");
}

function saveGameState() {
    localStorage.setItem('arisePlayerState', JSON.stringify(playerState));
}

function loadGameState() {
    const savedState = localStorage.getItem('arisePlayerState');
    if (savedState) {
        try {
            playerState = { ...playerState, ...JSON.parse(savedState) };
        } catch (e) {
            console.error("Failed to load saved state, resetting.", e);
        }
    }
    checkForDailyReset();
}

function checkForDailyReset() {
    const lastPlayed = localStorage.getItem('ariseLastPlayedDate');
    const today = new Date().toDateString();
    if (lastPlayed !== today) {
        playerState.completedMissionsToday = [];
        playerState.completedGatesToday = [];
        playerState.dailyMissions = [];
        localStorage.setItem('ariseLastPlayedDate', today);
        addSystemLog("[SISTEMA] Novo dia detectado. A IA está gerando novas oportunidades.", true);
    }
}

// --- UI E UX ---
function setupEventListeners() {
    // Navegação
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const screenId = item.getAttribute('data-screen');
            showScreen(screenId);
            
            // Atualiza a classe 'active' na navegação
            document.querySelectorAll('.nav-item').forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Toggle da Sidebar em Mobile
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Botões de Salvar e Resetar
    const saveButton = document.getElementById('save-game-btn');
    const resetButton = document.getElementById('reset-game-btn');

    if (saveButton) {
        saveButton.addEventListener('click', saveGameStatus);
    }

    if (resetButton) {
        resetButton.addEventListener('click', showResetConfirmation);
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function showModal(title, body, footerContent) {
    document.getElementById('modal-title').innerHTML = title;
    document.getElementById('modal-body').innerHTML = body;
    document.getElementById('modal-footer').innerHTML = footerContent;
    document.getElementById('modal-container').style.display = 'flex';
}

function hideModal() {
    document.getElementById('modal-container').style.display = 'none';
}

function addSystemLog(message, isGlitch = false) {
    const log = document.getElementById('system-log');
    const p = document.createElement('p');
    if (isGlitch) p.classList.add('glitch');
    p.textContent = `> ${message}`;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
}

// --- LÓGICA DO JOGO (Permanece a mesma) ---
function generateDailyMissionsAI() { /* ... */ }
function updateMissionUI() { /* ... */ }
function completeMission(missionId) { /* ... */ }
function confirmMissionCompletion(missionId) { /* ... */ }
function claimDailyReward() { /* ... */ }
function generateGates() { /* ... */ }
function enterGate(gateId) { /* ... */ }
function completeActiveGate() { /* ... */ }
function gainRewards(xp, arks) { /* ... */ }
function checkForLevelUp() { /* ... */ }
function checkForRankUp() { /* ... */ }
function attemptShadowExtraction(gate) { /* ... */ }
function updateShadowArmyUI() { /* ... */ }
function equipShadow(shadowId) { /* ... */ }
function applyShadowBuffs(rewards) { /* ... */ }
function updateUI() { /* ... */ }
function updateHeaderUI() { /* ... */ }
function calculatePowerLevel() { /* ... */ }
function updateRankProgressRing() { /* ... */ }
function showCelebration(title, message, isRankUp = false) { /* ... */ }
function hideCelebration() { /* ... */ }
function showFloatingText(targetElement, text, type) { /* ... */ }

// --- FUNÇÕES DE GERENCIAMENTO (Permanecem as mesmas) ---
function generateWeeklyChallenge() { /* ... */ }
function updateWeeklyChallengeUI() { /* ... */ }
function updateWeeklyChallengeProgress(amount, type) { /* ... */ }
function claimWeeklyReward() { /* ... */ }

function getWorkoutForDifficulty(difficulty) { /* ... */ }
function displayWorkout(workout, targetElementId) { /* ... */ }

function generateShopItems() { /* ... */ }
function confirmItemPurchase(itemId, cost) { /* ... */ }

// --- FUNÇÕES DE SALVAR E RESETAR (NOVAS) ---
function saveGameStatus() {
    saveGameState();
    addSystemLog("[SISTEMA] Status salvo com sucesso.");
    showFloatingText(document.body, 'Status Salvo!', 'success');
}

function showResetConfirmation() {
    showModal(
        "Confirmar Reset de Jogo",
        `<p>Tem certeza que deseja resetar seu progresso?</p><p><strong>Atenção:</strong> Esta ação <strong>não pode ser desfeita</strong> e irá apagar todo o seu progresso, missões, sombras e Arks.</p>`,
        `<button onclick="hideModal()">Cancelar</button><button class="btn btn-danger" onclick="performFullReset()" style="margin-left: 10px;">Sim, Resetar Jogo</button>`
    );
}

function performFullReset() {
    localStorage.removeItem('arisePlayerState');
    localStorage.removeItem('ariseLastPlayedDate');

    playerState = {
        name: 'Hunter', level: 1, xp: 0, xpToNextLevel: 100, arks: 0, rank: 'E', rankPoints: 0,
        rankPointsToNext: 500, completedMissionsToday: [], completedGatesToday: [], shadowArmy: [],
        equippedWeapon: null, equippedSkill: null, xpMultiplier: 1, shadowFragments: 0,
        dailyMissions: [], inventory: [],
        weeklyChallenge: null, lastWeeklyResetDate: null, equippedShadowId: null,
    };

    initializeApp();
    hideModal();
    addSystemLog("[SISTEMA] Jogo resetado. Um novo começo espera por você.", true);
}
