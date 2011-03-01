var guardMsgs = {
    Greeting: "Halt!!! Where do you think you're going?!? Only practitioners of the art of maths are allowed here, if you wanna enter the dojo you must first PROVE YOURSELF!",
    Score: ["HAHA! Take that!", "Who's your daddy!", "I'm the king of the world! WOOOOOOO"],
    Concede: ["What!?", "No way!!", "Get outta here!!", "That's a fluke!", "YOU..."],
    Victory: "I can't believe it! I did it! HAHAHAHAHAHA... now leave! And don't come back!!",
    Defeat: "Oh man... now I'm gonna get scolded again..."
};

var guard = {
    Name: "Guard",
    Hp: 5,
    HpMax: 5,
    Level: 5,
    ImagePath: "images/guard.png",
    Messages: guardMsgs,
    TimeLimitPerQuestion: 15
};

var sumoMsgs = {
    Greeting: "Ho Ho Ho, come on in. My name is Sumo, I'll be your next opponent, defeat me and you can continue to the next room. I warn you though, it's easier said than done!",
    Score: ["Not too shabby, am I?", "You sure you wanna continue?", "You wanna take a break?", "Are you ok, son?", "Ready for another one?"],
    Concede: ["V~e~r~y nice!", "Now that's a mean kick!", "Well done!", "You certainly have potential.", "Not bad! Keep going."],
    Victory: "Oh unluky! That was so very close! Don't give up my boy, maybe you'll have better luck next time.",
    Defeat: "Wow, you surprised me! Go on, you're free to go to the next room, be prepared though, tougher tests awaits you. Now, time for some snacks after all that workout!"
};

var sumo = {
    Name: "Sumo",
    Hp: 10,
    HpMax: 10,
    Level: 6,
    ImagePath: "images/sumo.png",
    Messages: sumoMsgs,
    TimeLimitPerQuestion: 15
};

var samuraiMsgs = {
    Greeting: "Hi, the name's rai, samu rai... (sorry I always wanted to do that..) I'm your next opponent, and I must warn you first, I'm quick, very quick in fact, so you better be prepared! Here~we~GO!!",
    Score: ["HA YA GAAAAAAA!!!!", "SLASH SLASH!! KA-BANG!!!", "KA-CHING...", "I'll show no mercy..", "A fight...to the math.."],
    Concede: ["Grrrr!", "AGAIN!!", "Impossible...", "I'm not finished yet!", "You'll pay for this!!"],
    Victory: "I win. Don't cry, there's no shame in losing to a stronger fighter.",
    Defeat: "I lost... I the great samurai of the Math DOJO... go.. you're through to the next room.."
};

var samurai = {
    Name: "Samurai",
    Hp: 15,
    HpMax: 15,
    Level: 6,
    ImagePath: "images/samurai.png",
    Messages: samuraiMsgs,
    TimeLimitPerQuestion: 10
};

var karateTeacherMsgs = {
    Greeting: "HelloHello,MyNameIsShinji,YouMustBeTheNewChallengerEveryone'sTalkingAbout!PleasedToMeetYou.What'sThat?YouDon'tUnderstandMe?mm..ISee..YouMustNotBeFromAroundHere..",
    Score: ["AkiZuki!(uppercut)", "KizamiZuki!(jab punch)", "MaeGeri!!(front kick)", "YokoGeri!!(side kick)", "HizaGeri!!(knee kick)", "KinGeri!!!!(groin kick...)"],
    Concede: ["Ouch!", "Double Ouch!!", "Ouch Ouch!!", "That hurt..."],
    Victory: "WellYouCertainlyPutUpAGoodFight,SorryICan'tLetYouPass,DoComeBackAgainMaybeYou'llHaveBetterLuckNextTime!GoodBye!",
    Defeat: "OhMyWordYouBeatMe,NowHowTheHellDidThatJustHappen?MyAgeMustBeCatchingUpToMe..Well,OffYouGoThen,YouMustBeInAHurry,IWon'tKeepYou.GoodLuck!"
};

var karateTeacher = {
    Name: "Shinji",
    Hp: 20,
    HpMax: 20,
    Level: 7,
    ImagePath: "images/karate_teacher.png",
    Messages: karateTeacherMsgs,
    TimeLimitPerQuestion: 15
};

var karateMasterMsgs = {
    Greeting: "Aha, the new challenger! I see you've passed Shinji's test and survived his.. cognitive deficiencies..... You should know that I won't take it easy on you, now YOI(ready)! HAJIME(begin)!!",
    Score: ["Chudan Mawashi Geri!(roundhouse kick)", "Ushiro Geri!(back kick)", "Shotei Uchi!(palm strike)", "Jodan Shotei Uchi!(palm strike to head)"],
    Concede: ["Good", "Excellent!", "Keep going!", "Great!", "Brilliant!"],
    Victory: "That's enough. You did yourself proud, but it's not your day today. Come back again, I look forward to your next challenge.",
    Defeat: "YAME(stop). very good, you win. Go on to the next room, and good luck, your next opponent is even stronger than me.."
};

var karateMaster = {
    Name: "Kyo",
    Hp: 25,
    HpMax: 25,
    Level: 8,
    ImagePath: "images/karate_master.png",
    Messages: karateMasterMsgs,
    TimeLimitPerQuestion: 15
};

var wushuMasterMsgs = {
    Greeting: "...a new challenger...let's go...",
    Score: ["..."],
    Concede: ["..."],
    Victory: "...go home...",
    Defeat: "...you win..."
};

var wushuMaster = {
    Name: "Zhang Sifu",
    Hp: 35,
    HpMax: 35,
    Level: 8,
    ImagePath: "images/wushu_master.png",
    Messages: wushuMasterMsgs,
    TimeLimitPerQuestion: 10
};

var taichiMasterMsgs = {
    Greeting: "Ho ho ho, is it supper time already? What's that? You're not the dinner lady? What are you doing here then? Oh, you're the new challenger! Alright then, I better deal with you then, it's almost time for my meal..",
    Score: ["Ho ho ho", "I'm getting hungry", "Unlucky young man", "*Cough* *Cough*", "mm..I wonder what's for dinner"],
    Concede: ["Ho ho ho that pinches", "oh these old bones...", "*Cough* *Cough*", "oh my, my age's catching up with me", "not bad, boy"],
    Victory: "Ho ho ho, that's so very unlucky, boy. Don't worry, I'm sure you'll do better next time, go on home now, granpa's gotta go and have dinner. Good bye.",
    Defeat: "Ho ho ho, you're very good at this, aren't you? Congratulations, you have defeated me, a very well done to you. *Clap *Clap"
};

var taichiMaster = {
    Name: "Granpa",
    Hp: 50,
    HpMax: 50,
    Level: 9,
    ImagePath: "images/taichi_master.png",
    Messages: taichiMasterMsgs,
    TimeLimitPerQuestion: 10
};

var opponents = {
	1: guard,
    2: sumo,
    3: samurai,
    4: karateTeacher,
    5: karateMaster,
    6: wushuMaster,
    7: taichiMaster
};