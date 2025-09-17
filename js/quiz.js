const quizData = [
    { imageName: '1PADANGUSTHASANA.png', answer: 'パーダングシュターサナ', category: ['立位', '前屈'] },
    { imageName: '2PADAHASTASANA.png', answer: 'パーダハスターサナ', category: ['立位', '前屈'] },
    { imageName: '3_1UTTHITATRIKONASANAA.png', answer: 'ウッティタ・トリコナーサナA', category: ['立位'] },
    { imageName: '3_2UTTHITATRIKONASANAB.png', answer: 'ウッティタ・トリコナーサナB', category: ['立位', 'ねじり'] },
    { imageName: '4_1UTTHITAPARSVAKONASANAA.png', answer: 'ウッティタ・パールシュヴァコナーサナA', category: ['立位'] },
    { imageName: '4_2UTTHITAPARSVAKONASANAB.png', answer: 'ウッティタ・パールシュヴァコナーサナB', category: ['立位', 'ねじり'] },
    { imageName: '5_1PRASARITAPADOTTANASANAA.png', answer: 'プラサーリタ・パードッターナーサナA', category: ['立位', '前屈'] },
    { imageName: '5_2PRASARITAPADOTTANASANAB.png', answer: 'プラサーリタ・パードッターナーサナB', category: ['立位', '前屈'] },
    { imageName: '5_3PRASARITAPADOTTANASANAC.png', answer: 'プラサーリタ・パードッターナーサナC', category: ['立位', '前屈'] },
    { imageName: '5_4PRASARITAPADOTTANASANAD.png', answer: 'プラサーリタ・パードッターナーサナD', category: ['立位', '前屈'] },
    { imageName: '6PARSVOTTANASANA.png', answer: 'パールシュボッターナーサナ', category: ['立位', '前屈'] },
    { imageName: '7UTTHITAHASTAPADANGUSTHASANA.png', answer: 'ウッティタ・ハスタ・パーダングシュターサナ', category: ['立位', 'バランス'] },
    { imageName: '8ARDHABADDHAPADMOTTANASANA.png', answer: 'アルダ・バッダ・パドモッターナーサナ', category: ['立位', 'バランス', '蓮華座'] },
    { imageName: '9UTKATASANA.png', answer: 'ウトゥカターサナ', category: ['立位'] },
    { imageName: '10_1VIRABHADRASANAⅠ.png', answer: 'ヴィーラバドラーサナⅠ', category: ['立位'] },
    { imageName: '10_2VIRABHADRASANAⅡ.png', answer: 'ヴィーラバドラーサナⅡ', category: ['立位'] },
    { imageName: '11DANDASANA.png', answer: 'ダンダーサナ', category: ['座位'] },
    { imageName: '12_1PASCIMATTANASANAA.png', answer: 'パスチマッターナーサナA', category: ['座位', '前屈'] },
    { imageName: '12_2PASCIMATTANASANAB.png', answer: 'パスチマッターナーサナB', category: ['座位', '前屈'] },
    { imageName: '13PURVATTANASANA.png', answer: 'プールヴァッターナーサナ', category: ['座位'] },
    { imageName: '14ARDHABADDHAPADMAPASCIMATTANASANA.png', answer: 'アルダ・バッダ・パドマ・パスチマッターナーサナ', category: ['座位', '前屈', '蓮華座'] },
    { imageName: '15TIRYANGMUKHAIKAPADAPASCIMATTANASANA.png', answer: 'ティリアングムカ・イカパーダ・パスチマッターナーサナ', category: ['座位', '前屈'] },
    { imageName: '16_1JANUSIRSASANAA.png', answer: 'ジャーヌシールシャーサナA', category: ['座位', '前屈'] },
    { imageName: '16_2JANUSIRSASANAB.png', answer: 'ジャーヌシールシャーサナB', category: ['座位', '前屈'] },
    { imageName: '16_3JANUSIRSASANAC.png', answer: 'ジャーヌシールシャーサナC', category: ['座位', '前屈'] },
    { imageName: '17_1MARICASANAA.png', answer: 'マリーチャーサナA', category: ['座位', '前屈'] },
    { imageName: '17_2MARICASANAB.png', answer: 'マリーチャーサナB', category: ['座位', '前屈'] },
    { imageName: '17_3MARICASANAC.png', answer: 'マリーチャーサナC', category: ['座位', '前屈', 'ねじり'] },
    { imageName: '17_4MARICASANAD.png', answer: 'マリーチャーサナD', category: ['座位', '前屈', 'ねじり'] },
    { imageName: '18NAVASANA.png', answer: 'ナーヴァーサナ', category: ['座位'] },
    { imageName: '19BHUJAPIDASANA.png', answer: 'ブジャピダーサナ', category: ['座位', 'バランス'] },
    { imageName: '20KURMASANA.png', answer: 'クルマーサナ', category: ['座位', '前屈'] },
    { imageName: '21SUPTAKURMASANA.png', answer: 'スプタ・クルマーサナ', category: ['仰向け', '前屈'] },
    { imageName: '22GARBHAPINDASANA.png', answer: 'ガルバ・ピンダーサナ', category: ['座位', 'バランス', '蓮華座'] },
    { imageName: '23KUKKUTASANA.png', answer: 'クックターサナ', category: ['座位', 'バランス', '蓮華座'] },
    { imageName: '24_1BADDHAKONASANAA.png', answer: 'バッダ・コナーサナA', category: ['座位', '前屈'] },
    { imageName: '24_2BADDHAKONASANAB.png', answer: 'バッダ・コナーサナB', category: ['座位', '前屈'] },
    { imageName: '25_1UPAVISTHAKONASANAA.png', answer: 'ウパヴィシュタ・コナーサナA', category: ['座位', '前屈'] },
    { imageName: '25_2UPAVISTHAKONASANAB.png', answer: 'ウパヴィシュタ・コナーサナB', category: ['座位', 'バランス'] },
    { imageName: '26SUPTAKONASANA.png', answer: 'スプタ・コナーサナ', category: ['仰向け'] },
    { imageName: '27SUPTAPADANGUSTHASANA.png', answer: 'スプタ・パーダングシュターサナ', category: ['仰向け', '前屈'] },
    { imageName: '28UBHAYAPADANGUSTHASANA.png', answer: 'ウバヤ・パーダングシュターサナ', category: ['座位', 'バランス'] },
    { imageName: '29URDHVAMUKHAPASCIMATTANASANA.png', answer: 'ウールドヴァ・ムカ・パスチマッターナーサナ', category: ['座位', 'バランス'] },
    { imageName: '30SETUBANDHASANA.png', answer: 'セツ・バンダーサナ', category: ['仰向け', 'バランス'] },
    { imageName: '31URDHVADHANURASANA.png', answer: 'ウールドヴァダヌラーサナ', category: ['仰向け', '後屈'] },
    { imageName: '32SALAMBASARVANGASANA.png', answer: 'サーランバ・サルヴァンガーサナ', category: ['逆転'] },
    { imageName: '33HALASANA.png', answer: 'ハラーサナ', category: ['逆転'] },
    { imageName: '34KARNAPIDASANA.png', answer: 'カルナピーダーサナ', category: ['逆転'] },
    { imageName: '35URDHVAPADMASANA.png', answer: 'ウールドヴァ・パドマーサナ', category: ['逆転', '蓮華座'] },
    { imageName: '36PINDASANA.png', answer: 'ピンダーサナ', category: ['逆転', '蓮華座'] },
    { imageName: '37MATSYASANA.png', answer: 'マツィヤーサナ', category: ['仰向け', '蓮華座'] },
    { imageName: '38UTTANAPADASANA.png', answer: 'ウッターナパーダーサナ', category: ['仰向け', '蓮華座'] },
    { imageName: '39SIRSASANA.png', answer: 'シールシャーサナ', category: ['逆転', 'バランス'] },
    { imageName: '40BADDHAPADMASANA.png', answer: 'バッダ・パドマーサナ', category: ['座位', '蓮華座'] },
    { imageName: '41YOGAMUDRA.png', answer: 'ヨガムドラー', category: ['座位', '蓮華座', '前屈'] },
    { imageName: '42PADMASANA.png', answer: 'パドマーサナ', category: ['座位', '蓮華座'] },
    { imageName: '43UTPLUTHIH.png', answer: 'ウトゥ・プルティヒ', category: ['座位', 'バランス', '蓮華座'] },
];

