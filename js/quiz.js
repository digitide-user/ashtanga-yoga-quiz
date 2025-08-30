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
    }, 1500);

    // [RANK PATCH] --- begin (do not duplicate) ---
    try {
      const userName = (localStorage.getItem('yogaquiz_username') || '').trim() || '匿名';
      // 利用可能な変数から安全に推定
      const s  = (typeof finalScore !== 'undefined' ? finalScore : (window.__lastScore || window.score || 0));
      const tq = (typeof totalQuestions !== 'undefined' ? totalQuestions : (window.__totalQuestions || 10));
      const entry = {
        name: userName,
        score: Number(s || 0),
        totalQuestions: Number(tq || 10),
        percentage: Math.round((Number(s||0) / Math.max(1, Number(tq||10))) * 100),
        timeSpent: Number(window.__timeSpentSec || window.timeSpentSec || 0)
      };
      if (window.rankingSystem && typeof window.rankingSystem.submitScore === 'function' && !window.rankingSystem.__submittedOnce) {
        window.rankingSystem.submitScore(entry).catch(console.error);
      } else {
        console.warn('[RANK] submitScore not available or already submitted');
      }
    } catch (e) {
      console.error('[RANK] submit hook error', e);
    }
    // [RANK PATCH] --- end ---
}

restartBtn.addEventListener('click', () => {
    // リスタート時にもボタン状態を完全リセット
    resetAllButtonStates();
    
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    
    // 少し遅延してからクイズを再開始
    setTimeout(() => {
        setupQuiz();
    }, 100);
});

shareInstagramBtn.addEventListener('click', () => {
    // IMPORTANT: Replace 'https://example.com/your-game-url' with the actual URL where your game is hosted online.
    // const gameUrl = 'https://example.com/your-game-url'; 

    // IMPORTANT: Replace 'https://example.com/your-share-image.png' with a publicly accessible URL
    // of the image you want to share on Instagram Stories.
    // This could be the Shiva background image, or a custom image you create for sharing results.
    // const imageUrl = 'https://example.com/your-share-image.png'; 

    // Instagram Stories share URL (deep link)
    // 'source_application' is typically an app ID, but for web, it can be a generic identifier.
    const instagramShareUrl = `instagram-stories://share?source_application=web.ashtanga.quiz&content_url=${encodeURIComponent(imageUrl)}&link=${encodeURIComponent(gameUrl)}`;

    window.location.href = instagramShareUrl;
});

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
