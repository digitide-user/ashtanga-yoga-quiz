// ランキングAPI ベースURL（末尾 /exec）を一元定義
// window.RANKING_API_URL が優先、なければ API_BASE を使用
const API_BASE = 'https://script.google.com/macros/s/AKfycbx3ecFodPRt3BWmslQEULFlJJYJ4Dh1FIZczKB8m6IxUpUjkLObnjPoS2fB-ZJ27oQHew/exec';
if (typeof window !== 'undefined') {
    window.RANKING_API_URL = window.RANKING_API_URL || API_BASE;
}

class LocalRankingSystem {
    constructor() {
        this.storageKey = 'yoga-quiz-rankings';
        this.userStorageKey = 'yoga-quiz-user';
        this.maxRankingEntries = 50;
        this.rankings = this.loadRankings();
        this.currentUser = this.loadUser();
    }

    loadRankings() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {
            daily: [],
            weekly: [],
            monthly: [],
            allTime: []
        };
    }

    loadUser() {
        const saved = localStorage.getItem(this.userStorageKey);
        return saved ? JSON.parse(saved) : null;
    }

    saveRankings() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.rankings));
    }

    saveUser() {
        localStorage.setItem(this.userStorageKey, JSON.stringify(this.currentUser));
    }

    addScore(score, totalQuestions, timeSpent) {
        console.log('LocalRankingSystem.addScore called');
        console.log('Current user:', this.currentUser);
        
        // STRICTオンラインモード: 保存/表示せず、名前取得のみ行ってオンラインへ委譲
        if (window.STRICT_ONLINE_RANKING) {
            if (!this.currentUser) {
                console.log('STRICT mode: prompting for name only, delegating to online');
                this.showNamePrompt((userName) => {
                    if (window.rankingSystem && typeof window.rankingSystem.addScoreHybrid === 'function') {
                        window.rankingSystem.addScoreHybrid(userName, score, totalQuestions, timeSpent);
                    }
                });
            } else {
                if (window.rankingSystem && typeof window.rankingSystem.addScoreHybrid === 'function') {
                    window.rankingSystem.addScoreHybrid(this.currentUser.name, score, totalQuestions, timeSpent);
                }
            }
            return;
        }
        if (!this.currentUser) {
            console.log('No current user, showing name prompt...');
            this.showNamePrompt((userName) => {
                console.log('Name entered:', userName);
                this.registerScore(userName, score, totalQuestions, timeSpent);
            });
        } else {
            console.log('Current user exists:', this.currentUser.name);
            this.registerScore(this.currentUser.name, score, totalQuestions, timeSpent);
        }
    }

    registerScore(userName, score, totalQuestions, timeSpent) {
        if (window.STRICT_ONLINE_RANKING) return; // 無効化
        const scoreEntry = this.createScoreEntry(userName, score, totalQuestions, timeSpent);
        this.saveScoreOnly(scoreEntry);
        this.showRankingResults(scoreEntry);
    }

    // スコアエントリ作成（OnlineRankingSystemでも使用）
    createScoreEntry(userName, score, totalQuestions, timeSpent) {
        const now = new Date();
        return {
            id: this.generateId(),
            name: userName,
            score: score,
            totalQuestions: totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            timeSpent: timeSpent,
            timestamp: now.getTime(),
            date: now.toISOString().split('T')[0]
        };
    }

    // スコア保存のみ（表示は別途実行）
    saveScoreOnly(scoreEntry) {
        if (window.STRICT_ONLINE_RANKING) return; // 無効化
        // ユーザー情報保存
        this.currentUser = { name: scoreEntry.name };
        this.saveUser();

        // 各期間のランキングに追加
        this.addToRanking('allTime', scoreEntry);
        this.addToRanking('monthly', scoreEntry);
        this.addToRanking('weekly', scoreEntry);
        this.addToRanking('daily', scoreEntry);

        // 古いデータのクリーンアップ
        this.cleanupOldData();
        
        // 保存
        this.saveRankings();
    }

    addToRanking(period, scoreEntry) {
        // 配列の初期化を確実にする
        if (!this.rankings[period]) {
            this.rankings[period] = [];
        }

        this.rankings[period].push(scoreEntry);
        
        // スコア順でソート
        this.rankings[period].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.percentage !== a.percentage) return b.percentage - a.percentage;
            return a.timeSpent - b.timeSpent;
        });

        // 上位エントリーのみ保持
        this.rankings[period] = this.rankings[period].slice(0, this.maxRankingEntries);
    }

    cleanupOldData() {
        const now = new Date();
        const oneDayAgo = now.getTime() - (24 * 60 * 60 * 1000);
        const oneWeekAgo = now.getTime() - (7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = now.getTime() - (30 * 24 * 60 * 60 * 1000);

        // 配列の初期化を確実にする
        if (!this.rankings.daily) this.rankings.daily = [];
        if (!this.rankings.weekly) this.rankings.weekly = [];
        if (!this.rankings.monthly) this.rankings.monthly = [];
        if (!this.rankings.allTime) this.rankings.allTime = [];

        // 期間フィルタリング
        this.rankings.daily = this.rankings.daily.filter(entry => entry.timestamp > oneDayAgo);
        this.rankings.weekly = this.rankings.weekly.filter(entry => entry.timestamp > oneWeekAgo);
        this.rankings.monthly = this.rankings.monthly.filter(entry => entry.timestamp > oneMonthAgo);
        // allTimeは削除しない
    }

    showNamePrompt(callback) {
        const modal = document.createElement('div');
        modal.className = 'name-prompt-modal';
        modal.innerHTML = `
            <div class="name-prompt-content">
                <h3>🏆 ランキングに参加</h3>
                <p>お名前（ニックネーム）を入力してください</p>
                <input type="text" id="userName" placeholder="例: ヨガ太郎" maxlength="20">
                <div class="name-prompt-buttons">
                    <button id="submitNameBtn">登録してランキングを見る</button>
                    <button id="skipRankingBtn">今回はスキップ</button>
                </div>
                <p class="privacy-note">※お名前はランキング表示にのみ使用されます</p>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('submitNameBtn').onclick = () => {
            const userName = document.getElementById('userName').value.trim();
            if (userName) {
                document.body.removeChild(modal);
                callback(userName);
            } else {
                alert('お名前を入力してください');
            }
        };

        document.getElementById('skipRankingBtn').onclick = () => {
            document.body.removeChild(modal);
        };

        document.getElementById('userName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('submitNameBtn').click();
            }
        });

        setTimeout(() => document.getElementById('userName').focus(), 100);
    }

    showRankingResults(userScore) {
        if (window.STRICT_ONLINE_RANKING) return;
        // idがない正規化オブジェクトにも対応
        const scoreId = userScore?.id || this.findScoreIdFromNormalized(userScore);
        const userRanks = {
            daily: this.getUserRank('daily', scoreId),
            weekly: this.getUserRank('weekly', scoreId),
            monthly: this.getUserRank('monthly', scoreId),
            allTime: this.getUserRank('allTime', scoreId)
        };

        const resultsContainer = document.getElementById('result-container');
        if (resultsContainer) {
            const rankingInfo = document.createElement('div');
            rankingInfo.className = 'ranking-results';
            rankingInfo.innerHTML = `
                <div class="ranking-achievement">
                    <h3>🏆 あなたの順位</h3>
                    <div class="ranks-grid">
                        <div class="rank-item">
                            <div class="rank-period">今日</div>
                            <div class="rank-position">${userRanks.daily || '-'}位</div>
                        </div>
                        <div class="rank-item">
                            <div class="rank-period">今週</div>
                            <div class="rank-position">${userRanks.weekly || '-'}位</div>
                        </div>
                        <div class="rank-item">
                            <div class="rank-period">今月</div>
                            <div class="rank-position">${userRanks.monthly || '-'}位</div>
                        </div>
                        <div class="rank-item">
                            <div class="rank-period">総合</div>
                            <div class="rank-position">${userRanks.allTime || '-'}位</div>
                        </div>
                    </div>
                    <button onclick="rankingSystem.showFullRanking()" class="view-ranking-btn">
                        📊 詳細ランキングを見る
                    </button>
                </div>
            `;
            
            const rewardElement = resultsContainer.querySelector('#reward');
            if (rewardElement) {
                rewardElement.after(rankingInfo);
            } else {
                resultsContainer.appendChild(rankingInfo);
            }
        }
    }

    // 正規化オブジェクトから保存済みスコアのidを推定
    findScoreIdFromNormalized(userScore) {
        try {
            if (!userScore || !userScore.name) return null;
            const ts = userScore.timestampISO ? Date.parse(userScore.timestampISO) : null;
            const candidates = (this.rankings.allTime || []).filter(e => e.name === userScore.name);
            if (candidates.length === 0) return null;
            let best = null;
            let bestDiff = Number.POSITIVE_INFINITY;
            candidates.forEach(e => {
                const diff = ts ? Math.abs((e.timestamp || 0) - ts) : Math.abs((Date.now()) - (e.timestamp || 0));
                const scoreMatch = (userScore.score == null) || (e.score === userScore.score);
                const totalMatch = (userScore.totalQuestions == null) || (e.totalQuestions === userScore.totalQuestions);
                const timeMatch = (userScore.timeSpent == null) || (e.timeSpent === userScore.timeSpent);
                if (scoreMatch && totalMatch && timeMatch && diff < bestDiff) {
                    best = e;
                    bestDiff = diff;
                }
            });
            return best?.id || null;
        } catch (_) {
            return null;
        }
    }

    showFullRanking() {
        const modal = document.createElement('div');
        modal.className = 'ranking-modal';
        
        modal.innerHTML = `
            <div class="ranking-content">
                <div class="ranking-header">
                    <h2>🏆 ランキング</h2>
                    <div class="ranking-stats">
                        <div class="stat">総参加者: ${this.getTotalPlayers()}人</div>
                        <div class="stat">総ゲーム数: ${this.getTotalGames()}回</div>
                    </div>
                </div>
                
                <div class="ranking-tabs">
                    <button class="tab-btn active" data-period="daily">今日</button>
                    <button class="tab-btn" data-period="weekly">今週</button>
                    <button class="tab-btn" data-period="monthly">今月</button>
                    <button class="tab-btn" data-period="allTime">総合</button>
                </div>

                <div class="ranking-list-container">
                    ${this.generateRankingHTML('daily')}
                    ${this.generateRankingHTML('weekly')}
                    ${this.generateRankingHTML('monthly')}
                    ${this.generateRankingHTML('allTime')}
                </div>

                <div class="ranking-actions">
                    <button onclick="rankingSystem.shareRanking()" class="share-btn">📱 シェア</button>
                    <button onclick="rankingSystem.closeRankingModal()" class="close-btn">閉じる</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                modal.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const period = btn.dataset.period;
                modal.querySelectorAll('.ranking-list').forEach(list => {
                    list.style.display = list.dataset.period === period ? 'block' : 'none';
                });
            });
        });
    }

    generateRankingHTML(period) {
        const rankings = this.rankings[period] || [];
        const displayStyle = period === 'daily' ? 'block' : 'none';

        // 同一ユーザーのベストスコアのみ抽出
        const bestScoresByUser = this.getBestScoresByUser(rankings);

        let html = `<div class="ranking-list" data-period="${period}" style="display: ${displayStyle};">`;
        
        if (bestScoresByUser.length === 0) {
            html += '<div class="no-data">まだデータがありません</div>';
        } else {
            bestScoresByUser.slice(0, 10).forEach((entry, index) => {
                const isCurrentUser = entry.name === this.currentUser?.name;
                const timeDisplay = this.formatTime(entry.timeSpent);
                const rankIcon = this.getRankIcon(index + 1);
                
                html += `
                    <div class="ranking-item ${isCurrentUser ? 'current-user' : ''}">
                        <div class="rank">${rankIcon}${index + 1}</div>
                        <div class="player-info">
                            <div class="player-name">${entry.name}</div>
                            <div class="score-info">
                                ${entry.score}/${entry.totalQuestions}問 (${entry.percentage}%) 
                                <span class="time">⏱️${timeDisplay}</span>
                            </div>
                        </div>
                        ${isCurrentUser ? '<div class="you-badge">あなた</div>' : ''}
                    </div>
                `;
            });
        }
        
        html += '</div>';
        return html;
    }

    // 同一ユーザーのベストスコアのみを抽出
    getBestScoresByUser(rankings) {
        const userBestScores = new Map();

        rankings.forEach(entry => {
            const existing = userBestScores.get(entry.name);
            
            if (!existing) {
                userBestScores.set(entry.name, entry);
            } else {
                // より良いスコアか判定（スコア > 正答率 > 時間短縮）
                if (this.isBetterScore(entry, existing)) {
                    userBestScores.set(entry.name, entry);
                }
            }
        });

        // MapからArrayに変換してソート
        return Array.from(userBestScores.values()).sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.percentage !== a.percentage) return b.percentage - a.percentage;
            return a.timeSpent - b.timeSpent;
        });
    }

    // スコア比較（aがbより良いかどうか）
    isBetterScore(a, b) {
        if (a.score !== b.score) return a.score > b.score;
        if (a.percentage !== b.percentage) return a.percentage > b.percentage;
        return a.timeSpent < b.timeSpent;
    }

    getRankIcon(rank) {
        switch(rank) {
            case 1: return '🥇 ';
            case 2: return '🥈 ';
            case 3: return '🥉 ';
            default: return '';
        }
    }

    getUserRank(period, scoreId) {
        const rankings = this.rankings[period] || [];
        const index = rankings.findIndex(entry => entry.id === scoreId);
        return index >= 0 ? index + 1 : null;
    }

    getTotalPlayers() {
        const allTimeRankings = this.rankings.allTime || [];
        return new Set(allTimeRankings.map(entry => entry.name)).size;
    }

    getTotalGames() {
        const allTimeRankings = this.rankings.allTime || [];
        return allTimeRankings.length;
    }

    shareRanking() {
        const bestRank = this.getBestRank();
        const shareText = `アシュタンガヨガクイズに挑戦中！\n現在の最高順位: ${bestRank}位 🏆\n\nあなたも挑戦してみませんか？\n#アシュタンガヨガ #ヨガクイズ #ランキング`;

        if (navigator.share) {
            navigator.share({
                title: 'アシュタンガヨガクイズ',
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText + '\n' + window.location.href)
                .then(() => alert('シェア用テキストをクリップボードにコピーしました！'))
                .catch(() => alert('シェア用テキスト:\n' + shareText + '\n' + window.location.href));
        }
    }

    getBestRank() {
        const user = this.currentUser?.name;
        if (!user) return null;

        const ranks = [];
        Object.values(this.rankings).forEach(periodRankings => {
            const userEntry = periodRankings.find(entry => entry.name === user);
            if (userEntry) {
                const rank = periodRankings.indexOf(userEntry) + 1;
                ranks.push(rank);
            }
        });

        return ranks.length > 0 ? Math.min(...ranks) : null;
    }

    closeRankingModal() {
        const modal = document.querySelector('.ranking-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// オンラインランキングシステム
class OnlineRankingSystem {
    constructor() {
        // デフォルトはオンライン機能を無効化し、安定してローカル表示を優先
        const defaultApi = (typeof window !== 'undefined' && window.RANKING_API_URL) ? window.RANKING_API_URL : API_BASE;
        const onlineEnabled = (typeof window !== 'undefined' && window.ENABLE_ONLINE_RANKING === true);
        this.apiUrl = onlineEnabled ? defaultApi : '';
        this.fallbackToLocal = true; // オンライン失敗時はローカル版使用
        this.timeout = 5000; // 5秒タイムアウト（パフォーマンス改善）
        this.localSystem = new LocalRankingSystem();
        console.log('[Ranking] Online enabled:', onlineEnabled, 'API URL:', this.apiUrl || '(disabled)');
        if (window.STRICT_ONLINE_RANKING) {
            console.log('[RANK] ONLINE ONLY mode enabled');
        }
    }

    // 軽量ヘルスチェック（ping）。失敗時はオンライン無効化
    async healthCheckPing() {
        try {
            if (!this.isOnlineEnabled()) return false;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            const url = `${this.apiUrl}?action=ping&k=${encodeURIComponent(window.RANKING_SHARED_KEY || '')}`;
            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return true;
        } catch (e) {
            if (window.STRICT_ONLINE_RANKING) {
                console.warn('[RANK] PING fail → BLOCK:', e?.message || e);
                this.showBlockingError('オンライン接続が必須です。［再読み込み］');
            } else {
                console.warn('[RANK] ONLINE DISABLED (ping fail):', e?.message || e);
                this.apiUrl = '';
            }
            return false;
        }
    }

    // 全面オーバーレイで致命的エラーを表示
    showBlockingError(message) {
        const existing = document.querySelector('.blocking-overlay');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.className = 'blocking-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px;';
        overlay.innerHTML = `
            <div style="max-width:520px;">
                <h2 style="margin-bottom:12px;font-size:22px;">接続エラー</h2>
                <p style="margin-bottom:16px;line-height:1.7;">${message}</p>
                <button id="blocking-reload" style="padding:10px 18px;border:none;border-radius:8px;background:#ff5555;color:#fff;font-weight:700;cursor:pointer;">再読み込み</button>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.querySelector('#blocking-reload').addEventListener('click', () => location.reload());
    }

    // オンラインにスコア送信（CORS問題を回避するためGETリクエストに変更）
    async submitScoreOnline(scoreData) {
        try {
            console.log('[RANK] ONLINE SUBMIT start');
            console.log('Submitting score data:', scoreData);
            console.log('API URL:', this.apiUrl);
            console.log('Timeout:', this.timeout + 'ms');
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                console.warn('Request timeout after', this.timeout + 'ms');
                controller.abort();
            }, this.timeout);
            
            // データを個別のパラメータとして送信（Google Apps Script対応）
            const params = new URLSearchParams({
                action: 'addScore',
                name: scoreData.name,
                score: scoreData.score.toString(),
                totalQuestions: scoreData.totalQuestions.toString(),
                percentage: scoreData.percentage.toString(),
                timeSpent: scoreData.timeSpent.toString(),
                timestamp: scoreData.timestamp.toString(),
                userAgent: scoreData.userAgent,
                sessionId: scoreData.sessionId,
                k: (window.RANKING_SHARED_KEY || '')
            });
            
            // 送信パラメータ確認（簡易）
            console.log('URL Param action:', params.get('action'));
            
            const fullUrl = `${this.apiUrl}?${params.toString()}`;
            console.log('Full request URL length:', fullUrl.length);
            
            if (fullUrl.length > 2000) {
                console.warn('URL length exceeds recommended limit:', fullUrl.length);
            }
            
            console.log('Sending GET request...');
            const response = await fetch(fullUrl, {
                method: 'GET',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            console.log('Response received:');
            console.log('- Status:', response.status);
            console.log('- Status Text:', response.statusText);
            console.log('- Headers:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Unable to read error response');
                console.error('HTTP Error Response Body:', errorText);
                throw new Error('HTTP error: ' + response.status + ' ' + response.statusText);
            }
            
            const result = await response.json();
            console.log('Parsed JSON result:', result);
            if (result && result.success === true) {
                console.log('[RANK] ONLINE SUBMIT success');
                return true;
            }
            if (result && result.error === 'rate_limited') {
                const delay = 1500;
                console.warn('[RANK] rate_limited → retry in ' + delay + 'ms');
                await new Promise(r => setTimeout(r, delay));
                // 1回だけの再試行。2回目も rate_limited の場合は失敗扱い
                const retryOk = await this.submitScoreOnline(scoreData);
                return retryOk;
            }
            if (window.STRICT_ONLINE_RANKING) {
                console.error('[RANK] SUBMIT fail → BLOCK:', JSON.stringify(result));
                this.showBlockingError('ランキングサーバーに接続できません。［再読み込み］');
                return false;
            }
            throw new Error('API returned success=false: ' + JSON.stringify(result));
        } catch (error) {
            console.error('[RANK] ONLINE SUBMIT fail:', error?.message || error);
            console.error('Error type:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            
            if (error.name === 'AbortError') {
                console.error('Request was aborted due to timeout');
            } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
                console.error('Network error - check internet connection and API URL');
            }
            
            return false;
        }
    }

    // オンラインからランキング取得（期間/件数指定）
    async getRankings(period = 'allTime', limit = 50) {
        try {
            console.log('[RANK] ONLINE FETCH start', { period, limit });
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                console.warn('Rankings fetch timeout after', this.timeout + 'ms');
                controller.abort();
            }, this.timeout);
            
            const url = `${this.apiUrl}?action=getRankings&period=${encodeURIComponent(period)}&limit=${encodeURIComponent(limit)}&k=${encodeURIComponent(window.RANKING_SHARED_KEY || '')}`;
            console.log('Fetching rankings from:', url);
            
            const response = await fetch(url, {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            console.log('Rankings response:');
            console.log('- Status:', response.status);
            console.log('- Status Text:', response.statusText);
            
            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Unable to read error response');
                console.error('HTTP Error Response Body:', errorText);
                throw new Error('HTTP error: ' + response.status + ' ' + response.statusText);
            }
            
            const result = await response.json();
            console.log('Rankings result:', result);
            console.log('Rankings type:', typeof result.rankings);
            console.log('Rankings value:', result.rankings);
            if (result && result.error === 'rate_limited') {
                const delay = 1500;
                console.warn('[RANK] rate_limited → retry in ' + delay + 'ms');
                await new Promise(r => setTimeout(r, delay));
                return await this.getRankings(period, limit);
            }
            if (result && result.error === 'rate_limited') {
                const delay = 1500;
                console.warn('[RANK] rate_limited → retry in ' + delay + 'ms');
                await new Promise(r => setTimeout(r, delay));
                return await this.getRankings(period, limit);
            }
            
            // Google Apps Scriptが返すデータ形式に対応
            let rankings = null;
            if (result && result.success === true && result.rankings != null) {
                // 配列として返された場合
                if (Array.isArray(result.rankings)) {
                    rankings = result.rankings;
                }
                // オブジェクトとして返された場合（空のオブジェクト {} など）
                else if (typeof result.rankings === 'object') {
                    rankings = Object.values(result.rankings);
                    // 空のオブジェクトの場合は空配列にする
                    if (rankings.length === 0) {
                        rankings = [];
                    }
                }
            }
            
            console.log('Processed rankings:', rankings);
            console.log('Rankings count:', rankings?.length || 0);
            if (window.STRICT_ONLINE_RANKING && (!rankings || rankings.length === 0)) {
                this.showBlockingError('ランキングサーバーに接続できません。［再読み込み］');
            }
            return rankings || [];
        } catch (error) {
            console.error('[RANK] ONLINE FETCH fail:', error?.message || error);
            console.error('Error type:', error.name);
            console.error('Error message:', error.message);
            
            if (error.name === 'AbortError') {
                console.error('Rankings fetch was aborted due to timeout');
            }
            
            return [];
        }
    }

    // ハイブリッド処理（オンライン優先、失敗時はローカル）
    async addScoreHybrid(userName, score, totalQuestions, timeSpent) {
        console.log('OnlineRankingSystem.addScoreHybrid called');
        console.log('Parameters:', { userName, score, totalQuestions, timeSpent });
        
        try {
            const scoreData = {
                name: userName,
                score: score,
                totalQuestions: totalQuestions,
                percentage: Math.round((score / totalQuestions) * 100),
                timeSpent: timeSpent,
                timestamp: Date.now(),
                userAgent: navigator.userAgent.substring(0, 100),
                sessionId: this.generateSessionId()
            };

            // ローディング表示を追加
            this.showLoadingState('ランキングデータを処理中...');

            const scoreEntry = this.localSystem.createScoreEntry(userName, score, totalQuestions, timeSpent);
            if (!window.STRICT_ONLINE_RANKING) {
                // まずローカルに保存（バックアップとして）
                console.log('Saving to local system...');
                this.localSystem.saveScoreOnly(scoreEntry);
                console.log('Local save completed');
            }

            // オンラインAPIが設定されている場合のみオンライン処理を試行
            if (this.apiUrl && this.apiUrl.trim() !== '') {
                console.log('Attempting online submission...');
                const onlineSuccess = await this.submitScoreOnline(scoreData);
                
                if (onlineSuccess) {
                    console.log('Score submitted online successfully');
                    // オンラインランキングを表示
                    await this.showOnlineRankings(scoreEntry);
                    return;
                } else {
                    if (window.STRICT_ONLINE_RANKING) {
                        console.warn('[RANK] SUBMIT fail → BLOCK: online submission failed');
                        this.hideLoadingState();
                        this.showBlockingError('ランキングサーバーに接続できません。［再読み込み］');
                        return;
                    }
                    console.log('Online submission failed, falling back to local ranking');
                    this.showErrorMessage('オンラインランキングに接続できませんでした。ローカルランキングを表示します。');
                }
            } else {
                console.log('No online API configured, using local ranking');
            }
            
            if (window.STRICT_ONLINE_RANKING) {
                this.hideLoadingState();
                this.showBlockingError('ランキングサーバーに接続できません。［再読み込み］');
                return;
            }
            // ローカルランキングを表示（フォールバック）
            console.log('Showing local ranking results...');
            this.hideLoadingState();
            const normalized = {
                id: scoreEntry.id,
                name: scoreEntry.name,
                score: scoreEntry.score,
                totalQuestions: scoreEntry.totalQuestions,
                percentage: scoreEntry.percentage,
                timeSpent: scoreEntry.timeSpent,
                timestampISO: new Date(scoreEntry.timestamp).toISOString(),
                userAgent: scoreData.userAgent,
                sessionId: scoreData.sessionId
            };
            this.localSystem.showRankingResults(normalized);
            const existingModal = document.querySelector('.ranking-modal');
            if (existingModal) existingModal.remove();
            this.localSystem.showFullRanking();
            console.log('[RANK] LOCAL MODAL open');
            
        } catch (error) {
            console.error('Error in addScoreHybrid:', error);
            this.hideLoadingState();
            this.showErrorMessage('ランキング処理中にエラーが発生しました。');
            
            if (window.STRICT_ONLINE_RANKING) {
                this.showBlockingError('ランキングサーバーに接続できません。［再読み込み］');
                return;
            }
            // エラー時もローカルランキングを表示（正規化して表示）
            const scoreEntry2 = this.localSystem.createScoreEntry(userName, score, totalQuestions, timeSpent);
            this.localSystem.saveScoreOnly(scoreEntry2);
            const normalized2 = {
                id: scoreEntry2.id,
                name: scoreEntry2.name,
                score: scoreEntry2.score,
                totalQuestions: scoreEntry2.totalQuestions,
                percentage: scoreEntry2.percentage,
                timeSpent: scoreEntry2.timeSpent,
                timestampISO: new Date(scoreEntry2.timestamp).toISOString(),
                userAgent: navigator.userAgent.substring(0, 100),
                sessionId: this.generateSessionId()
            };
            this.localSystem.showRankingResults(normalized2);
            const existingModal2 = document.querySelector('.ranking-modal');
            if (existingModal2) existingModal2.remove();
            this.localSystem.showFullRanking();
            console.log('[RANK] LOCAL MODAL open');
        }
    }

    async showOnlineRankings(userScore) {
        this.showLoadingState('オンラインランキングを取得中...');
        
        const onlineRankings = await this.getRankings('allTime', 50);
        
        this.hideLoadingState();
        
        if (onlineRankings && onlineRankings.length > 0) {
            // オンラインランキングを表示
            console.log('Displaying online rankings:', onlineRankings.length, 'entries');
            this.displayRankings(onlineRankings, userScore, true);
        } else {
            if (window.STRICT_ONLINE_RANKING) {
                this.showBlockingError('ランキングサーバーに接続できません。［再読み込み］');
            } else {
                // ローカルランキングにフォールバック
                console.log('No online rankings available, immediately showing local rankings');
                this.showErrorMessage('オンラインランキングデータがありません。ローカルランキングを表示します。');
                console.log('Calling localSystem.showRankingResults...');
                this.localSystem.showRankingResults(userScore);
                const existingModal = document.querySelector('.ranking-modal');
                if (existingModal) existingModal.remove();
                this.localSystem.showFullRanking();
                console.log('[RANK] LOCAL MODAL open');
            }
        }
    }

    displayRankings(rankings, userScore, isOnline = false) {
        // ランキング表示UI（オンライン/ローカル表示を区別）
        const titlePrefix = isOnline ? '🌐 オンライン' : '💾 ローカル';
        
        const resultsContainer = document.getElementById('result-container');
        if (!resultsContainer) return;

        // 既存のランキング結果をすべてクリア
        this.clearExistingRankingDisplays(resultsContainer);

        const rankingInfo = document.createElement('div');
        rankingInfo.className = 'ranking-results';
        rankingInfo.innerHTML = `
            <div class="ranking-achievement">
                <h3>${titlePrefix} ランキング</h3>
                <div class="ranks-grid">
                    ${this.generatePeriodRanks(rankings, userScore)}
                </div>
                <button onclick="rankingSystem.showFullRanking()" class="view-ranking-btn">
                    📊 詳細ランキングを見る
                </button>
                ${isOnline ? '<div class="online-status">✅ オンライン同期済み</div>' : '<div class="local-status">💾 ローカル保存</div>'}
            </div>
        `;
        
        const rewardElement = resultsContainer.querySelector('#reward');
        if (rewardElement) {
            rewardElement.after(rankingInfo);
        } else {
            resultsContainer.appendChild(rankingInfo);
        }
    }

    generatePeriodRanks(rankings, userScore) {
        // オンラインは厳密な期間分割は未対応だが、UI上は期間表示を整える
        const periods = [
            { key: 'daily', label: '今日' },
            { key: 'weekly', label: '今週' },
            { key: 'monthly', label: '今月' },
            { key: 'all', label: '総合' },
        ];

        return periods.map(p => {
            const rank = this.getUserRankInPeriod(rankings, userScore, p.key);
            return `
                <div class="rank-item">
                    <div class="rank-period">${p.label}</div>
                    <div class="rank-position">${rank || '-'}位</div>
                </div>
            `;
        }).join('');
    }

    getUserRankInPeriod(rankings, userScore, period) {
        // 簡易実装（実際のオンラインランキングでは期間別フィルタリングが必要）
        const userIndex = rankings.findIndex(entry => 
            entry.name === userScore.name && 
            entry.timestamp === userScore.timestamp
        );
        return userIndex >= 0 ? userIndex + 1 : null;
    }

    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    }

    // API URL設定
    setApiUrl(url) {
        this.apiUrl = url;
        console.log('Online ranking API URL set:', url);
    }

    // オンライン機能の有効/無効状態を確認
    isOnlineEnabled() {
        return this.apiUrl && this.apiUrl.trim() !== '';
    }

    // 詳細ランキング表示（OnlineRankingSystem用）
    async showFullRanking() {
        console.log('showFullRanking called on OnlineRankingSystem');
        
        // オンラインランキングを取得して表示を試行
        if (this.isOnlineEnabled()) {
            console.log('Attempting to fetch online rankings for full ranking display...');
            const onlineRankings = await this.getRankings('allTime', 50);
            console.log('Online rankings fetched for full display:', onlineRankings?.length || 0, 'entries');
            
            if (onlineRankings && onlineRankings.length > 0) {
                console.log('Showing online ranking modal...');
                this.showOnlineRankingModal(onlineRankings);
                return;
            }
        }
        
        // オンラインが失敗した場合はローカルシステムにフォールバック
        console.log('Falling back to local ranking display for showFullRanking');
        this.localSystem.showFullRanking();
    }

    // オンラインランキングモーダル表示
    showOnlineRankingModal(rankings) {
        const modal = document.createElement('div');
        modal.className = 'ranking-modal';
        
        modal.innerHTML = `
            <div class="ranking-content">
                <div class="ranking-header">
                    <h2>🌐 オンラインランキング</h2>
                    <div class="ranking-stats">
                        <div class="stat">総参加者: ${new Set(rankings.map(r => r.name)).size}人</div>
                        <div class="stat">総ゲーム数: ${rankings.length}回</div>
                    </div>
                </div>
                
                <div class="ranking-tabs">
                    <button class="tab-btn active" data-period="all">総合</button>
                </div>

                <div class="ranking-list-container">
                    ${this.generateOnlineRankingHTML(rankings)}
                </div>

                <div class="ranking-actions">
                    <button onclick="rankingSystem.shareRanking()" class="share-btn">📱 シェア</button>
                    <button onclick="rankingSystem.closeRankingModal()" class="close-btn">閉じる</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // オンラインランキングHTML生成
    generateOnlineRankingHTML(rankings) {
        let html = `<div class="ranking-list" data-period="all" style="display: block;">`;
        
        if (!rankings || rankings.length === 0) {
            html += '<div class="no-data">まだデータがありません</div>';
        } else {
            // スコア順でソート
            const sortedRankings = rankings.sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                if (b.percentage !== a.percentage) return b.percentage - a.percentage;
                return (a.timeSpent || 0) - (b.timeSpent || 0);
            });
            
            sortedRankings.slice(0, 20).forEach((entry, index) => {
                const isCurrentUser = entry.name === this.localSystem.currentUser?.name;
                const timeDisplay = this.formatTime(entry.timeSpent || 0);
                const rankIcon = this.getRankIcon(index + 1);
                
                html += `
                    <div class="ranking-item ${isCurrentUser ? 'current-user' : ''}">
                        <div class="rank">${rankIcon}${index + 1}</div>
                        <div class="player-info">
                            <div class="player-name">${entry.name}</div>
                            <div class="score-info">
                                ${entry.score}/${entry.totalQuestions}問 (${entry.percentage}%) 
                                <span class="time">⏱️${timeDisplay}</span>
                            </div>
                        </div>
                        ${isCurrentUser ? '<div class="you-badge">あなた</div>' : ''}
                        <div class="online-badge">🌐</div>
                    </div>
                `;
            });
        }
        
        html += '</div>';
        return html;
    }

    // ランキングアイコン取得（LocalRankingSystemと同じ）
    getRankIcon(rank) {
        switch(rank) {
            case 1: return '🥇 ';
            case 2: return '🥈 ';
            case 3: return '🥉 ';
            default: return '';
        }
    }

    // 時間フォーマット（LocalRankingSystemと同じ）
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // ランキングシェア（LocalRankingSystemを再利用）
    shareRanking() {
        if (this.localSystem && this.localSystem.shareRanking) {
            this.localSystem.shareRanking();
        }
    }

    // モーダルを閉じる（LocalRankingSystemと同じ）
    closeRankingModal() {
        const modal = document.querySelector('.ranking-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
    }

    // ローディング状態表示
    showLoadingState(message = 'データを取得中...') {
        const resultsContainer = document.getElementById('result-container');
        if (!resultsContainer) return;

        // 既存のローディング表示を削除
        const existingLoading = resultsContainer.querySelector('.loading-state');
        if (existingLoading) {
            existingLoading.remove();
        }

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-state';
        loadingDiv.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner">🔄</div>
                <div class="loading-message">${message}</div>
            </div>
        `;
        
        const rewardElement = resultsContainer.querySelector('#reward');
        if (rewardElement) {
            rewardElement.after(loadingDiv);
        } else {
            resultsContainer.appendChild(loadingDiv);
        }
    }

    // ローディング状態を隠す
    hideLoadingState() {
        const loadingState = document.querySelector('.loading-state');
        if (loadingState) {
            loadingState.remove();
        }
    }

    // エラーメッセージ表示
    showErrorMessage(message) {
        const resultsContainer = document.getElementById('result-container');
        if (!resultsContainer) return;

        // 既存のエラーメッセージを削除
        const existingError = resultsContainer.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <div class="error-icon">⚠️</div>
                <div class="error-text">${message}</div>
            </div>
        `;
        
        const rewardElement = resultsContainer.querySelector('#reward');
        if (rewardElement) {
            rewardElement.after(errorDiv);
        } else {
            resultsContainer.appendChild(errorDiv);
        }

        // 5秒後に自動で削除
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // 既存のランキング表示をすべてクリア
    clearExistingRankingDisplays(container) {
        const elements = container.querySelectorAll('.ranking-results, .loading-state, .error-message');
        elements.forEach(element => element.remove());
    }
}

// グローバル変数として初期化
let rankingSystem;

// DOM読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
    // オンラインシステムを使用（APIが未設定の場合は自動的にローカルフォールバック）
    rankingSystem = new OnlineRankingSystem();
    // ヘルスチェック（有効時のみ2秒タイムアウトで1回）
    rankingSystem.healthCheckPing();

    // デバッグ用：コンソールから API URL を設定可能
    window.setRankingApiUrl = (url) => {
        rankingSystem.setApiUrl(url);
    };
});
