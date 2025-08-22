// ランキング機能
class LocalRankingSystem {
    constructor() {
        this.storageKey = 'yoga-quiz-rankings';
        this.userStorageKey = 'yoga-quiz-user';
        this.maxRankingEntries = 50;
        this.rankings = this.loadRankings();
        this.currentUser = this.loadUser();
    }

    // ローカルストレージからランキングデータを読み込み
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

    saveUser() {
        localStorage.setItem(this.userStorageKey, JSON.stringify(this.currentUser));
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // ランキングデータをローカルストレージに保存
    saveRankings() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.rankings));
    }

    // スコア登録のメイン処理
    addScore(score, totalQuestions, timeSpent) {
        if (!this.currentUser) {
            this.showNamePrompt((userName) => {
                this.registerScore(userName, score, totalQuestions, timeSpent);
            });
        } else {
            this.registerScore(this.currentUser.name, score, totalQuestions, timeSpent);
        }
    }

    // 名前入力プロンプト表示
    showNamePrompt(callback) {
        const nameModal = document.createElement('div');
        nameModal.className = 'ranking-modal';
        nameModal.innerHTML = `
            <div class="ranking-modal-content">
                <h3>ランキング登録</h3>
                <p>ランキングに登録するニックネームを入力してください：</p>
                <input type="text" id="user-name-input" placeholder="ニックネーム" maxlength="20">
                <div class="ranking-modal-buttons">
                    <button id="name-submit-btn">登録</button>
                    <button id="name-skip-btn">スキップ</button>
                </div>
            </div>
        `;

        document.body.appendChild(nameModal);

        const nameInput = document.getElementById('user-name-input');
        const submitBtn = document.getElementById('name-submit-btn');
        const skipBtn = document.getElementById('name-skip-btn');

        nameInput.focus();

        const handleSubmit = () => {
            const userName = nameInput.value.trim();
            if (userName) {
                document.body.removeChild(nameModal);
                callback(userName);
            } else {
                nameInput.style.borderColor = '#ff6b6b';
                nameInput.placeholder = 'ニックネームを入力してください';
            }
        };

        const handleSkip = () => {
            document.body.removeChild(nameModal);
        };

        submitBtn.addEventListener('click', handleSubmit);
        skipBtn.addEventListener('click', handleSkip);
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSubmit();
        });
    }

    // 実際のスコア登録処理
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

        console.log('[DEBUG] Registering score:', scoreEntry);

        // ユーザー情報保存
        this.currentUser = { name: userName };
        this.saveUser();

        // 各期間のランキングに追加
        this.addToRanking('allTime', scoreEntry);
        this.addToRanking('monthly', scoreEntry);
        this.addToRanking('weekly', scoreEntry);
        this.addToRanking('daily', scoreEntry);

        // 古いデータのクリーンアップ
        this.cleanupOldData();
        this.saveRankings();

        // 結果表示
        this.showRankingResults(scoreEntry);
    }

    // ランキングにスコアを追加
    addToRanking(period, scoreEntry) {
        if (!this.rankings[period]) {
            this.rankings[period] = [];
        }

        this.rankings[period].push(scoreEntry);

        // スコア順（降順）でソート、同点の場合は時間順（昇順）
        this.rankings[period].sort((a, b) => {
            if (a.score !== b.score) {
                return b.score - a.score; // スコア高い順
            }
            if (a.percentage !== b.percentage) {
                return b.percentage - a.percentage; // 正答率高い順
            }
            return a.timeSpent - b.timeSpent; // 時間短い順
        });

        // 上位50位まで保持
        if (this.rankings[period].length > this.maxRankingEntries) {
            this.rankings[period] = this.rankings[period].slice(0, this.maxRankingEntries);
        }
    }

    // 古いデータのクリーンアップ
    cleanupOldData() {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        
        // 今日のデータのみ保持（日次ランキング）
        this.rankings.daily = this.rankings.daily.filter(entry => entry.date === today);

        // 今週のデータのみ保持（週次ランキング）
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay()); // 今週の日曜日
        weekStart.setHours(0, 0, 0, 0);
        
        this.rankings.weekly = this.rankings.weekly.filter(entry => {
            const entryDate = new Date(entry.timestamp);
            return entryDate >= weekStart;
        });

        // 今月のデータのみ保持（月次ランキング）
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        this.rankings.monthly = this.rankings.monthly.filter(entry => {
            const entryDate = new Date(entry.timestamp);
            return entryDate >= monthStart;
        });
    }

    // ランキング結果表示
    showRankingResults(currentEntry) {
        const rankingModal = document.createElement('div');
        rankingModal.className = 'ranking-modal ranking-results';
        
        const periods = [
            { key: 'daily', label: '今日' },
            { key: 'weekly', label: '今週' },
            { key: 'monthly', label: '今月' },
            { key: 'allTime', label: '総合' }
        ];

        let tabsHtml = '<div class="ranking-tabs">';
        let contentHtml = '<div class="ranking-content">';

        periods.forEach((period, index) => {
            const ranking = this.rankings[period.key] || [];
            const userRank = ranking.findIndex(entry => entry.id === currentEntry.id) + 1;
            
            tabsHtml += `<button class="ranking-tab ${index === 0 ? 'active' : ''}" data-period="${period.key}">${period.label}</button>`;
            
            contentHtml += `<div class="ranking-tab-content ${index === 0 ? 'active' : ''}" data-period="${period.key}">`;
            contentHtml += `<div class="user-rank">あなたの順位: ${userRank > 0 ? userRank + '位' : '圏外'}</div>`;
            contentHtml += '<div class="ranking-list">';
            
            ranking.slice(0, 10).forEach((entry, idx) => {
                const isCurrentUser = entry.id === currentEntry.id;
                contentHtml += `
                    <div class="ranking-item ${isCurrentUser ? 'current-user' : ''}">
                        <span class="rank">${idx + 1}</span>
                        <span class="name">${entry.name}</span>
                        <span class="score">${entry.score}/${entry.totalQuestions}</span>
                        <span class="percentage">${entry.percentage}%</span>
                        <span class="time">${this.formatTime(entry.timeSpent)}</span>
                    </div>
                `;
            });
            
            contentHtml += '</div></div>';
        });

        tabsHtml += '</div>';
        contentHtml += '</div>';

        rankingModal.innerHTML = `
            <div class="ranking-modal-content">
                <h3>🏆 ランキング結果</h3>
                ${tabsHtml}
                ${contentHtml}
                <div class="ranking-modal-buttons">
                    <button id="ranking-close-btn">閉じる</button>
                </div>
            </div>
        `;

        document.body.appendChild(rankingModal);

        // タブ切り替え機能
        const tabs = rankingModal.querySelectorAll('.ranking-tab');
        const tabContents = rankingModal.querySelectorAll('.ranking-tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const period = tab.dataset.period;
                
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                rankingModal.querySelector(`[data-period="${period}"]`).classList.add('active');
            });
        });

        // 閉じるボタン
        document.getElementById('ranking-close-btn').addEventListener('click', () => {
            document.body.removeChild(rankingModal);
        });
    }

    // ユーザーの最高記録を取得
    getUserBestScore(nickname) {
        const userEntries = this.rankings.filter(entry => entry.nickname === nickname);
        if (userEntries.length === 0) return null;

        return userEntries.reduce((best, current) => {
            if (current.score > best.score) return current;
            if (current.score === best.score && current.accuracy > best.accuracy) return current;
            if (current.score === best.score && current.accuracy === best.accuracy && current.timeSpent < best.timeSpent) return current;
            return best;
        });
    }

    // 統計情報を取得
    getStats() {
        if (this.rankings.length === 0) {
            return {
                totalGames: 0,
                averageScore: 0,
                averageAccuracy: 0,
                bestScore: 0
            };
        }

        const totalGames = this.rankings.length;
        const averageScore = this.rankings.reduce((sum, entry) => sum + entry.score, 0) / totalGames;
        const averageAccuracy = this.rankings.reduce((sum, entry) => sum + entry.accuracy, 0) / totalGames;
        const bestScore = Math.max(...this.rankings.map(entry => entry.score));

        return {
            totalGames,
            averageScore: Math.round(averageScore * 10) / 10,
            averageAccuracy: Math.round(averageAccuracy * 10) / 10,
            bestScore
        };
    }

    // ランキング表示用HTML生成
    generateRankingHTML(period = 'all') {
        const rankings = this.getRankingsByPeriod(period);
        if (rankings.length === 0) {
            return '<p class="no-data">まだデータがありません</p>';
        }

        let html = '<div class="ranking-list">';
        rankings.forEach((entry, index) => {
            const rank = index + 1;
            const medal = this.getMedalIcon(rank);
            const date = new Date(entry.date).toLocaleDateString('ja-JP');
            
            html += `
                <div class="ranking-item">
                    <span class="rank">${medal} ${rank}位</span>
                    <span class="nickname">${entry.nickname}</span>
                    <span class="score">${entry.score}/${entry.totalQuestions}</span>
                    <span class="accuracy">${entry.accuracy.toFixed(1)}%</span>
                    <span class="time">${this.formatTime(entry.timeSpent)}</span>
                    <span class="date">${date}</span>
                </div>
            `;
        });
        html += '</div>';

        return html;
    }

    // メダルアイコンを取得
    getMedalIcon(rank) {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return '🏅';
        }
    }

    // 時間をフォーマット（秒を分:秒に変換）
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // ユーザー名変更
    changeUserName() {
        this.showNamePrompt((userName) => {
            this.currentUser = { name: userName };
            this.saveUser();
            console.log('[DEBUG] User name changed to:', userName);
        });
    }

    // ランキング表示（スコア登録なし）
    showRankings() {
        this.cleanupOldData();
        const dummyEntry = { id: 'dummy' };
        this.showRankingResults(dummyEntry);
    }

    // 現在のユーザー名取得
    getCurrentUserName() {
        return this.currentUser ? this.currentUser.name : null;
    }
}

// グローバルインスタンス
const rankingSystem = new LocalRankingSystem();