const quizContainer = document.getElementById('quiz-container');
const imageContainer = document.getElementById('image-container');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const rewardElement = document.getElementById('reward');
const restartBtn = document.getElementById('restart-btn');
const shareInstagramBtn = document.getElementById('share-instagram-btn');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let quizStartTime = 0;
let totalTimeSpent = 0;

// クイズの質問をシャッフルして準備
function setupQuiz() {
    // 開始時にすべてのボタン状態をクリア
    resetAllButtonStates();
    
    const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
    questions = shuffledQuestions.slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    quizStartTime = Date.now(); // クイズ開始時間を記録
    
    console.log('[DEBUG] Quiz started at:', new Date(quizStartTime).toLocaleTimeString());
    
    // 少し遅延してからクイズを開始（iOS Safari対応）
    setTimeout(() => {
        loadQuiz();
    }, 100);
}

// iPhone Safari検出（強制再描画アプローチ）
const isIOSSafari = /iPhone|iPad/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent);

// 強制再描画処理（iPhone Safari 専用）
function forceRedrawButtons() {
    console.log('[DEBUG] Force redraw buttons for iPhone Safari');
    
    const buttons = document.querySelectorAll('.choice-btn');
    if (buttons.length === 0) return;
    
    buttons.forEach((button, index) => {
        console.log(`[DEBUG] Redrawing button ${index}: ${button.innerText}`);
        
        // 一時的に非表示
        button.style.display = 'none';
        
        // 強制的に再描画を促す
        button.offsetHeight;
        
        // 再表示
        button.style.display = '';
        
        // スタイルを完全に再設定（疑似クラス状態をクリア）
        const currentStyle = button.style.cssText;
        button.style.cssText = '';
        button.style.cssText = currentStyle;
        
        // 追加で確実にリセット
        button.style.backgroundColor = 'rgba(68, 71, 90, 0.8)';
        button.style.borderColor = 'rgba(248, 248, 242, 0.8)';
        button.style.transform = 'none';
    });
    
    console.log('[DEBUG] All buttons redrawn');
}

// ボタン状態を安全にリセットする専用関数
function resetAllButtonStates() {
    console.log('[DEBUG] Resetting button states...');
    
    // iPhone Safari の場合は強制再描画
    if (isIOSSafari) {
        console.log('[DEBUG] iPhone Safari detected - using force redraw');
        forceRedrawButtons();
        return;
    }
    
    // 通常のリセット処理
    const choiceButtons = document.querySelectorAll('#options-container button, .choice-btn');
    console.log('[DEBUG] Found buttons to reset:', choiceButtons.length);
    
    choiceButtons.forEach((button, index) => {
        console.log(`[DEBUG] Resetting button ${index}:`, button.innerText);
        
        button.classList.remove('selected', 'active', 'clicked', 'pressed', 'hover-state');
        
        button.style.backgroundColor = '';
        button.style.borderColor = '';
        button.style.transform = '';
        button.style.boxShadow = '';
        button.style.opacity = '';
        
        button.removeAttribute('data-selected');
        
        if (button.blur) button.blur();
        document.activeElement.blur();
        
        button.style.webkitTapHighlightColor = 'transparent';
        
        console.log(`[DEBUG] Button ${index} reset complete`);
    });
}

function loadQuiz() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    console.log(`[DEBUG] Loading quiz question ${currentQuestionIndex + 1}`);

    const currentQuestion = questions[currentQuestionIndex];
    imageContainer.innerHTML = `<img src="images/${currentQuestion.imageName}" alt="ヨガのポーズ">`;

    // すべてのブラウザで同じ処理
    resetAllButtonStates();
    createAndDisplayButtons(currentQuestion);
    
    // iPhone Safari 専用：ボタン作成後に強制再描画
    if (isIOSSafari) {
        setTimeout(() => {
            forceRedrawButtons();
        }, 100);
    }
}

// ボタン作成と表示を分離した関数
function createAndDisplayButtons(currentQuestion) {
    const options = createOptions(currentQuestion.answer);
    
    // 選択肢コンテナをクリア
    optionsContainer.innerHTML = '';
    
    console.log('[DEBUG] Creating buttons for options:', options);
    
    // 選択肢ボタンを作成
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.className = 'choice-btn';
        button.setAttribute('data-answer', option);
        button.setAttribute('data-index', index);
        
        // 基本的なタッチハイライト無効化
        button.style.webkitTapHighlightColor = 'transparent';
        
        button.addEventListener('click', () => {
            console.log(`[DEBUG] Button clicked: "${option}" at index ${index}`);
            console.log('[DEBUG] Button element:', button);
            
            // 二重クリック防止
            if (button.disabled) return;
            button.disabled = true;
            
            // すべてのボタンを無効化
            const allChoiceButtons = optionsContainer.querySelectorAll('button');
            allChoiceButtons.forEach((btn, btnIndex) => {
                btn.disabled = true;
                console.log(`[DEBUG] Disabled button ${btnIndex}`);
            });
            
            // クリック時の視覚的フィードバック
            button.style.transform = 'scale(0.95)';
            button.style.backgroundColor = 'rgba(150, 153, 170, 0.9)';
            button.style.borderColor = '#fff';
            
            console.log('[DEBUG] Applied click feedback styles');
            
            // 次の問題に進む
            setTimeout(() => {
                console.log('[DEBUG] Moving to next question...');
                checkAnswer(option, currentQuestion.answer);
            }, 200);
        });
        
        optionsContainer.appendChild(button);
    });
    
    console.log('[DEBUG] All buttons created and appended');
}

