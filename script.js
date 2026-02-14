var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function init() {
  // create a new stage and point it at our canvas:
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var w = canvas.width;
  var h = canvas.height;

  container = new createjs.Container();
  stage.addChild(container);

  captureContainers = [];
  captureIndex = 0;

  // create a large number of slightly complex vector shapes, and give them random positions and velocities:
		for (var i = 0; i < 100; i++) {
			var heart = new createjs.Shape();
			heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
			heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
			heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
			heart.y = -100;

			container.addChild(heart);
		}

  var text = new createjs.Text("Hi mylovemochaaa☕️😛 
HAPPY VALENTINES MY HONEY BUNCH!!🥺💐 

I know there’s still about lot things we need to learn about each other, and we are still in that process of adopting each others. When I first saw you, my eyes glaze in happiness — I didn’t love at first sight…(kinda like), I just find you really cute and pretty. I got interested and curious about who you are, who you are with… and I remember everytime I try to look at you and we made eye contact and a bit of smile, I remember your dad looking at me and got me scared bcuz I know he’s just a servant that time😅 maybe he got me feeling like I’m interested at you🥹 he’s just sitting 4 feet away from me.. everytime I look at you, he’s already looking at me and he really scares me that time. After that night, I tried looking for your social media and I failed😞 it took me few weeks to finally see your fb account on my friends suggestions thingy and that made me sort of happy😅 When I heard about going to mackay, I got too excited, bcuz I’ll finally gonna see you🥹 then that happen (Couple’s day interaction and some glances eye contact) then there’s Family day, of course, we don’t really talk or interact that much unless going to mcdo😆🥹 when you’re putting your code and redeem you iced matcha with my orders😅😍 AHH I LOVE YOU SO MUCH😙💖 Then, remember when I called youth meetings?? Like all of us youth regional? Then I announced or they (bcuz I ask them to announce) that we should have Regional Youths GC🥹 That’s my idea to get a bit close to you or a bit close contact to you😅 PS — I still thought you’re in relationship, so I’m kinda reading you or getting a hint from you

I know we’ve been only talking for 3 months, a week and 5 days; I feel so much connection from you. Within those months or weeks or days, I feel loving you when I started knowing about more and more; you’re perfect, love❤️ when I say “perfect” I mean you’re perfect with your flaws, attitude, personality, yourself. You’re perfect, because you just are. You deserve to be love, to receive not to give and give, till you give so much and you forgot what it feels like to receive love or gifts from anyone. You deserve everything, honey❤️ you really do. Don’t question yourself “What did I do to deserve to so much love…”, “I don’t think I deserve this..”, you do deserve it, love. You gave so much to anyone, to someone, to me🥺 and I’m here to give you back the favour. It’s not your job to give so much, hun — now I’m here, I will try my all best to give what you really deserve. In GodWilling, I will make you feel you are worth more than anything, love🥺

I love you so much💖 Always take care of yourself, mylove🥺 GodWilling, I will marry you and will take care of you forever💖 Thank you for everything, honey🥺💖 

I MISS YOU SO MUCH😭🩷

Your matcha🍵❤️", "bold 24px Arial", "rgb(255, 193, 224)");
  text.textAlign = "center";
  text.x = w / 2;
  text.y = h / 2 - text.getMeasuredLineHeight();
  stage.addChild(text);

  for (i = 0; i < 100; i++) {
    var captureContainer = new createjs.Container();
    captureContainer.cache(0, 0, w, h);
    captureContainers.push(captureContainer);
  }

  // start the tick and point it at the window so we can do some work before updating the stage:
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", tick);
}

function tick(event) {
  var w = canvas.width;
  var h = canvas.height;
  var l = container.numChildren;

  captureIndex = (captureIndex + 1) % captureContainers.length;
  stage.removeChildAt(0);
  var captureContainer = captureContainers[captureIndex];
  stage.addChildAt(captureContainer, 0);
  captureContainer.addChild(container);

  // iterate through all the children and move them according to their velocity:
		for (var i = 0; i < l; i++) {
			var heart = container.getChildAt(i);
			if (heart.y < -50) {
				heart._x = Math.random() * w;
				heart.y = h * (1 + Math.random()) + 50;
				heart.perX = (1 + Math.random() * 2) * h;
				heart.offX = Math.random() * h;
				heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
				heart.velY = -Math.random() * 2 - 1;
				heart.scale = Math.random() * 2 + 1;
				heart._rotation = Math.random() * 40 - 20;
				heart.alpha = Math.random() * 0.75 + 0.05;
				heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
			}
			var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
			heart.y += heart.velY * heart.scaleX / 2;
			heart.x = heart._x + Math.cos(int) * heart.ampX;
			heart.rotation = heart._rotation + Math.sin(int) * 30;
		}

  captureContainer.updateCache("source-over");

  // draw the updates to stage:
  stage.update(event);
}

init();

