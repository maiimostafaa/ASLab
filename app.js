// ASLab - ASL Learning Application
// Main JavaScript File

class ASLabApp {
    constructor() {
        // State
        this.hands = null;
        this.camera = null;
        this.serialPort = null;
        this.currentSign = null;
        
        // DOM Elements
        this.elements = {
            connectHardware: document.getElementById('connectHardware'),
            startCamera: document.getElementById('startCamera'),
            webcam: document.getElementById('webcam'),
            output: document.getElementById('output'),
            webcamPlaceholder: document.getElementById('webcamPlaceholder'),
            referenceVideo: document.getElementById('referenceVideo'),
            referencePlaceholder: document.getElementById('referencePlaceholder'),
            successOverlay: document.getElementById('successOverlay'),
            tryAnotherBtn: document.getElementById('tryAnotherBtn'),
            debugConsole: document.getElementById('debugConsole'),
            feedbackMessage: document.getElementById('feedbackMessage'),
            signName: document.getElementById('signName'),
            definition: document.getElementById('definition'),
            description: document.getElementById('description'),
            handshape: document.getElementById('handshape'),
            handIcons: document.getElementById('handIcons')
        };
        
        // Video database
        this.videoDatabase = {
            '1': [
                { video: 'assets/videos/1/deaf.mov', name: 'Deaf', definition: 'Unable to hear or having impaired hearing', description: 'Index finger touches cheek near ear, then moves in small arc to near mouth/chin' },
                { video: 'assets/videos/1/go.mov', name: 'Go', definition: 'To move or travel', description: 'Both index fingers point up near chest, then hands move forward while wrists bend down until fingers point outward' },
                { video: 'assets/videos/1/meet.mov', name: 'Meet', definition: 'To come together or see another person', description: 'Both index fingers start apart and move toward each other until they nearly touch in front of body' },
                { video: 'assets/videos/1/show.mov', name: 'Show', definition: 'To display or present', description: 'Dominant index finger touches center of non-dominant palm, both hands move forward together' },
                { video: 'assets/videos/1/sign.mov', name: 'Sign', definition: 'To communicate using a signed language', description: 'Both index fingers draw large alternating circles in the air, like pedaling a bicycle backward' },
                { video: 'assets/videos/1/start.mov', name: 'Start', definition: 'To begin', description: 'Dominant index finger placed between non-dominant index and middle fingers, then twists like turning a key' },
                { video: 'assets/videos/1/Understand.mov', name: 'Understand', definition: 'To comprehend', description: 'Dominant hand at forehead as fist with bent index finger, then index finger flicks up straight' },
                { video: 'assets/videos/1/cannot.mov', name: 'Cannot', definition: 'Not able to', description: 'Dominant index finger held above non-dominant index finger, strikes downward in cutting motion' },
                { video: 'assets/videos/1/debate.mov', name: 'Debate', definition: 'To discuss or argue', description: 'Dominant index finger taps non-dominant palm, then hands switch and repeat alternately' },
                { video: 'assets/videos/1/hearing.mov', name: 'Hearing', definition: 'Able to hear', description: 'Index finger makes small circular motion near ear or mouth area' },
                { video: 'assets/videos/1/minute.mov', name: 'Minute', definition: 'Unit of time', description: 'Dominant index finger rests against palm of non-dominant hand, moves forward slightly like clock hand' },
                { video: 'assets/videos/1/mouse.mov', name: 'Mouse', definition: 'Small rodent', description: 'Index finger brushes across nose repeatedly, mimicking whiskers twitching' },
                { video: 'assets/videos/1/popcorn.mov', name: 'Popcorn', definition: 'Popped corn snack', description: 'Both index fingers alternate popping up from closed fists, mimicking kernels popping' },
                { video: 'assets/videos/1/promise.mov', name: 'Promise', definition: 'To commit to doing', description: 'Index finger touches mouth, then hand moves down to strike top of non-dominant fist' },
                { video: 'assets/videos/1/thirsty.mov', name: 'Thirsty', definition: 'Needing water', description: 'Index finger traces down throat from chin to chest' }
            ],
            '5': [
                { video: 'assets/videos/5/america.mov', name: 'America', definition: 'The United States', description: 'Both open 5 hands form interlocking circle, move together in circular motion at chest level' },
                { video: 'assets/videos/5/applause.mov', name: 'Applause', definition: 'Clapping hands', description: 'Both open 5 hands held vertically, palms facing each other, rotate wrists quickly back and forth' },
                { video: 'assets/videos/5/calm.mov', name: 'Calm', definition: 'Peaceful and relaxed', description: 'Both open 5 hands start at chest, palms down, move smoothly downward and apart in calming motion' },
                { video: 'assets/videos/5/chat.mov', name: 'Chat', definition: 'To talk casually', description: 'Both open 5 hands face each other in front of body, shake alternately up and down' },
                { video: 'assets/videos/5/color.mov', name: 'Color', definition: 'Visual property', description: 'Open 5 hand at chin with fingers wiggling or fluttering' },
                { video: 'assets/videos/5/deer.mov', name: 'Deer', definition: 'Wild animal with antlers', description: 'Both open 5 hands placed at sides of head like antlers, fingers spread wide' },
                { video: 'assets/videos/5/encourage.mov', name: 'Encourage', definition: 'To give support or confidence', description: 'Both open 5 hands move forward in gentle pushing motion, palms facing outward' },
                { video: 'assets/videos/5/fancy.mov', name: 'Fancy', definition: 'Elegant or elaborate', description: 'Open 5 hand with thumb extended moves upward near face or chest in flourish' },
                { video: 'assets/videos/5/friendly.mov', name: 'Friendly', definition: 'Kind and pleasant', description: 'Both open 5 hands at chest move outward while fingers wiggle, like radiating warmth' },
                { video: 'assets/videos/5/indigenous.mov', name: 'Indigenous', definition: 'Native or original to a region', description: 'Open 5 hand taps or circles chest area, indicating "from here" or "native to"' },
                { video: 'assets/videos/5/loathe.mov', name: 'Loathe', definition: 'To strongly dislike', description: 'Open 5 hand starts at chest or throat, moves outward forcefully with fingers spreading, showing rejection' },
                { video: 'assets/videos/5/movie.mov', name: 'Movie', definition: 'A film or motion picture', description: 'Non-dominant open hand held steady, dominant open 5 hand shakes back and forth against it, mimicking film reel' },
                { video: 'assets/videos/5/sad.mov', name: 'Sad', definition: 'Feeling sorrow or unhappiness', description: 'Both open 5 hands at face with fingers slightly bent, move downward like tears falling' },
                { video: 'assets/videos/5/snow.mov', name: 'Snow', definition: 'Frozen precipitation', description: 'Both open 5 hands start high, wiggle fingers while moving downward in drifting motion' },
                { video: 'assets/videos/5/study.mov', name: 'Study', definition: 'To learn or examine', description: 'Dominant open 5 hand with fingers wiggling moves toward non-dominant palm, like absorbing information' }
            ],
            'A': [
                { video: 'assets/videos/A/actor.mov', name: 'Actor', definition: 'Person who performs', description: 'Both A-fists with thumbs out, alternately brush down sides of chest twice, then sign "person"' },
                { video: 'assets/videos/A/adult.mov', name: 'Adult', definition: 'Grown person', description: 'A-hand thumb touches temple, then moves to touch chin, showing progression from child to adult height' },
                { video: 'assets/videos/A/contest.mov', name: 'Contest', definition: 'Competition', description: 'Both hands in modified A-shape move forward and backward alternately, palms facing each other' },
                { video: 'assets/videos/A/drunk.mov', name: 'Drunk', definition: 'Intoxicated', description: 'A-hand with thumb extended moves toward mouth/face in drinking motion, may sway or circle' },
                { video: 'assets/videos/A/everyday.mov', name: 'Everyday', definition: 'Daily routine', description: 'A-hand brushes down side of cheek/jaw repeatedly, indicating regular repetition' },
                { video: 'assets/videos/A/game.mov', name: 'Game', definition: 'Activity or sport for entertainment', description: 'Both A-hands with knuckles facing each other tap together twice at chest level' },
                { video: 'assets/videos/A/impress.mov', name: 'Impress', definition: 'To make a strong impression', description: 'A-hand moves from forehead outward with strong, emphatic motion' },
                { video: 'assets/videos/A/mountain.mov', name: 'Mountain', definition: 'Large natural elevation', description: 'A-hand or S-hand taps twice (for "rock"), then both hands outline mountain peaks moving upward' },
                { video: 'assets/videos/A/poetry.mov', name: 'Poetry', definition: 'Literary work in verse', description: 'Non-dominant palm up, dominant A-hand swings back and forth above it in rhythmic motion' },
                { video: 'assets/videos/A/remember.mov', name: 'Remember', definition: 'To recall or bring to mind', description: 'Dominant A-hand thumb touches forehead, then moves down to touch thumb of non-dominant A-hand' },
                { video: 'assets/videos/A/romantic.mov', name: 'Romantic', definition: 'Relating to love or romance', description: 'A-hand circles over heart area, indicating romantic feelings' },
                { video: 'assets/videos/A/suffer.mov', name: 'Suffer', definition: 'To experience pain or hardship', description: 'A-hand twists at mouth or chin area, showing distress or pain' },
                { video: 'assets/videos/A/together.mov', name: 'Together', definition: 'With or in proximity to another', description: 'Both A-hands with thumbs up move in circle together, staying connected' },
                { video: 'assets/videos/A/turtle.mov', name: 'Turtle', definition: 'Reptile with a shell', description: 'Non-dominant curved hand covers dominant A-hand, thumb wiggles out like turtle head from shell' },
                { video: 'assets/videos/A/vanish.mov', name: 'Vanish', definition: 'To disappear suddenly', description: 'A-hand or 5-hand closes into fist while pulling away or downward quickly' }
            ],
            'B': [
                { video: 'assets/videos/B/auction.mov', name: 'Auction', definition: 'Public sale', description: 'B-hand moves upward in quick, repeated motions like raising a bidding paddle' },
                { video: 'assets/videos/B/basic.mov', name: 'Basic', definition: 'Fundamental', description: 'Dominant B-hand brushes under non-dominant B-hand, indicating foundation or base level' },
                { video: 'assets/videos/B/behave.mov', name: 'Behave', definition: 'To act properly', description: 'Both B-hands palms down in neutral space, move side to side together in controlled motion' },
                { video: 'assets/videos/B/bet.mov', name: 'Bet', definition: 'To wager', description: 'Both B-hands move from chest outward and downward, like placing a bet on table' },
                { video: 'assets/videos/B/brown.mov', name: 'Brown', definition: 'Color', description: 'B-hand slides down side of cheek, indicating brown color' },
                { video: 'assets/videos/B/creative.mov', name: 'Creative', definition: 'Having imagination or originality', description: 'B-hand or 4-hand moves upward from forehead in flowing, artistic motion' },
                { video: 'assets/videos/B/curtain.mov', name: 'Curtain', definition: 'Window covering', description: 'Both B-hands start together above, separate and move downward like opening curtains' },
                { video: 'assets/videos/B/envy.mov', name: 'Envy', definition: 'Desire for what others have', description: 'B-hand near mouth with fingers biting or showing tension, may move slightly' },
                { video: 'assets/videos/B/ignore.mov', name: 'Ignore', definition: 'To disregard or pay no attention', description: 'B-hand starts near face, then sweeps away dismissively to side' },
                { video: 'assets/videos/B/pretend.mov', name: 'Pretend', definition: 'To act as if something is true', description: 'B-hand moves from behind shoulder forward past face, like pulling out false front' },
                { video: 'assets/videos/B/schedule.mov', name: 'Schedule', definition: 'Plan or timetable', description: 'Dominant B-hand slides down non-dominant palm from fingers to wrist, outlining a list' },
                { video: 'assets/videos/B/sprinkler.mov', name: 'Sprinkler', definition: 'Device that sprays water', description: 'B-hand or 5-hand twists back and forth while moving across space, mimicking water spray' },
                { video: 'assets/videos/B/straight.mov', name: 'Straight', definition: 'Direct or not curved', description: 'B-hand moves forward in direct line from chest outward, emphasizing straight path' },
                { video: 'assets/videos/B/talk.mov', name: 'Talk', definition: 'To speak or communicate', description: 'Index fingers or B-hands alternate moving forward from mouth, like words coming out' },
                { video: 'assets/videos/B/trouble.mov', name: 'Trouble', definition: 'Difficulty or problems', description: 'Both B-hands palms facing each other in neutral space, alternate bending down at wrists repeatedly' }
            ],
            'S': [
                { video: 'assets/videos/S/accident.mov', name: 'Accident', definition: 'Unplanned event', description: 'Both hands start as open 5, then change to S-fists while moving together, representing collision' },
                { video: 'assets/videos/S/adopt.mov', name: 'Adopt', definition: 'To take as one\'s own', description: 'Both S-hands move from outward position toward chest, gathering inward like bringing something to yourself' },
                { video: 'assets/videos/S/age.mov', name: 'Age', definition: 'How old someone is', description: 'S-hand placed under chin, pulls down and forward in arc, like pulling a beard' },
                { video: 'assets/videos/S/baseball.mov', name: 'Baseball', definition: 'Sport', description: 'Both S-hands positioned like holding bat, swing forward and across body in batting motion' },
                { video: 'assets/videos/S/brave.mov', name: 'Brave', definition: 'Courageous', description: 'Both hands start as loose claws near shoulders, move forward while changing to S-fists, showing strength' },
                { video: 'assets/videos/S/break.mov', name: 'Break', definition: 'To separate', description: 'Both S-hands together, twist apart forcefully as if snapping something in half' },
                { video: 'assets/videos/S/car.mov', name: 'Car', definition: 'Vehicle', description: 'Both S-hands move alternately as if steering a wheel, mimicking driving motion' },
                { video: 'assets/videos/S/coffee.mov', name: 'Coffee', definition: 'Caffeinated beverage', description: 'Dominant S-fist circles on top of non-dominant S-fist, like grinding coffee beans' },
                { video: 'assets/videos/S/common sense.mov', name: 'Common Sense', definition: 'Sound practical judgment', description: 'S-hand or open hand taps side of forehead, indicating thinking or knowledge' },
                { video: 'assets/videos/S/freedom.mov', name: 'Freedom', definition: 'Liberty', description: 'Both S-fists start crossed at wrists in front of chest, twist apart and upward with palms turning outward' },
                { video: 'assets/videos/S/love.mov', name: 'Love', definition: 'Strong affection', description: 'Both S-fists cross over chest/heart with palms facing inward, like hugging yourself' },
                { video: 'assets/videos/S/make.mov', name: 'Make', definition: 'To create or produce', description: 'Both S-hands tap together with twisting motion, one on top of other, like crafting or building' },
                { video: 'assets/videos/S/practice.mov', name: 'Practice', definition: 'To rehearse or exercise', description: 'Dominant A or S-fist brushes back and forth across non-dominant index finger repeatedly' },
                { video: 'assets/videos/S/sorry.mov', name: 'Sorry', definition: 'Feeling regret or apology', description: 'S-fist circles on chest over heart, showing remorse or apology' },
                { video: 'assets/videos/S/work.mov', name: 'Work', definition: 'Labor or job', description: 'Dominant S-fist taps wrist of non-dominant S-fist repeatedly, like hammering or working' }
            ]
        };
        
        // Motion tracking for sign recognition
        this.motionHistoryLeft = [];
        this.motionHistoryRight = [];
        this.motionHistoryLength = 60;
        this.isSigningCorrectly = false;
        this.leftHandLandmarks = null;
        this.rightHandLandmarks = null;
        
        // Initialize
        this.init();
    }
    