function createOptions(correctAnswer) {
    const options = [correctAnswer];
    
    // 基本名を抽出するヘルパー関数
    const getBaseName = (poseName) => {
        const match = poseName.match(/^(.*?)(?:[ABCDEFGHIJKLMNPQRSTUVWXYZⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ]+)$/);
        return match ? match[1].trim() : poseName;
    };

    // コア名を抽出するヘルパー関数（プレフィックスを除去）
    const getCoreName = (poseName) => {
        // プレフィックスを除去（スプタ・、ウールドヴァ・、アルダ・など）
        const withoutPrefix = poseName.replace(/^(スプタ・|ウールドヴァ・|アルダ・|サーランバ・|ウッティタ・|プラサーリタ・|ティリアング|ウパヴィシュタ・|ウトゥ・)/g, '');
        // さらに末尾のバリエーション記号を除去
        const match = withoutPrefix.match(/^(.*?)(?:[ABCDEFGHIJKLMNPQRSTUVWXYZⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ]+)$/);
        return match ? match[1].trim() : withoutPrefix;
    };

    const correctBaseName = getBaseName(correctAnswer);
    const correctCoreName = getCoreName(correctAnswer);
    const correctPose = quizData.find(q => q.answer === correctAnswer);
    const correctCategories = correctPose ? correctPose.category : [];

    // 1. 似た名前のポーズを収集 (最優先、正解含めて最大2つまで) - 基本名一致のみ
    let similarNameAnswers = quizData
        .filter(q => {
            if (q.answer === correctAnswer) return false;
            // 基本名一致のみ（A/B/C/D等のバリエーション）
            return getBaseName(q.answer) === correctBaseName;
        })
        .map(q => q.answer);

    // 類似名前は最大1つまでに制限（正解を含めて計2つまで）
    const maxSimilarNames = 1;
    let addedSimilarNames = 0;
    while (options.length < 4 && similarNameAnswers.length > 0 && addedSimilarNames < maxSimilarNames) {
        const randomIndex = Math.floor(Math.random() * similarNameAnswers.length);
        options.push(similarNameAnswers.splice(randomIndex, 1)[0]);
        addedSimilarNames++;
    }

    // 2. 関連ポーズを収集 (プレフィックス違いなど、優先順位2)
    if (options.length < 4) {
        let relatedPoseAnswers = quizData
            .filter(q => {
                if (options.includes(q.answer) || q.answer === correctAnswer) return false;
                const qCoreName = getCoreName(q.answer);
                const qBaseName = getBaseName(q.answer);
                
                // 同一基本名（A/B/C等）は除外済みなので、プレフィックス違いや類似ポーズを探す
                if (qBaseName === correctBaseName) return false;
                
                // コア名での類似チェック（クルマーサナ ↔ スプタ・クルマーサナ）
                if (qCoreName === correctCoreName && correctCoreName.length > 4) return true;
                
                // 部分文字列での類似チェック（より広範囲）
                if (qCoreName.length > 4 && correctCoreName.length > 4) {
                    if (qCoreName.includes(correctCoreName) || correctCoreName.includes(qCoreName)) return true;
                }
                
                return false;
            })
            .map(q => q.answer);

        while (options.length < 4 && relatedPoseAnswers.length > 0) {
            const randomIndex = Math.floor(Math.random() * relatedPoseAnswers.length);
            options.push(relatedPoseAnswers.splice(randomIndex, 1)[0]);
        }
    }

    // 3. 似たカテゴリのポーズを収集 (優先順位3)
    if (options.length < 4 && correctCategories.length > 0) {
        let similarCategoryAnswers = quizData
            .filter(q => !options.includes(q.answer) && // 既に選択肢に含まれていない
                      q.answer !== correctAnswer && // 正解ではない
                      getBaseName(q.answer) !== correctBaseName && // 同一基本名は除外
                      q.category && // カテゴリが定義されている
                      q.category.some(cat => correctCategories.includes(cat))) // いずれかのカテゴリが一致
            .map(q => q.answer);

        while (options.length < 4 && similarCategoryAnswers.length > 0) {
            const randomIndex = Math.floor(Math.random() * similarCategoryAnswers.length);
            options.push(similarCategoryAnswers.splice(randomIndex, 1)[0]);
        }
    }

    // 4. 残りの選択肢をランダムなポーズで埋める
    let remainingWrongAnswers = quizData
        .map(q => q.answer)
        .filter(a => !options.includes(a)); // 既にoptionsに含まれているものは除外

    while (options.length < 4 && remainingWrongAnswers.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingWrongAnswers.length);
        options.push(remainingWrongAnswers.splice(randomIndex, 1)[0]);
    }

    return options.sort(() => Math.random() - 0.5);
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    loadQuiz();
}

