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
        if (!this.currentUser) {
            this.showNamePrompt((userName) => {
                this.registerScore(userName, score, totalQuestions, timeSpent);
            });
        } else {
            this.registerScore(this.currentUser.name, score, totalQuestions, timeSpent);
        }
    }

    registerScore(userName, score, totalQuestions, timeSpent) {
        const now = new Date();
        const scoreEntry = {
            id: this.generateId(),
            name: userName,
            score: score,
            totalQuestions: totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            timeSpent: timeSpent,
            timestamp: now.getTime(),
            date: now.toISOString().split('T')[0]
        };

        // ユーザー情報保存
        this.currentUser = { name: userName };
        this.saveUser();

        // 各期間のランキングに追加
        this.addToRanking('allTime', scoreEntry);
        this.addToRanking('monthly', scoreEntry);
        this.addToRanking('weekly', scoreEntry);
        this.addToRanking('daily', scoreEntry);

        // 古いデータのクリーンアップ（この処理を最後に移動）
        this.cleanupOldData();
        
        // 保存
        this.saveRankings();

        this.showRankingResults(scoreEntry);
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
        const userRanks = {
            daily: this.getUserRank('daily', userScore.id),
            weekly: this.getUserRank('weekly', userScore.id),
            monthly: this.getUserRank('monthly', userScore.id),
            allTime: this.getUserRank('allTime', userScore.id)
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

        let html = `<div class="ranking-list" data-period="${period}" style="display: ${displayStyle};">`;
        
        if (rankings.length === 0) {
            html += '<div class="no-data">まだデータがありません</div>';
        } else {
            rankings.slice(0, 10).forEach((entry, index) => {
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

// グローバル変数として初期化
let rankingSystem;

// DOM読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
    rankingSystem = new LocalRankingSystem();
});