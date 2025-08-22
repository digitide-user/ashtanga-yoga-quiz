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

// クイズの質問をシャッフルして準備
function setupQuiz() {
    // 開始時にすべてのボタン状態をクリア
    resetAllButtonStates();
    
    const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
    questions = shuffledQuestions.slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    
    // 少し遅延してからクイズを開始（iOS Safari対応）
    setTimeout(() => {
        loadQuiz();
    }, 100);
}

// iPhone Safari検出（緊急修正：一時的に無効化）
const isIOSSafari = false; // 緊急修正: DOM再作成処理を無効化してボタン表示を優先

// 超強力リセット処理（iPhone Safari 専用）
function forceResetButtonStates() {
    console.log('[DEBUG] Force reset for iPhone Safari');
    
    const container = document.getElementById('options-container');
    if (!container) return;
    
    // 現在のボタンデータを保存
    const currentButtons = Array.from(container.querySelectorAll('button')).map(btn => ({
        text: btn.innerText,
        dataAnswer: btn.getAttribute('data-answer'),
        dataIndex: btn.getAttribute('data-index')
    }));
    
    console.log('[DEBUG] Saved button data:', currentButtons);
    
    // DOM 完全再作成でリセット
    const parent = container.parentNode;
    const newContainer = document.createElement('div');
    newContainer.id = 'options-container';
    newContainer.innerHTML = '';
    
    // 古いコンテナを削除
    parent.removeChild(container);
    
    // 新しいコンテナを追加
    parent.appendChild(newContainer);
    
    // 強制的にブラウザの再描画
    newContainer.offsetHeight;
    
    console.log('[DEBUG] Container recreated');
    
    // グローバル参照を更新
    window.optionsContainer = newContainer;
    
    // ボタンを再作成
    setTimeout(() => {
        currentButtons.forEach((buttonData, index) => {
            const button = document.createElement('button');
            button.innerText = buttonData.text;
            button.className = 'choice-btn';
            button.setAttribute('data-answer', buttonData.dataAnswer);
            button.setAttribute('data-index', buttonData.dataIndex);
            
            // iPhone Safari 専用の初期化
            button.style.cssText = `
                -webkit-tap-highlight-color: transparent !important;
                -webkit-appearance: none !important;
                -webkit-user-select: none !important;
                background-color: rgba(68, 71, 90, 0.8) !important;
                border-color: rgba(248, 248, 242, 0.8) !important;
            `;
            
            // イベント再設定
            button.addEventListener('click', () => {
                console.log(`[DEBUG] iPhone Safari - Button clicked: "${buttonData.dataAnswer}" at index ${index}`);
                
                if (button.disabled) return;
                button.disabled = true;
                
                // すべてのボタンを無効化
                const allChoiceButtons = newContainer.querySelectorAll('button');
                allChoiceButtons.forEach(btn => btn.disabled = true);
                
                // クリック時の視覚的フィードバック
                button.style.cssText += `
                    transform: scale(0.95) !important;
                    background-color: rgba(150, 153, 170, 0.9) !important;
                    border-color: #fff !important;
                `;
                
                setTimeout(() => {
                    checkAnswer(buttonData.dataAnswer, questions[currentQuestionIndex].answer);
                }, 200);
            });
            
            newContainer.appendChild(button);
        });
        
        console.log('[DEBUG] Buttons recreated for iPhone Safari');
    }, 50);
}

// ボタン状態を安全にリセットする専用関数
function resetAllButtonStates() {
    console.log('[DEBUG] Resetting button states...');
    
    // iPhone Safari の場合は超強力リセット
    if (isIOSSafari) {
        console.log('[DEBUG] iPhone Safari detected - using force reset');
        forceResetButtonStates();
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

    // iPhone Safari の場合は完全リセット後に新しいボタンを作成
    if (isIOSSafari) {
        console.log('[DEBUG] iPhone Safari - Force resetting before creating new buttons');
        
        // 前の問題のボタン状態を超強力リセット
        setTimeout(() => {
            resetAllButtonStates();
            
            // リセット完了後に新しい問題を表示
            setTimeout(() => {
                createAndDisplayButtons(currentQuestion);
            }, 100);
        }, 50);
    } else {
        // 通常のブラウザ
        resetAllButtonStates();
        createAndDisplayButtons(currentQuestion);
    }
}

// ボタン作成と表示を分離した関数
function createAndDisplayButtons(currentQuestion) {
    const options = createOptions(currentQuestion.answer);
    
    // iPhone Safari 以外は通常の innerHTML でクリア
    if (!isIOSSafari) {
        optionsContainer.innerHTML = '';
    }
    
    console.log('[DEBUG] Creating buttons for options:', options);
    
    // 選択肢ボタンを作成
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.className = 'choice-btn';
        button.setAttribute('data-answer', option);
        button.setAttribute('data-index', index);
        
        // iPhone Safari 専用の初期化
        if (isIOSSafari) {
            button.style.cssText = `
                -webkit-tap-highlight-color: transparent !important;
                -webkit-appearance: none !important;
                -webkit-user-select: none !important;
                background-color: rgba(68, 71, 90, 0.8) !important;
                border-color: rgba(248, 248, 242, 0.8) !important;
            `;
        } else {
            button.style.webkitTapHighlightColor = 'transparent';
        }
        
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
            if (isIOSSafari) {
                button.style.cssText += `
                    transform: scale(0.95) !important;
                    background-color: rgba(150, 153, 170, 0.9) !important;
                    border-color: #fff !important;
                `;
            } else {
                button.style.transform = 'scale(0.95)';
                button.style.backgroundColor = 'rgba(150, 153, 170, 0.9)';
                button.style.borderColor = '#fff';
            }
            
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
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    scoreElement.innerText = `${questions.length}問中 ${score}問正解！`;

    if (score === 10) {
        rewardElement.innerText = '素晴らしい！あなたはアシュタンガヨガマスターです！これからもスピリチュアルライフを楽しんでくださいね！';
    } else if (score >= 7 && score <= 9) {
        rewardElement.innerText = 'もう一歩でしたね！これからもアシュタンガヨガを楽しみながら継続していきましょう！キーププラクティス！';
    } else if (score >= 4 && score <= 6) {
        rewardElement.innerText = 'ナイスチャレンジ！少しずつアーサナを習得している段階ですね。もっとヨガの世界を探究をしていきましょう！';
    } else {
        rewardElement.innerText = 'ここからが始まりです！焦らなくて大丈夫！まずは一つ一つのアーサナをじっくり味わいながら楽しみましょう！';
    }
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