function showResult() {
    // 総時間を計算（秒単位）
    totalTimeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
    
    console.log('[DEBUG] Quiz completed:', {
        score: score,
        totalQuestions: questions.length,
        timeSpent: totalTimeSpent
    });

    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    scoreElement.innerText = `${questions.length}問中 ${score}問正解！（${Math.floor(totalTimeSpent / 60)}分${totalTimeSpent % 60}秒）`;

    let rewardMessage = '';
    if (score === 10) {
        rewardMessage = '素晴らしい！あなたはアシュタンガヨガマスターです！これからもスピリチュアルライフを楽しんでくださいね！';
    } else if (score >= 7 && score <= 9) {
        rewardMessage = 'もう一歩でしたね！これからもアシュタンガヨガを楽しみながら継続していきましょう！キーププラクティス！';
    } else if (score >= 4 && score <= 6) {
        rewardMessage = 'ナイスチャレンジ！少しずつアーサナを習得している段階ですね。もっとヨガの世界を探究をしていきましょう！';
    } else {
        rewardMessage = 'ここからが始まりです！焦らなくて大丈夫！まずは一つ一つのアーサナをじっくり味わいながら楽しみましょう！';
    }
    
    rewardElement.innerText = rewardMessage;
    
    // ランキング機能を統合（ハイブリッドモード）
    setTimeout(async () => {
        console.log('=== QUIZ COMPLETE - STARTING RANKING PROCESS ===');
        console.log('rankingSystem exists:', typeof rankingSystem !== 'undefined');
        console.log('rankingSystem:', rankingSystem);
        
        if (typeof rankingSystem !== 'undefined' && rankingSystem) {
            console.log('rankingSystem.addScoreHybrid exists:', typeof rankingSystem.addScoreHybrid === 'function');
            console.log('rankingSystem.localSystem:', rankingSystem.localSystem);
            console.log('current user:', rankingSystem.localSystem?.currentUser);
            
            // OnlineRankingSystemのハイブリッドモードを使用
            if (rankingSystem.addScoreHybrid) {
                console.log('Using hybrid mode...');
                // ユーザー名を適切に取得
                const userName = rankingSystem.localSystem?.currentUser?.name || null;
                console.log('userName for ranking:', userName);
                
                if (!userName) {
                    console.log('No user name found, triggering name prompt through addScore...');
                    rankingSystem.localSystem.addScore(score, questions.length, totalTimeSpent);
                } else {
                    console.log('User name found, using hybrid mode...');
                    await rankingSystem.addScoreHybrid(
                        userName,
                        score, 
                        questions.length, 
                        totalTimeSpent
                    );
                }
            } else {
                // フォールバック：LocalRankingSystemの場合
                console.log('Falling back to local ranking system...');
                rankingSystem.addScore(score, questions.length, totalTimeSpent);
            }
        } else {
            console.error('rankingSystem is not available!');
        }
        console.log('=== RANKING PROCESS COMPLETE ===');
        // 結果画面でのみランキングボタンを表示
        const openBtn = document.getElementById('open-ranking-btn') || $('[data-role="open-ranking"]');
        if (openBtn) show(openBtn);
    }, 1500);

    // === QUIZ COMPLETE → スコア送信 & 結果表示（必ずUIを出す） ===
    (async () => {
      try {
        const _score = (typeof score !== 'undefined') ? score : (window.latestScore ?? 0);
        const _totalQs = (typeof totalQuestions !== 'undefined')
          ? totalQuestions
          : (typeof questions !== 'undefined' && Array.isArray(questions) ? questions.length : 10);
        const _timeSpent = (typeof timeSpent !== 'undefined') ? timeSpent
          : (typeof totalTimeSpent !== 'undefined') ? totalTimeSpent
          : (window.totalTimeSpent ?? 0);
        const _name = (typeof playerName !== 'undefined' && playerName) ? playerName : 'Guest';

        if (window.rankingSystem && typeof window.rankingSystem.submitScore === 'function') {
          await window.rankingSystem.submitScore({
            name: _name,
            score: _score,
            total_questions: _totalQs,
            time_spent: _timeSpent,
          });
          console.log('[RANK] POST ok');
        } else {
          console.warn('[RANK] submitScore not available; skip sending');
        }
      } catch (e) {
        console.warn('[RANK] POST failed but continue:', e);
      } finally {
        // 結果UIは必ず出す
        try {
          const resultContainer = document.getElementById('result-container');
          const quizContainer = document.getElementById('quiz-container');
          if (resultContainer && quizContainer) {
            resultContainer.classList.remove('hidden');
            quizContainer.classList.add('hidden');
          }
          const btn = document.getElementById('open-ranking-btn');
          if (btn && btn.style) btn.style.display = 'inline-block';
        } catch (_) {}
        // 再度安全に結果UIを構築・表示（冪等）
        try {
          const totalQs = (typeof totalQuestions !== 'undefined') ? totalQuestions : (Array.isArray(questions) ? questions.length : 10);
          const tSpent  = (typeof timeSpent !== 'undefined') ? timeSpent : (typeof totalTimeSpent !== 'undefined' ? totalTimeSpent : 0);
          const sc      = (typeof score !== 'undefined') ? score : (window.latestScore ?? 0);
          window.showResultsUI?.({ score: sc, totalTimeSpent: tSpent, totalQuestions: totalQs });
        } catch(_) {}
      }
    })();
}

// 便利ヘルパー
function $(sel){ return document.querySelector(sel); }
function show(el){ if(el) el.style.display=''; }
function hide(el){ if(el) el.style.display='none'; }

const __handleRestart = () => {
  // リスタート時にもボタン状態を完全リセット
  try { resetAllButtonStates && resetAllButtonStates(); } catch(e) { console.warn('[QUIZ] resetAllButtonStates unavailable', e); }
  try { resultContainer && resultContainer.classList.add('hidden'); } catch(e) {}
  try { quizContainer && quizContainer.classList.remove('hidden'); } catch(e) {}
  // 少し遅延してからクイズを再開始
  setTimeout(() => { try { setupQuiz && setupQuiz(); } catch(e) { console.error('[QUIZ] setupQuiz failed', e); } }, 100);
};

// 既存のボタンがあればバインド。無ければ何もしない（自動注入しない）
(() => {
  const r = document.getElementById('restart-btn') || document.getElementById('restartBtn') || $('[data-role="restart"]');
  if (r && r.addEventListener) r.addEventListener('click', __handleRestart);
})();

// （念のため）開始ボタン/シェアボタンもガード
(() => {
  const s = document.getElementById('start-btn') || $('[data-role="start-quiz"]');
  if (s && s.addEventListener) s.addEventListener('click', () => {
    try { typeof initQuiz==='function' ? initQuiz() : (window.quiz&&window.quiz.init&&window.quiz.init()); } catch(e){ console.error(e); }
  });
  const share = document.getElementById('share-instagram-btn') || $('[data-role="share-instagram"]');
  if (share && share.addEventListener) share.addEventListener('click', () => {
    try { window.open('https://www.instagram.com/', '_blank'); } catch(e){}
  });
})();

// share button binding moved to guarded block above

