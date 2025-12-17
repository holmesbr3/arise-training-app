document.addEventListener('DOMContentLoaded', () => {
    initializeApp();

    // Adiciona os event listeners para os novos botões quando o DOM estiver carregado
    const saveButton = document.getElementById('save-game-btn');
    const resetButton = document.getElementById('reset-game-btn');

    if (saveButton) {
        saveButton.addEventListener('click', saveGameStatus);
    }

    if (resetButton) {
        resetButton.addEventListener('click', showResetConfirmation);
    }
});

// --- ESTADO GLOBAL DO JOGO ---
let playerState = {
    name: 'Hunter', level: 1, xp: 0, xpToNextLevel: 100, arks: 0, rank: 'E', rankPoints: 0,
    rankPointsToNext: 500, completedMissionsToday: [], completedGatesToday: [], shadowArmy: [],
    equippedWeapon: null, equippedSkill: null, xpMultiplier: 1, shadowFragments: 0,
    dailyMissions: [], inventory: [],
    weeklyChallenge: null, lastWeeklyResetDate: null, equippedShadowId: null,
    dailyDealIndex: null, eventGateData: null,
};

let gateTimer = null, gateSeconds = 0, awakeningStep = 0;

// --- BANCOS DE DADOS DA IA (EXPANDIDOS) ---
const RANKS = ['E', 'D', 'C', 'B', 'A', 'S'];
const EXERCISE_DB = [ /* ... */ ];
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
    checkForDailyReset();
    updateUI();
    updateMissionUI();
    updateWeeklyChallengeUI();
    generateGates();
    generateShopItems();
    addSystemLog("[SISTEMA] O Hunter está online.");
}
function saveGameState() { localStorage.setItem('arisePlayerState', JSON.stringify(playerState)); }
function loadGameState() { /* ... */ }
function checkForDailyReset() {
    const lastPlayed = localStorage.getItem('ariseLastPlayedDate'), today = new Date().toDateString();
    if (lastPlayed !== today) {
        playerState.completedMissionsToday = []; playerState.completedGatesToday = []; playerState.dailyMissions = [];
        playerState.dailyDealIndex = Math.floor(Math.random() * SHOP_ITEMS.length);
        if (Math.random() < 0.25) {
            playerState.eventGateData = { ...EVENT_GATE_DATA, id: 'event_gate_' + Date.now() };
        } else {
            playerState.eventGateData = null;
        }
        localStorage.setItem('ariseLastPlayedDate', today);
        addSystemLog("[SISTEMA] Novo dia detectado. A IA está gerando novas oportunidades.", true);
    }
}
function checkForWeeklyReset() { /* ... */ }

// --- UI ---
function updateUI() { /* ... */ }
function updateHeaderUI() { /* ... */ }
function calculatePowerLevel() { /* ... */ }
function updateRankProgressRing() { /* ... */ }
function showScreen(screenId) { /* ... */ }
function addSystemLog(message, isGlitch = false) { /* ... */ }
function showModal(title, body, footerContent) { /* ... */ }
function hideModal() { /* ... */ }
function showCelebration(title, message, isRankUp = false) { /* ... */ }
function hideCelebration() { /* ... */ }
function showFloatingText(targetElement, text, type) { /* ... */ }

// --- SISTEMA DINÂMICO: DESAFIO SEMANAL ---
function generateWeeklyChallenge() { /* ... */ }
function updateWeeklyChallengeUI() { /* ... */ }
function updateWeeklyChallengeProgress(amount, type) { /* ... */ }
function claimWeeklyReward() { /* ... */ }

// --- SISTEMA DINÂMICO: SINERGIA DE SOMBRAS ---
function equipShadow(shadowId) { /* ... */ }
function applyShadowBuffs(rewards) { /* ... */ }

// --- SISTEMA DINÂMICO: PORTÕES DE EVENTO ---
function generateGates() { /* ... */ }

// --- SISTEMA DINÂMICO: OFERTA DIÁRIA DA LOJA ---
function generateShopItems() { /* ... */ }
function confirmItemPurchase(itemId, cost) { /* ... */ }

// --- FUNÇÕES DE TREINO (NOVO) ---
function getWorkoutForDifficulty(difficulty) { /* ... */ }
function displayWorkout(workout, targetElementId) { /* ... */ }

// --- LÓGICA DE MISSÕES (CORRIGIDA E COM TREINOS) ---
function generateDailyMissionsAI() { /* ... */ }
function updateMissionUI() { /* ... */ }
function completeMission(missionId) { /* ... */ }
function confirmMissionCompletion(missionId) { /* ... */ }
function claimDailyReward() { /* ... */ }

// --- LÓGICA DE PORTÕES (COM TREINOS) ---
function enterGate(gateId) { /* ... */ }
function startGateTimer() { /* ... */ }
function updateGateTimerDisplay() { /* ... */ }
function completeActiveGate() { /* ... */ }

// --- LÓGICA DE RECOMPENSAS E PROGRESSÃO ---
function gainRewards(xp, arks) { /* ... */ }
function checkForLevelUp() { /* ... */ }
function checkForRankUp() { /* ... */ }
function attemptShadowExtraction(gate) { /* ... */ }
function updateShadowArmyUI() { /* ... */ }

// --- FUNÇÕES DE GERENCIAMENTO DE CONTA (NOVO) ---
function saveGameStatus() {
    saveGameState();
    addSystemLog("[SISTEMA] Status salvo com sucesso.");
}

function showResetConfirmation() {
    showModal(
        "Confirmar Reset de Jogo",
        `<p>Tem certeza que deseja resetar seu progresso?</p><p><strong>Atenção:</strong> Esta ação <strong>não pode ser desfeita</strong> e irá apagar todo o seu progresso, missões, sombras e Arks.</p>`,
        `<button onclick="hideModal()">Cancelar</button><button class="btn-danger" onclick="performFullReset()" style="margin-left: 10px;">Sim, Resetar Jogo</button>`
    );
}

function performFullReset() {
    // Limpa todos os dados do localStorage
    localStorage.removeItem('arisePlayerState');
    localStorage.removeItem('ariseLastPlayedDate');

    // Reseta o estado do jogador para os valores iniciais
    playerState = {
        name: 'Hunter', level: 1, xp: 0, xpToNextLevel: 100, arks: 0, rank: 'E', rankPoints: 0,
        rankPointsToNext: 500, completedMissionsToday: [], completedGatesToday: [], shadowArmy: [],
        equippedWeapon: null, equippedSkill: null, xpMultiplier: 1, shadowFragments: 0,
        dailyMissions: [], inventory: [],
        weeklyChallenge: null, lastWeeklyResetDate: null, equippedShadowId: null,
        dailyDealIndex: null, eventGateData: null,
    };

    // Re-inicializa o aplicativo como se fosse a primeira vez
    initializeApp();
    
    hideModal();
    addSystemLog("[SISTEMA] Jogo resetado. Um novo começo espera por você.", true);
}


// --- AWAKENING ONBOARDING (DESABILITADO) ---
const awakeningTexts = [ /* ... */ ];
function showAwakening() { /* ... */ }
function nextAwakeningStep() { /* ... */ }