    init() {
        this.log('ASLab initializing...');
        this.setupEventListeners();
        this.initMediaPipe();
    }
    
    setupEventListeners() {
        if (this.elements.connectHardware) {
            this.elements.connectHardware.addEventListener('click', () => this.connectHardware());
        }
        
        if (this.elements.startCamera) {
            this.elements.startCamera.addEventListener('click', () => this.startCamera());
        }
        
        if (this.elements.tryAnotherBtn) {
            this.elements.tryAnotherBtn.addEventListener('click', () => this.hideSuccessAndLoadNew());
        }
        
        const handIcons = this.elements.handIcons.querySelectorAll('.hand-icon');
        handIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const handshape = icon.dataset.handshape;
                this.loadRandomSign(handshape);
            });
        });
        
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            const handshapeMap = {'1': '1', '5': '5', 'a': 'A', 's': 'S', 'b': 'B'};
            if (handshapeMap[key]) {
                this.loadRandomSign(handshapeMap[key]);
            }
        });
    }
    
    initMediaPipe() {
        this.log('Initializing MediaPipe Hands...');
        
        this.hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });
        
        this.hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        
        this.hands.onResults((results) => this.onHandsResults(results));
        
        this.log('MediaPipe Hands initialized');
    }
    
    async startCamera() {
        try {
            this.log('Starting camera...');
            
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 }
            });
            
            this.elements.webcam.srcObject = stream;
            this.elements.webcamPlaceholder.classList.add('hidden');
            this.elements.startCamera.disabled = true;
            this.elements.startCamera.textContent = 'Camera Active';
            
            const canvas = this.elements.output;
            const video = this.elements.webcam;
            
            video.addEventListener('loadedmetadata', () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                // Ensure canvas is visible and has proper context
                canvas.style.display = 'block';
                this.log(`Canvas dimensions set: ${canvas.width}x${canvas.height}`);
            });
            
            this.camera = new Camera(this.elements.webcam, {
                onFrame: async () => {
                    await this.hands.send({ image: this.elements.webcam });
                },
                width: 1280,
                height: 720
            });
            
            this.camera.start();
            this.log('Camera started successfully');
            
        } catch (error) {
            this.log(`Camera error: ${error.message}`, 'error');
            alert('Could not access camera. Please check permissions.');
        }
    }
    
    onHandsResults(results) {
        const canvas = this.elements.output;
        const ctx = canvas.getContext('2d');
        
        // Ensure canvas has dimensions set
        if (canvas.width === 0 || canvas.height === 0) {
            const video = this.elements.webcam;
            if (video.videoWidth && video.videoHeight) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            }
        }
        
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.leftHandLandmarks = null;
        this.rightHandLandmarks = null;
        
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            results.multiHandLandmarks.forEach((landmarks, index) => {
                this.drawHandLandmarks(ctx, landmarks, index);
                
                if (results.multiHandedness && results.multiHandedness[index]) {
                    const handedness = results.multiHandedness[index].label;
                    
                    if (handedness === 'Right') {
                        this.leftHandLandmarks = landmarks;
                    } else {
                        this.rightHandLandmarks = landmarks;
                    }
                }
            });
            
            if (this.currentSign) {
                this.analyzeHands(this.leftHandLandmarks, this.rightHandLandmarks);
            }
        } else {
            this.leftHandLandmarks = null;
            this.rightHandLandmarks = null;
            
            if (this.currentSign) {
                this.elements.feedbackMessage.textContent = 'No hands detected. Please position your hands clearly in the camera view.';
            }
        }
        
        ctx.restore();
    }
    
    drawHandLandmarks(ctx, landmarks, handIndex = 0) {
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        
        const isSecondHand = handIndex === 1;
        const lineColor = isSecondHand ? '#00ffff' : '#00ff00';
        const pointColor = isSecondHand ? '#00ffff' : '#00ff00';
        
        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4],
            [0, 5], [5, 6], [6, 7], [7, 8],
            [0, 9], [9, 10], [10, 11], [11, 12],
            [0, 13], [13, 14], [14, 15], [15, 16],
            [0, 17], [17, 18], [18, 19], [19, 20],
            [5, 9], [9, 13], [13, 17]
        ];
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 4;
        ctx.shadowColor = lineColor;
        ctx.shadowBlur = 8;
        
        connections.forEach(([start, end]) => {
            const startPoint = landmarks[start];
            const endPoint = landmarks[end];
            
            ctx.beginPath();
            ctx.moveTo(startPoint.x * canvasWidth, startPoint.y * canvasHeight);
            ctx.lineTo(endPoint.x * canvasWidth, endPoint.y * canvasHeight);
            ctx.stroke();
        });
        
        ctx.shadowBlur = 10;
        landmarks.forEach((landmark, index) => {
            const x = landmark.x * canvasWidth;
            const y = landmark.y * canvasHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = index === 0 ? '#ff0000' : pointColor;
            ctx.shadowColor = index === 0 ? '#ff0000' : pointColor;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.stroke();
        });
        
        ctx.shadowBlur = 0;
    }
    
    loadRandomSign(handshape) {
        const videos = this.videoDatabase[handshape];
        if (!videos || videos.length === 0) {
            this.log(`No videos found for handshape: ${handshape}`, 'warning');
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * videos.length);
        const signData = videos[randomIndex];
        
        this.currentSign = {
            ...signData,
            handshape: handshape
        };
        
        this.elements.signName.textContent = signData.name;
        this.elements.definition.textContent = signData.definition;
        this.elements.description.textContent = signData.description || `Using ${handshape} handshape`;
        this.elements.handshape.textContent = handshape;
        
        this.elements.referenceVideo.src = signData.video;
        this.elements.referenceVideo.classList.add('active');
        this.elements.referencePlaceholder.classList.add('hidden');
        
        this.highlightHandshapeIcon(handshape);
        
        this.motionHistoryLeft = [];
        this.motionHistoryRight = [];
        this.isSigningCorrectly = false;
        this.leftHandLandmarks = null;
        this.rightHandLandmarks = null;
        this.hideSuccess();
        
        this.elements.feedbackMessage.textContent = 'Watch the reference video and copy the sign with movement.';
        
        this.log(`Loaded random sign: ${signData.name} (Handshape: ${handshape})`);
    }
    
    highlightHandshapeIcon(handshape) {
        const icons = this.elements.handIcons.querySelectorAll('.hand-icon');
        icons.forEach(icon => {
            if (icon.dataset.handshape === handshape) {
                icon.classList.add('highlighted');
            } else {
                icon.classList.remove('highlighted');
            }
        });
    }
    
    flashHandshapeButton(handshape) {
        const icons = this.elements.handIcons.querySelectorAll('.hand-icon');
        icons.forEach(icon => {
            if (icon.dataset.handshape === handshape) {
                // Add press animation
                icon.classList.add('hardware-pressed');
                setTimeout(() => {
                    icon.classList.remove('hardware-pressed');
                }, 300);
            }
        });
    }
    
    analyzeHands(leftHand, rightHand) {
        if (!this.currentSign) return;
        
        const handshape = this.currentSign.handshape;
        
        if (leftHand) {
            const wristLeft = leftHand[0];
            this.motionHistoryLeft.push({
                timestamp: Date.now(),
                position: { x: wristLeft.x, y: wristLeft.y, z: wristLeft.z },
                landmarks: leftHand
            });
            if (this.motionHistoryLeft.length > this.motionHistoryLength) {
                this.motionHistoryLeft.shift();
            }
        }
        
        if (rightHand) {
            const wristRight = rightHand[0];
            this.motionHistoryRight.push({
                timestamp: Date.now(),
                position: { x: wristRight.x, y: wristRight.y, z: wristRight.z },
                landmarks: rightHand
            });
            if (this.motionHistoryRight.length > this.motionHistoryLength) {
                this.motionHistoryRight.shift();
            }
        }
        
        const dominantHand = rightHand || leftHand;
        
        if (dominantHand) {
            const motionHistory = rightHand ? this.motionHistoryRight : this.motionHistoryLeft;
            const result = this.analyzeSignMotionTwoHanded(handshape, leftHand, rightHand, motionHistory);
            
            this.elements.feedbackMessage.textContent = result.feedback.join(' ');
            
            if (result.completed && !this.isSigningCorrectly) {
                this.isSigningCorrectly = true;
                this.showSuccess();
            }
        }
    }
    
    analyzeSignMotionTwoHanded(handshape, leftHand, rightHand, primaryMotionHistory) {
        let feedback = [];
        let completed = false;
        
        const isTwoHanded = leftHand && rightHand;
        const dominantHand = rightHand || leftHand;
        const shapeCheck = this.checkHandshape(handshape, dominantHand);
        
        if (isTwoHanded) {
            const leftShapeCheck = this.checkHandshape(handshape, leftHand);
            const rightShapeCheck = this.checkHandshape(handshape, rightHand);
            
            if (!leftShapeCheck.correct || !rightShapeCheck.correct) {
                const combinedFeedback = [];
                if (!leftShapeCheck.correct) combinedFeedback.push('Left hand: ' + leftShapeCheck.feedback.join(' '));
                if (!rightShapeCheck.correct) combinedFeedback.push('Right hand: ' + rightShapeCheck.feedback.join(' '));
                return { feedback: combinedFeedback, completed: false };
            }
        } else if (!shapeCheck.correct) {
            return { feedback: shapeCheck.feedback, completed: false };
        }
        
        const primaryMotion = this.calculateMotionMetricsFromHistory(primaryMotionHistory);
        const secondaryMotion = isTwoHanded ? this.calculateMotionMetricsFromHistory(
            leftHand === dominantHand ? this.motionHistoryRight : this.motionHistoryLeft
        ) : null;
        
        const bothHandsMoving = isTwoHanded ? (primaryMotion.isMoving && secondaryMotion.isMoving) : primaryMotion.isMoving;
        
        if (isTwoHanded) {
            feedback.push('Great! Both hands detected.');
            
            if (bothHandsMoving) {
                feedback.push('Good! Keep both hands in motion with the correct handshape.');
                
                if (primaryMotion.frameCount > 30 && secondaryMotion.frameCount > 30) {
                    feedback.push('Excellent! You completed the two-handed sign!');
                    completed = true;
                } else {
                    const minFrames = Math.min(primaryMotion.frameCount, secondaryMotion.frameCount);
                    feedback.push(`Continue... ${Math.floor((30 - minFrames) / 6)} more seconds.`);
                }
            } else {
                feedback.push('Move both hands together to perform the sign.');
            }
        } else {
            if (handshape === '1') {
                if (primaryMotion.isMoving) {
                    feedback.push('Good! Keep your index finger extended while moving.');
                    
                    if (primaryMotion.averageSpeed > 0.01 && primaryMotion.averageSpeed < 0.1) {
                        if (primaryMotion.frameCount > 30) {
                            feedback.push('Excellent motion! You completed the sign correctly!');
                            completed = true;
                        } else {
                            feedback.push(`Continue the motion... ${Math.floor((30 - primaryMotion.frameCount) / 6)} more seconds.`);
                        }
                    } else if (primaryMotion.averageSpeed >= 0.1) {
                        feedback.push('Slow down your movement a bit.');
                    } else {
                        feedback.push('Move your hand more - signs have motion!');
                    }
                } else {
                    feedback.push('Good handshape! Now perform the sign with movement.');
                }
            }
            else if (handshape === '5') {
                if (primaryMotion.isMoving) {
                    feedback.push('Good! Keep all fingers spread while moving.');
                    
                    if (primaryMotion.rangeOfMotion > 0.15) {
                        if (primaryMotion.frameCount > 25) {
                            feedback.push('Great! You matched the sign motion!');
                            completed = true;
                        } else {
                            feedback.push(`Keep going! ${Math.floor((25 - primaryMotion.frameCount) / 6)} more seconds.`);
                        }
                    } else {
                        feedback.push('Make your movements bigger and more expressive.');
                    }
                } else {
                    feedback.push('Perfect handshape! Now add the signing motion.');
                }
            }
            else if (handshape === 'A') {
                if (primaryMotion.isMoving) {
                    feedback.push('Good fist shape! Continue the movement.');
                    
                    if (primaryMotion.frameCount > 30) {
                        feedback.push('Perfect! Sign completed successfully!');
                        completed = true;
                    } else {
                        feedback.push(`Almost there! ${Math.floor((30 - primaryMotion.frameCount) / 6)} more seconds.`);
                    }
                } else {
                    feedback.push('Correct handshape! Now perform the sign with motion.');
                }
            }
            else if (handshape === 'B') {
                if (primaryMotion.isMoving) {
                    feedback.push('Keep fingers together and flat while moving.');
                    
                    if (primaryMotion.averageSpeed > 0.01 && primaryMotion.frameCount > 30) {
                        feedback.push('Excellent! You completed the sign!');
                        completed = true;
                    } else if (primaryMotion.frameCount <= 30) {
                        feedback.push(`Continue... ${Math.floor((30 - primaryMotion.frameCount) / 6)} more seconds.`);
                    } else {
                        feedback.push('Add some movement to complete the sign.');
                    }
                } else {
                    feedback.push('Good handshape! Now move your hand to sign.');
                }
            }
            else if (handshape === 'S') {
                if (primaryMotion.isMoving) {
                    feedback.push('Good fist! Keep moving to complete the sign.');
                    
                    if (primaryMotion.frameCount > 30) {
                        feedback.push('Perfect! Sign completed!');
                        completed = true;
                    } else {
                        feedback.push(`Keep signing! ${Math.floor((30 - primaryMotion.frameCount) / 6)} more seconds.`);
                    }
                } else {
                    feedback.push('Correct fist shape! Now add the signing motion.');
                }
            }
        }
        
        return { feedback, completed };
    }
    
    checkHandshape(handshape, landmarks) {
        let feedback = [];
        let correct = false;
        
        if (handshape === '1') {
            const indexExtended = this.isFingerExtended(landmarks, 8, 6, 5);
            const middleCurled = !this.isFingerExtended(landmarks, 12, 10, 9);
            const ringCurled = !this.isFingerExtended(landmarks, 16, 14, 13);
            const pinkyCurled = !this.isFingerExtended(landmarks, 20, 18, 17);
            
            // Additional strict check: index must be significantly farther than others
            const indexDist = Math.sqrt(
                Math.pow(landmarks[8].x - landmarks[0].x, 2) +
                Math.pow(landmarks[8].y - landmarks[0].y, 2)
            );
            const otherFingersDist = [12, 16, 20].map(tip => 
                Math.sqrt(
                    Math.pow(landmarks[tip].x - landmarks[0].x, 2) +
                    Math.pow(landmarks[tip].y - landmarks[0].y, 2)
                )
            );
            const indexIsDominant = otherFingersDist.every(d => indexDist > d * 1.3);
            
            if (!indexExtended) feedback.push('Extend your index finger.');
            if (!middleCurled) feedback.push('Curl your middle finger down.');
            if (!ringCurled) feedback.push('Curl your ring finger down.');
            if (!pinkyCurled) feedback.push('Curl your pinky finger down.');
            
            // Require ALL conditions: index extended AND other fingers curled AND index dominant
            correct = indexExtended && middleCurled && ringCurled && pinkyCurled && indexIsDominant;
        }
        else if (handshape === '5') {
            const allExtended = [8, 12, 16, 20].every(tip => 
                this.isFingerExtended(landmarks, tip, tip - 2, tip - 3)
            );
            const thumbExtended = this.isFingerExtended(landmarks, 4, 3, 2);
            
            const allFingersSpread = [4, 8, 12, 16, 20].every(tip => {
                const dist = Math.sqrt(
                    Math.pow(landmarks[tip].x - landmarks[0].x, 2) +
                    Math.pow(landmarks[tip].y - landmarks[0].y, 2)
                );
                return dist > 0.15;
            });
            
            if (!allExtended && !allFingersSpread) feedback.push('Spread all fingers out wide.');
            if (!thumbExtended && !allFingersSpread) feedback.push('Extend your thumb out.');
            
            correct = (allExtended && thumbExtended) || allFingersSpread;
        }
        else if (handshape === 'A') {
            const fingersCurled = [8, 12, 16, 20].every(tip =>
                !this.isFingerExtended(landmarks, tip, tip - 2, tip - 3)
            );
            
            const thumbSide = Math.abs(landmarks[4].x - landmarks[2].x) > 0.02 ||
                              landmarks[4].y < landmarks[2].y;
            
            if (!fingersCurled) feedback.push('Curl all fingers into your palm.');
            if (!thumbSide) feedback.push('Place your thumb on the side of your fist.');
            
            correct = fingersCurled && thumbSide;
        }
        else if (handshape === 'B') {
            const fingersExtended = [8, 12, 16, 20].every(tip =>
                this.isFingerExtended(landmarks, tip, tip - 2, tip - 3)
            );
            
            const fingerDistances = [
                Math.abs(landmarks[8].x - landmarks[12].x) + Math.abs(landmarks[8].y - landmarks[12].y),
                Math.abs(landmarks[12].x - landmarks[16].x) + Math.abs(landmarks[12].y - landmarks[16].y),
                Math.abs(landmarks[16].x - landmarks[20].x) + Math.abs(landmarks[16].y - landmarks[20].y)
            ];
            const fingersTogether = fingerDistances.every(d => d < 0.08);
            
            const thumbTucked = landmarks[4].y > landmarks[5].y ||
                               Math.abs(landmarks[4].x - landmarks[5].x) < 0.05;
            
            if (!fingersExtended) feedback.push('Extend all four fingers straight.');
            if (!fingersTogether) feedback.push('Keep your fingers together.');
            if (!thumbTucked) feedback.push('Tuck your thumb across your palm.');
            
            correct = fingersExtended && fingersTogether && thumbTucked;
        }
        else if (handshape === 'S') {
            const fingersCurled = [8, 12, 16, 20].every(tip =>
                !this.isFingerExtended(landmarks, tip, tip - 2, tip - 3)
            );
            
            const fingersInPalm = [8, 12, 16, 20].every(tip => {
                const tipToWrist = Math.sqrt(
                    Math.pow(landmarks[tip].x - landmarks[0].x, 2) +
                    Math.pow(landmarks[tip].y - landmarks[0].y, 2)
                );
                const knuckleToWrist = Math.sqrt(
                    Math.pow(landmarks[tip - 2].x - landmarks[0].x, 2) +
                    Math.pow(landmarks[tip - 2].y - landmarks[0].y, 2)
                );
                return tipToWrist < knuckleToWrist * 1.2;
            });
            
            const avgFingerPos = {
                x: ([8, 12, 16, 20].reduce((sum, i) => sum + landmarks[i].x, 0)) / 4,
                y: ([8, 12, 16, 20].reduce((sum, i) => sum + landmarks[i].y, 0)) / 4
            };
            
            const thumbToFingers = Math.sqrt(
                Math.pow(landmarks[4].x - avgFingerPos.x, 2) +
                Math.pow(landmarks[4].y - avgFingerPos.y, 2)
            );
            
            const thumbOverFingers = thumbToFingers < 0.12;
            
            if (!fingersCurled && !fingersInPalm) feedback.push('Make a fist with all fingers curled.');
            if (!thumbOverFingers) feedback.push('Place your thumb over your curled fingers.');
            
            correct = (fingersCurled || fingersInPalm) && thumbOverFingers;
        }
        
        return { correct, feedback };
    }
    
    isFingerExtended(landmarks, tipIdx, middleIdx, baseIdx) {
        const tip = landmarks[tipIdx];
        const middle = landmarks[middleIdx];
        const base = landmarks[baseIdx];
        
        const tipToMiddle = Math.sqrt(Math.pow(tip.x - middle.x, 2) + Math.pow(tip.y - middle.y, 2));
        const middleToBase = Math.sqrt(Math.pow(middle.x - base.x, 2) + Math.pow(middle.y - base.y, 2));
        const tipToBase = Math.sqrt(Math.pow(tip.x - base.x, 2) + Math.pow(tip.y - base.y, 2));
        
        return tipToBase > (tipToMiddle + middleToBase) * 0.8;
    }
    
    calculateMotionMetricsFromHistory(motionHistory) {
        if (motionHistory.length < 10) {
            return { isMoving: false, averageSpeed: 0, rangeOfMotion: 0, frameCount: 0 };
        }
        
        let totalSpeed = 0;
        let speedSamples = 0;
        
        for (let i = 1; i < motionHistory.length; i++) {
            const prev = motionHistory[i - 1].position;
            const curr = motionHistory[i].position;
            
            const dx = curr.x - prev.x;
            const dy = curr.y - prev.y;
            const dz = curr.z - prev.z;
            
            const speed = Math.sqrt(dx * dx + dy * dy + dz * dz);
            totalSpeed += speed;
            speedSamples++;
        }
        
        const averageSpeed = totalSpeed / speedSamples;
        
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        
        motionHistory.forEach(frame => {
            minX = Math.min(minX, frame.position.x);
            maxX = Math.max(maxX, frame.position.x);
            minY = Math.min(minY, frame.position.y);
            maxY = Math.max(maxY, frame.position.y);
        });
        
        const rangeX = maxX - minX;
        const rangeY = maxY - minY;
        const rangeOfMotion = Math.sqrt(rangeX * rangeX + rangeY * rangeY);
        
        const recentFrames = motionHistory.slice(-10);
        let recentSpeed = 0;
        for (let i = 1; i < recentFrames.length; i++) {
            const prev = recentFrames[i - 1].position;
            const curr = recentFrames[i].position;
            const dx = curr.x - prev.x;
            const dy = curr.y - prev.y;
            const dz = curr.z - prev.z;
            recentSpeed += Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        recentSpeed /= (recentFrames.length - 1);
        
        const isMoving = recentSpeed > 0.005;
        const frameCount = motionHistory.length;
        
        return { isMoving, averageSpeed, rangeOfMotion, frameCount };
    }
    
    showSuccess() {
        this.elements.successOverlay.classList.add('active');
    }
    
    hideSuccess() {
        this.elements.successOverlay.classList.remove('active');
    }
    
    hideSuccessAndLoadNew() {
        this.hideSuccess();
        if (this.currentSign) {
            this.loadRandomSign(this.currentSign.handshape);
        }
    }
    
    async connectHardware() {
        // Check if Web Serial API is supported
        if (!navigator.serial) {
            alert('Web Serial API is not supported in this browser.\n\nPlease use:\n• Google Chrome\n• Microsoft Edge\n• Opera\n\nSafari does not support Web Serial API.');
            this.log('Web Serial API not supported', 'error');
            return;
        }
        
        try {
            this.log('Requesting serial port...');
            this.serialPort = await navigator.serial.requestPort();
            
            // Try to open with CircuitPython default settings
            this.log('Opening serial port with baudRate: 115200...');
            await this.serialPort.open({ 
                baudRate: 115200,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
                bufferSize: 255,
                flowControl: 'none'
            });
            
            this.elements.connectHardware.textContent = 'Disconnect Hardware';
            this.elements.connectHardware.onclick = () => this.disconnectHardware();
            
            this.log('Serial port connected successfully');
            this.readSerialData();
            
        } catch (error) {
            this.log(`Serial connection error: ${error.message}`, 'error');
            
            // Provide specific error messages
            if (error.name === 'NotFoundError') {
                alert('No serial port selected.\n\nClick "Connect Hardware" again and select your CircuitPython board from the list.');
            } else if (error.name === 'InvalidStateError' || error.message.includes('Failed to open')) {
                alert('⚠️ Serial port is already in use!\n\n✅ SOLUTION:\n1. Close Thonny, Mu Editor, or any serial monitor\n2. Unplug your board from USB\n3. Wait 3 seconds\n4. Plug it back in\n5. Try connecting again\n\nThe port cannot be shared between multiple apps.');
            } else if (error.message.includes('aborted')) {
                // User cancelled the dialog, just log it
                this.log('Connection cancelled by user');
            } else {
                alert(`Could not connect to hardware.\n\nError: ${error.message}\n\nTroubleshooting:\n• Unplug and replug your board\n• Close all other serial apps\n• Try a different USB cable\n• Restart your browser`);
            }
        }
    }
    
    async disconnectHardware() {
        try {
            if (this.serialPort && this.serialPort.readable) {
                const reader = this.serialPort.readable.getReader();
                await reader.cancel();
                reader.releaseLock();
            }
            
            if (this.serialPort) {
                await this.serialPort.close();
                this.serialPort = null;
            }
            
            this.elements.connectHardware.textContent = 'Connect Hardware';
            this.elements.connectHardware.onclick = () => this.connectHardware();
            
            this.log('Hardware disconnected');
        } catch (error) {
            this.log(`Disconnect error: ${error.message}`, 'error');
        }
    }
    
    async readSerialData() {
        const reader = this.serialPort.readable.getReader();
        
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                const text = new TextDecoder().decode(value);
                this.log(`Serial data: ${text}`);
                
                const match = text.match(/Pin\s+(\d+)/i);
                if (match) {
                    const pinNumber = match[1];
                    const pinMap = {'3': '1', '5': 'A', '7': 'B', '9': 'S', '8': '5'};
                    if (pinMap[pinNumber]) {
                        const handshape = pinMap[pinNumber];
                        this.loadRandomSign(handshape);
                        this.flashHandshapeButton(handshape);
                    }
                }
            }
        } catch (error) {
            this.log(`Serial read error: ${error.message}`, 'error');
        } finally {
            reader.releaseLock();
        }
    }
    
    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = type === 'error' ? '[ERROR]' : type === 'warning' ? '[WARN]' : '[INFO]';
        const color = type === 'error' ? '#ff4444' : type === 'warning' ? '#ff9800' : '#00ff00';
        
        const logEntry = document.createElement('div');
        logEntry.style.color = color;
        logEntry.textContent = `${timestamp} ${prefix} ${message}`;
        
        this.elements.debugConsole.appendChild(logEntry);
        this.elements.debugConsole.scrollTop = this.elements.debugConsole.scrollHeight;
        
        console.log(`${prefix} ${message}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.aslabApp = new ASLabApp();
});