// 最初のクイズをセットアップして読み込む
setupQuiz();
// ===== RANKING BOOTSTRAP (self-contained) =====
(function () {
  // 1) Force config (even if index.html didn't inline it)
  window.ENABLE_ONLINE_RANKING = true;
  window.STRICT_ONLINE_RANKING = true;
  window.SUPABASE_URL = window.SUPABASE_URL || "https://utpcwlxxmgzkcrwfbiav.supabase.co";
  window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cGN3bHh4bWd6a2Nyd2ZiaWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MTYzNTgsImV4cCI6MjA3MTk5MjM1OH0.lCGFzl0pExl3uqsSh4h0jrPsmtowQ9618q4lZyxX4o4";

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.defer = true;
      s.onload = resolve;
      s.onerror = () => reject(new Error('load fail: ' + src));
      document.head.appendChild(s);
    });
  }
  function ensureModal(rows) {
    let m = document.getElementById('rankingModal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'rankingModal';
      Object.assign(m.style, { position:'fixed', inset:'0', background:'rgba(0,0,0,.55)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999 });
      m.innerHTML = `
        <div style="background:#fff;max-width:640px;width:90%;padding:16px;border-radius:12px;">
          <h3>オンラインランキング</h3>
          <div id="rankingBody" style="max-height:60vh;overflow:auto;"></div>
          <button id="closeRanking" class="btn">閉じる</button>
        </div>`;
      document.body.appendChild(m);
      m.querySelector('#closeRanking').onclick = () => (m.style.display = 'none');
    }
    const body = m.querySelector('#rankingBody');
    body.innerHTML = rows && rows.length
      ? `<ol>${rows.map(r=>`<li>${r.name ?? '匿名'} — ${r.score}/${r.total_questions} (${r.percentage}%) ${r.time_spent ?? '-'}s</li>`).join('')}</ol>`
      : '<p>データがありません。</p>';
    m.style.display = 'flex';
  }
  function ensureOpenButton() {
    let btn = document.querySelector('#viewRankingBtn,[data-action="open-ranking"]');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'viewRankingBtn';
      btn.dataset.action = 'open-ranking';
      btn.className = 'btn btn-secondary';
      btn.textContent = '詳細ランキングを見る';
      // 結果エリアが分からない環境でも確実に出すため body末尾に追加
      document.body.appendChild(btn);
    }
    return btn;
  }
  async function fetchRowsViaRest(period='allTime', limit=50) {
    const since = (() => {
      const d = new Date();
      if (period==='daily') d.setDate(d.getDate()-1);
      else if (period==='weekly') d.setDate(d.getDate()-7);
      else if (period==='monthly') d.setMonth(d.getMonth()-1);
      else return null;
      return d.toISOString();
    })();
    const base = window.SUPABASE_URL;
    const url = new URL(base.replace(/\/$/,'') + '/rest/v1/scores');
    url.searchParams.set('select','name,score,total_questions,percentage,time_spent,created_at');
    url.searchParams.set('order','score.desc,percentage.desc,time_spent.asc');
    url.searchParams.set('limit', String(limit));
    if (since) url.searchParams.set('created_at','gte.' + since);
    const res = await fetch(url.toString(), {
      headers: {
        apikey: window.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${window.SUPABASE_ANON_KEY}`,
      }
    });
    // QAが拾えるようにログ（GET … /rest/v1/scores）
    console.log(`[QA] CAPTURE GET ${res.status} ${url.toString()}`);
    if (!res.ok) throw new Error('REST get failed: ' + res.status);
    return await res.json();
  }

  async function boot() {
    try {
      console.log('[RANK CFG] boot', {
        strict: !!window.STRICT_ONLINE_RANKING,
        enable: !!window.ENABLE_ONLINE_RANKING,
        url: (window.SUPABASE_URL||'').slice(0,32)+'…',
        keyLen: (window.SUPABASE_ANON_KEY||'').length
      });
      if (!window.ENABLE_ONLINE_RANKING) return;

      // 2) Load supabase-js if missing
      if (typeof window.supabase === 'undefined') {
        await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
      }
      // 3) Try to load ranking.js; if 404 or not present, install minimal fallback
      if (!window.rankingSystem) {
        try { await loadScript('js/ranking.js?v=qa-autoboot'); } catch (_) {}
      }
      if (!window.rankingSystem) {
        // Minimal fallback with REST GET/POST
        window.rankingSystem = {
          async open(period='allTime', limit=50) {
            const rows = await fetchRowsViaRest(period, limit);
            ensureModal(rows || []);
          },
          async submitScore(entry) {
            try {
              const base = (window.SUPABASE_URL||'').replace(/\/$/,'');
              const url = base + '/rest/v1/scores';
              const payload = [{
                name: entry?.name || '匿名',
                score: Number(entry?.score || 0),
                total_questions: Number(entry?.totalQuestions || 10),
                percentage: Number(entry?.percentage || 0),
                time_spent: Number(entry?.timeSpent || 0)
              }];
              const res = await fetch(url, {
                method:'POST',
                headers:{
                  'Content-Type':'application/json',
                  'Prefer':'return=representation',
                  apikey: window.SUPABASE_ANON_KEY,
                  Authorization: `Bearer ${window.SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify(payload)
              });
              console.log(`[QA] CAPTURE POST ${res.status} ${url}`);
              if (!res.ok) throw new Error('REST insert failed: ' + res.status);
              return (await res.json())[0];
            } catch (e) {
              console.error('[RANK] fallback insert fail', e);
              return false;
            }
          }
        };
        console.log('[RANK] fallback rankingSystem installed');
      }

      // QA forced insert in autoboot as a safety net
      try {
        const usp = new URLSearchParams(location.search);
        if (usp.get('qa_insert') === '1' && !window.__QA_INSERT_DONE__) {
          window.__QA_INSERT_DONE__ = true;
          const sample = { name:'QA Bot', score:8, totalQuestions:10, percentage:80, timeSpent:30 };
          if (window.rankingSystem && typeof window.rankingSystem.submitScore === 'function') {
            window.rankingSystem.submitScore(sample)
              .then(() => console.log('[RANK QA] autoboot forced insert attempted'))
              .catch(e => console.error('[RANK QA] autoboot forced insert fail', e));
          }
        }
      } catch (e) { console.warn('[RANK QA] autoboot hook error', e); }
      // 4) Ensure the button & bind
      const btn = ensureOpenButton();
      if (!btn.dataset.rankingBound) {
        btn.dataset.rankingBound = '1';
        btn.addEventListener('click', () => window.rankingSystem.open('allTime', 50));
        console.log('[RANK] bind open-ranking button');
      }
    } catch (e) {
      console.error('[RANK BOOT] error', e);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once:true });
  } else {
    boot();
  }
})();
// ===== /RANKING BOOTSTRAP =====
/* ===== RANKING AUTOBOOT (forces Supabase config & UI even if index.html is stale) ===== */
(function () {
  // Force config — even if index.html didn't inline it
  window.ENABLE_ONLINE_RANKING = true;
  window.STRICT_ONLINE_RANKING = true;
  window.SUPABASE_URL = window.SUPABASE_URL || "https://utpcwlxxmgzkcrwfbiav.supabase.co";
  window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cGN3bHh4bWd6a2Nyd2ZiaWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MTYzNTgsImV4cCI6MjA3MTk5MjM1OH0.lCGFzl0pExl3uqsSh4h0jrPsmtowQ9618q4lZyxX4o4";

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.defer = true;
      s.onload = resolve;
      s.onerror = () => reject(new Error('load fail: ' + src));
      document.head.appendChild(s);
    });
  }
  function ensureModal(rows) {
    let m = document.getElementById('rankingModal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'rankingModal';
      Object.assign(m.style, { position:'fixed', inset:'0', background:'rgba(0,0,0,.55)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999 });
      m.innerHTML = `
        <div style="background:#fff;max-width:640px;width:90%;padding:16px;border-radius:12px;">
          <h3>オンラインランキング</h3>
          <div id="rankingBody" style="max-height:60vh;overflow:auto;"></div>
          <button id="closeRanking" class="btn">閉じる</button>
        </div>`;
      document.body.appendChild(m);
      m.querySelector('#closeRanking').onclick = () => (m.style.display = 'none');
    }
    const body = m.querySelector('#rankingBody');
    body.innerHTML = rows && rows.length
      ? `<ol>${rows.map(r=>`<li>${r.name ?? '匿名'} — ${r.score}/${r.total_questions} (${r.percentage}%) ${r.time_spent ?? '-'}s</li>`).join('')}</ol>`
      : '<p>データがありません。</p>';
    m.style.display = 'flex';
  }
  function ensureOpenButton() {
    let btn = document.querySelector('#viewRankingBtn,[data-action="open-ranking"]');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'viewRankingBtn';
      btn.dataset.action = 'open-ranking';
      btn.className = 'btn btn-secondary';
      btn.textContent = '詳細ランキングを見る';
      document.body.appendChild(btn);
    }
    return btn;
  }
  async function fetchRowsViaRest(period='allTime', limit=50) {
    const since = (() => {
      const d = new Date();
      if (period==='daily') d.setDate(d.getDate()-1);
      else if (period==='weekly') d.setDate(d.getDate()-7);
      else if (period==='monthly') d.setMonth(d.getMonth()-1);
      else return null;
      return d.toISOString();
    })();
    const base = window.SUPABASE_URL;
    const url = new URL(base.replace(/\/$/,'') + '/rest/v1/scores');
    url.searchParams.set('select','name,score,total_questions,percentage,time_spent,created_at');
    url.searchParams.set('order','score.desc,percentage.desc,time_spent.asc');
    url.searchParams.set('limit', String(limit));
    if (since) url.searchParams.set('created_at','gte.' + since);
    const res = await fetch(url.toString(), {
      headers: {
        apikey: window.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${window.SUPABASE_ANON_KEY}`,
      }
    });
    console.log(`[QA] CAPTURE GET ${res.status} ${url.toString()}`); // for Actions QA
    if (!res.ok) throw new Error('REST get failed: ' + res.status);
    return await res.json();
  }

  async function boot() {
    try {
      console.log('[RANK CFG] autoboot', {
        strict: !!window.STRICT_ONLINE_RANKING,
        enable: !!window.ENABLE_ONLINE_RANKING,
        url: (window.SUPABASE_URL||'').slice(0,32)+'…',
        keyLen: (window.SUPABASE_ANON_KEY||'').length
      });
      if (!window.ENABLE_ONLINE_RANKING) return;

      if (typeof window.supabase === 'undefined') {
        await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
      }
      if (!window.rankingSystem) {
        try { await loadScript('js/ranking.js?v=autoboot'); } catch (_) {}
      }
      if (!window.rankingSystem) {
        window.rankingSystem = {
          async open(period='allTime', limit=50) {
            const rows = await fetchRowsViaRest(period, limit);
            ensureModal(rows || []);
          },
          async submitScore() { return true; }
        };
        console.log('[RANK] fallback rankingSystem installed');
      }
      const btn = ensureOpenButton();
      if (!btn.dataset.rankingBound) {
        btn.dataset.rankingBound = '1';
        btn.addEventListener('click', () => window.rankingSystem.open('allTime', 50));
        console.log('[RANK] bind open-ranking button');
      }
    } catch (e) {
      console.error('[RANK BOOT] error', e);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once:true });
  } else {
    boot();
  }
})();
/* ===== /RANKING AUTOBOOT ===== */
// --- safety helpers to prevent null addEventListener crashes ---
function on(node, evt, handler) {
  if (node && node.addEventListener) node.addEventListener(evt, handler);
  else console.warn('[QUIZ] missing node for', evt);
}

function ensureRoot() {
  let root = document.getElementById('quiz') ||
             document.getElementById('quiz-container') ||
             document.querySelector('.quiz-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'quiz';
    document.body.appendChild(root);
    console.warn('[QUIZ] injected #quiz container');
  }
  return root;
}

function ensureStartButton() {
  let btn = document.getElementById('start-btn') ||
            document.getElementById('start-quiz') ||
            document.querySelector('[data-role="start-quiz"]');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'start-quiz';
    btn.textContent = 'クイズを始める';
    // できるだけ上に出す
    document.body.prepend(btn);
    console.warn('[QUIZ] injected #start-quiz button');
  }
  return btn;
}

// --- safe bootstrap: never throw even if elements are missing ---
document.addEventListener('DOMContentLoaded', () => {
  // 既に初期化済みなら何もしない
  if (window.__QUIZ_INIT_CALLED__) return;
  window.__QUIZ_INIT_CALLED__ = true;

  // ルート要素を確保（無ければ作る）
  const root = ensureRoot();
  void root; // kept for potential future use

  // 既存の初期化関数を特定
  const run =
    (typeof window.initQuiz === 'function' && window.initQuiz) ||
    (window.quiz && typeof window.quiz.init === 'function' && window.quiz.init) ||
    null;

  // スタートボタンを用意して、クリックで起動（関数が無ければ警告）
  const startBtn = ensureStartButton();
  if (run) on(startBtn, 'click', () => run());
  else console.warn('[QUIZ] init function not found; verify quiz.js exports');
});

// expose init to window (for QA/bootstrap)
try {
  if (typeof initQuiz === 'function') {
    window.initQuiz = window.initQuiz || initQuiz;
    window.quiz = window.quiz || {};
    if (typeof window.quiz.init !== 'function') window.quiz.init = initQuiz;
  }
} catch (e) {}

// --- Ensure Results UI and Ranking Modal (idempotent) ---
(function ensureResultsUI(){
  if (window.__resultsUiPatched) return;
  window.__resultsUiPatched = true;

  function ensureRankingModal() {
    const old = document.getElementById('rank-modal-overlay');
    if (old) old.remove();

    const ov = document.createElement('div');
    ov.id = 'rank-modal-overlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147483600;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center';
    const card = document.createElement('div');
    card.style.cssText = 'background:#fff;color:#111;width:min(640px,92vw);max-height:80vh;overflow:auto;border-radius:12px;box-shadow:0 12px 36px rgba(0,0,0,.5)';
    card.innerHTML = `
      <div style="padding:14px 18px;font-weight:700;border-bottom:1px solid #eee">ランキング上位</div>
      <div id="rank-body" style="padding:8px 12px">読み込み中…</div>
      <div style="padding:12px;text-align:right;border-top:1px solid #eee">
        <button id="rank-close" style="padding:8px 12px;border-radius:8px;border:1px solid #ccc;background:#fff;cursor:pointer">閉じる</button>
      </div>`;
    ov.appendChild(card);
    document.body.appendChild(ov);

    document.getElementById('rank-close').onclick = () => ov.remove();

    return {
      setRows(rows) {
        const body = document.getElementById('rank-body');
        if (!rows || !rows.length) {
          body.innerHTML = `<div style="padding:20px;text-align:center;color:#666">データがありません</div>`;
          return;
        }
        body.innerHTML = `
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr>
                <th style="text-align:left;padding:10px;border-bottom:1px solid #eee">名前</th>
                <th style="width:90px;padding:10px;border-bottom:1px solid #eee">得点</th>
                <th style="width:120px;padding:10px;border-bottom:1px solid #eee">正答率</th>
                <th style="width:100px;padding:10px;border-bottom:1px solid #eee">時間(秒)</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(r=>`
                <tr>
                  <td style="padding:10px;border-bottom:1px solid #f3f3f3">${(r.name ?? '—')}</td>
                  <td style="text-align:center;padding:10px;border-bottom:1px solid #f3f3f3">${r.score ?? ''}</td>
                  <td style="text-align:center;padding:10px;border-bottom:1px solid #f3f3f3">${Math.round(Number(r.percentage ?? 0))}%</td>
                  <td style="text-align:center;padding:10px;border-bottom:1px solid #f3f3f3">${r.time_spent ?? ''}</td>
                </tr>`).join('')}
            </tbody>
          </table>`;
      }
    };
  }

  async function openRankingModal() {
    const modal = ensureRankingModal();
    try {
      const api = window.rankingSystem;
      const rows = (api && typeof api.getTop === 'function') ? await api.getTop(10) : [];
      modal.setRows(rows);
    } catch (e) {
      console.warn('[RANK] getTop failed', e);
      modal.setRows([]);
    }
  }

  window.showResultsUI = function showResultsUI({ score, totalTimeSpent, totalQuestions }) {
    const result = document.getElementById('result-container');
    const quiz = document.getElementById('quiz-container');

    if (quiz) quiz.classList.add('hidden');

    if (result) {
      result.classList.remove('hidden');
      result.style.setProperty('display', 'block', 'important');
      result.style.setProperty('visibility', 'visible', 'important');
      result.style.setProperty('opacity', '1', 'important');

      const scoreEl = document.getElementById('score');
      if (scoreEl) {
        const tq = (typeof totalQuestions === 'number') ? totalQuestions : (window.questions?.length ?? 10);
        const sc = (typeof score === 'number') ? score : (window.latestScore ?? 0);
        scoreEl.textContent = `${sc} / ${tq}`;
      }
      const rewardEl = document.getElementById('reward');
      if (rewardEl && typeof score === 'number') {
        const tq = (typeof totalQuestions === 'number') ? totalQuestions : (window.questions?.length ?? 10);
        rewardEl.textContent = (score === tq) ? '全問正解！' : 'おつかれさま！';
      }

      let btn = document.getElementById('open-ranking-btn');
      if (!btn) {
        btn = document.createElement('button');
        btn.id = 'open-ranking-btn';
        btn.textContent = '詳細ランキングを見る';
        result.appendChild(btn);
      }
      // ensure class for allow-listing in kill-switch
      try { btn.classList.add('open-ranking-btn'); } catch(_) {}
      // if inline style had display:none, clear it first
      try {
        const raw = btn.getAttribute && btn.getAttribute('style');
        if (raw && /display\s*:\s*none/i.test(raw)) btn.style.removeProperty('display');
      } catch(_) {}
      btn.style.setProperty('display', 'inline-block', 'important');
      // reset listeners safely by cloning
      btn.replaceWith(btn.cloneNode(true));
      btn = document.getElementById('open-ranking-btn');
      try { btn.classList.add('open-ranking-btn'); } catch(_) {}
      // Prefer the unified overlay if available; otherwise keep legacy handler
      if (typeof window.openRankingOverlay === 'function') {
        btn.onclick = window.openRankingOverlay;
      } else {
        btn.addEventListener('click', openRankingModal, { once:false });
      }
    }
    try { window.ensureRankingButton && window.ensureRankingButton(); } catch(_) {}
  };
})();

// --- Overlay-based ranking modal; idempotent install ---
(function ensureRankingOverlay(){
  if (window.openRankingOverlay) return;

  window.openRankingOverlay = async function(){
    try { document.getElementById('__rankOverlay')?.remove(); } catch(_) {}

    const ov = document.createElement('div');
    ov.id = '__rankOverlay';
    document.body.appendChild(ov);
    const set = (el,k,v)=>el.style.setProperty(k,v,'important');
    set(ov,'position','fixed'); set(ov,'inset','0'); set(ov,'z-index','2147483647');
    set(ov,'background','rgba(0,0,0,.65)'); set(ov,'display','flex');
    set(ov,'align-items','center'); set(ov,'justify-content','center');

    const card = document.createElement('div');
    ov.appendChild(card);
    set(card,'background','#12131a'); set(card,'color','#fff');
    set(card,'padding','16px 20px'); set(card,'border-radius','12px');
    set(card,'max-height','80vh'); set(card,'overflow','auto');
    set(card,'min-width','360px'); set(card,'box-shadow','0 10px 40px rgba(0,0,0,.5)');

    const h = document.createElement('div');
    h.textContent = 'ランキング（上位10）';
    h.style.fontWeight = '700'; h.style.margin = '0 0 8px';
    card.appendChild(h);

    const tbl = document.createElement('table');
    set(tbl,'border-collapse','collapse'); set(tbl,'width','100%'); tbl.style.fontSize='14px';
    card.appendChild(tbl);

    const foot = document.createElement('div');
    set(foot,'text-align','right'); set(foot,'margin-top','8px');
    foot.innerHTML = `<button id="__rankClose">閉じる</button>`;
    card.appendChild(foot);
    foot.querySelector('#__rankClose').onclick = ()=> ov.remove();

    try{
      const rows = await (window.rankingSystem?.getTop?.(10) ?? Promise.resolve([]));
      const head = `<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #333">名前</th>
        <th style="text-align:right;padding:8px;border-bottom:1px solid #333">得点</th>
        <th style="text-align:right;padding:8px;border-bottom:1px solid #333">％</th>
        <th style="text-align:right;padding:8px;border-bottom:1px solid #333">秒</th></tr>`;
      const body = (rows||[]).map(r=>`
        <tr>
          <td style="padding:8px;border-bottom:1px solid #2a2a2a">${(r.name??'')}</td>
          <td style="padding:8px;text-align:right;border-bottom:1px solid #2a2a2a">${r.score}/${r.total_questions}</td>
          <td style="padding:8px;text-align:right;border-bottom:1px solid #2a2a2a">${Math.round(Number(r.percentage||0))}</td>
          <td style="padding:8px;text-align:right;border-bottom:1px solid #2a2a2a">${r.time_spent}</td>
        </tr>`).join('');
      tbl.innerHTML = (head + body) || `<tr><td style="padding:12px">データがありません</td></tr>`;
    } catch(e) {
      console.error('[RANK] overlay error', e);
      tbl.innerHTML = `<tr><td style="padding:12px;color:#f99">取得に失敗しました</td></tr>`;
    }
  };

  // Fallback binding at load time
  window.addEventListener('DOMContentLoaded', function(){
    ['open-ranking-btn','viewRankingBtn'].forEach(id=>{
      const b = document.getElementById(id);
      if (b){
        b.style.setProperty('display','inline-block','important');
        b.onclick = window.openRankingOverlay;
      }
    });
  });
})();

// --- Persistent result button guard and observer ---
(function persistRankingButton(){
  // Ensure a single definition
  window.ensureRankingButton = window.ensureRankingButton || function ensureRankingButton(){
    const res = document.getElementById('result-container');
    if (!res) return;
    let btn = document.getElementById('open-ranking-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'open-ranking-btn';
      btn.className = 'open-ranking-btn';
      btn.textContent = '詳細ランキングを見る';
      (res.querySelector('.actions') || res).appendChild(btn);
    }
    try { btn.classList.add('open-ranking-btn'); } catch(_) {}
    btn.style.removeProperty('display');
    btn.style.setProperty('display','inline-block','important');
    btn.onclick = (typeof window.openRankingOverlay === 'function') ? window.openRankingOverlay : (btn.onclick || null);
  };

  document.addEventListener('DOMContentLoaded', function(){
    // Run once on load
    try { window.ensureRankingButton(); } catch(_) {}
    const res = document.getElementById('result-container');
    if (!res) return;
    // Observe result container to re-ensure after rerenders
    const mo = new MutationObserver(function(){
      try { window.ensureRankingButton(); } catch(_) {}
    });
    mo.observe(res, { childList:true, subtree:true });
  });
})();

// HOTFIX: keep result (#score) visible by holding off auto-restart briefly
(function () {
  function now(){ return Date.now(); }
  var HOLD_MS = 15000; // 結果表示を最低15秒は維持
  var originalShowResult = window.showResult;
  var originalLoadQuiz  = window.loadQuiz;

  function forceShowScore(){
    var el = document.getElementById('score');
    if (!el) return;
    el.removeAttribute && el.removeAttribute('hidden');
    el.classList && el.classList.remove('hidden','invisible');
    if (el.style) {
      el.style.setProperty('display','block','important');
      el.style.setProperty('visibility','visible','important');
      el.style.setProperty('opacity','1','important');
    }
  }

  if (typeof originalShowResult === 'function') {
    window.showResult = function () {
      window.__resultHoldUntil = now() + HOLD_MS;
      try {
        return originalShowResult.apply(this, arguments);
      } finally {
        forceShowScore();
      }
    };
  }

  if (typeof originalLoadQuiz === 'function') {
    window.loadQuiz = function () {
      if (window.__resultHoldUntil && now() < window.__resultHoldUntil) {
        // 結果表示を維持して自動再スタートを抑制
        forceShowScore();
        return;
      }
      return originalLoadQuiz.apply(this, arguments);
    };
  }
})();

// HOTFIX: Persist result text across re-renders/reloads using sessionStorage + sticky overlay
document.addEventListener('DOMContentLoaded', function () {
  (function resultOverlayPersist() {
    var KEY = '__ayq_last_score__';
    var TTL = 20000; // 20秒は結果を維持
    var lastShown = '';

    function now(){ return Date.now(); }

    function save(text){
      try { sessionStorage.setItem(KEY, JSON.stringify({ text: text, ts: now() })); } catch(e){}
    }
    function load(){
      try {
        var obj = JSON.parse(sessionStorage.getItem(KEY) || 'null');
        if (!obj) return null;
        if (now() - obj.ts > TTL) return null;
        return obj.text || null;
      } catch(e){ return null; }
    }

    function ensureStyle() {
      if (document.getElementById('result-overlay-style')) return;
      var style = document.createElement('style');
      style.id = 'result-overlay-style';
      style.textContent =
        '#result-overlay{position:fixed;left:50%;top:24px;transform:translateX(-50%);' +
        'padding:12px 16px;border-radius:12px;background:#fff;box-shadow:0 6px 24px rgba(0,0,0,.2);' +
        'z-index:2147483647;font-weight:600;line-height:1.4;}' +
        '#result-overlay .close{margin-left:12px;cursor:pointer;border:none;background:transparent;font-size:16px;line-height:1;}' +
        '@media (max-width:480px){#result-overlay{left:8px;right:8px;transform:none;}}';
      document.head.appendChild(style);
    }

    function show(text){
      if (!text) return;
      ensureStyle();
      var div = document.getElementById('result-overlay');
      if (!div) {
        div = document.createElement('div');
        div.id = 'result-overlay';
        var close = document.createElement('button');
        close.className = 'close';
        close.textContent = '×';
        close.addEventListener('click', function(){
          var s=document.getElementById('result-overlay-style'); s&&s.remove();
          div.remove();
          try { sessionStorage.removeItem(KEY); } catch(e){}
        });
        div.appendChild(close);
        document.body.appendChild(div);
      }
      // テキスト更新（既存のspanは入れ替え）
      Array.from(div.querySelectorAll('span')).forEach(function(n){ n.remove(); });
      var span = document.createElement('span');
      span.textContent = text;
      div.insertBefore(span, div.querySelector('.close'));
    }

    function captureFromDom(){
      var el = document.getElementById('score');
      var t = el && (el.textContent || '').trim();
      if (t && t !== lastShown) {
        lastShown = t;
        save(t);     // DOMで見えた瞬間に保存
        show(t);     // すぐ反映
      }
    }

    // 1) 初回：sessionStorageに残っていれば復元（リロードや全消去にも耐える）
    var persisted = load();
    if (persisted) { lastShown = persisted; show(persisted); }

    // 2) 軽量ポーリングで #score を監視して保存＆表示（JSがDOMを書き換えても追従）
    var iv = setInterval(function(){
      captureFromDom();
      // TTLが切れたら自動消去（overlayはcloseで手動でも消せる）
      if (!load()) {
        clearInterval(iv);
        var div = document.getElementById('result-overlay');
        if (div) div.remove();
        var s=document.getElementById('result-overlay-style'); s&&s.remove();
      }
    }, 250);

    // 3) タブ復帰時にも再描画
    document.addEventListener('visibilitychange', function(){
      if (!document.hidden) {
        var again = load();
        if (again) show(again);
      }
    });
  })();
});
