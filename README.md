# **PROJECT 01 - ASTEROID BELT.** &#9732;

## Description:

This was my first of four projects for the Software Engineering Immersive course run by General Assembly. The project was a solo effort and created over the course of a week (week 3 of the 12 week course). We spent the two weeks prior to this learning HTML, CSS, JavaScript and jQuery before we were then tasked with creating a game.

## Deployment link:

You can find my game at:

[https://emsley1d.github.io/Asteroid-Belt/](https://emsley1d.github.io/Asteroid-Belt/)
#

## Technologies Used:

**I used the below languages:**

- HTML
- CSS
- JavaScript
- jQuery

**And a number of online resources:**

- Stack Overflow
- javascript.info
- W3 Schools
- Zapsplat
- Piskel
- Figma
#

## Brief:

Our brief for the game stipulated the below:

- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use JavaScript and/or jQuery for DOM manipulation
- Be deployed online, where the rest of the world can access it
- Use semantic markup for HTML and CSS in order to adhere to best practices
- Have well-formatted, and well-commented code

In addition to the above I set myself some personal targets:

- To come up with a unique idea as opposed to a clone of an already existing game
- To have smooth animation for each asset as opposed to stop/start
- To incorporate my own Pixel art

Upon completion of the project we were then tasked with delivering a presentation covering the following:

- What is the website about?
- Is there any information you think might help us understand what you built?
- What features did you include?
- What was the most difficult part of the project?
- What was your favourite part to work on?
- What would you like to add next?
- Demo of the website
#

## Planning:

My original idea was for a game that borrowed elements from both Space Invaders and Tetris; hence the working title of Space-Tetris. I wanted to create something slightly more original than just my own iteration of either game.

As below; I wireframed my original concept in Figma to ensure I was happy with my idea. To explain; both asteroids and building blocks would move across the screen from left to right; the player would need to move themselves left to right along the bottom of the screen and shoot to destroy the asteroids. The building blocks would line up down the right-hand side of the screen to create a 'space-station' which the player would need to defend from the asteroids. Once a column of station had been lined up the player would score and that line of station would disappear; as per a completed line in tetris.

![Initial Concept](/Images/Initial%20Concept.png)

I then wireframed a title screen; this included buttons for New Game, Scoreboard, Options etc - all planned functionality.

![Title Screen](/Images/Title%20Screen.png)
#

## Build/Code Process:

### Step 1:

I started by listing the different assets I would need; Spaceship, Asteroid, Block etc. Once I had a complete list I started to brainstorm the functionality each required:

| PLAYER (SPACESHIP): 
| :---
| Needs to move left to right upon key press. |
| Needs to fire a missile vertically upon key press. |
| Needs to explode upon contact with a asteroid. |


| MISSLES:
| :--- 
| Need to move vertically upon key press from the position of the player when fired. |
| Needs to both explode and disappear upon contact with a asteroid or block. |
| Needs to make the score increase upon collision with a asteroid. |
| Needs to make the score decrease upon collision with a block. |


| ASTEROIDS: 
| :---
| Need to move left to right at random intervals. |
| Need to appear automatically at different heights on the left and move to the corresponding height on the right. |
| Need to disappear if hit by a asteroid. |
| Need to disappear if they hit a block. |

| BLOCKS (SPACESTATION):
| :--- 
| Need to move left to right at random intervals. |
| Need to appear automatically at different heights on the left and move to the corresponding height on the right. |
| Need to disappear if hit by a asteroid. |
| Need to disappear when a complete column has lined up on the right hand side of the game window. |
| Need to increase the score upon completion of a column. |
| Score needs to decrease if a player shoots a block with a missile. |
| Block needs to explode and disappear if hit by a asteroid. |



### Step 2:

Once I was happy with my list of functionality I started to map out the HTML pages for each corresponding button on the title screen; New Game, Scoreboard and Options. I thought doing so would help me better understand what functionality or assets needed to go where and ultimately how each page would interact with each other:

**User clicks 'New Game':**

| **TITLE SCREEN** | | | |
| --- | --- | --- | --- |
| **User clicks New Game -\>** | Game Screen Loads |
 | |
| | 3 Second countdown timer starts |
 | |
| | All sound events triggered on |
 | |
| | Spaceship Appears |
 | |
| | Asteroids/blocks start appearing from right |
 | |
| | End game countdown starts |
 | |
| | Score count starts |
 | |
| | Life count starts |
 | |
| | Timer finishes/all lives lost -\> | End game message appears | |
| |
 | Scoreboard and enter name appears | |
| |
 | Name populated | |
| | | Success message appears -\> | **USER RETURNED TO TITLE SCREEN** |

**User clicks 'Scoreboard':**

| **TITLE SCREEN** | | |
| --- | --- | --- |
| **User Clicks Scoreboard -\>** | Leaderboard screen appears | |
| | Back button appears | |
| | User clicks back button -\> | **USER RETURNED TO TITLE SCREEN** |

**User clicks 'Options':**

| **TITLE SCREEN** | | |
| --- | --- | --- |
| **User clicks Options -\>** | Options screen appears | |
| | Back button appears | |
| | On/off toggle button for background music appears | |
| | On/off toggle buttons for game sounds appear | |
| | Success message appears if anything changed | |
| | User clicks back button -\> | **USER RETURNED TO TITLE SCREEN** |

### Step 3:

Once I was happy with my list of functionality and basic page maps I created an HTML page and CSS/javaScript files to give me a space in which to work before then creating a repository and saving these to GitHub.

### Step 4:

I knew I always wanted to create my own assets (and set this as a personal goal) as opposed to having coloured shapes for each moving element. I think doing so personalises the game and lifts the overall aesthetic. I created the below images in Piskel and imported them to my project folder:

![Pixel Art](/Images/Screenshot%202022-09-08%20at%2009.11.43.png)

### Step 5:

Having completed the above steps I started to write my code. I updated my index.html and styles.css files to create a near final title page:

![Title](/Images/Title.png)

Having also just learnt jQuery I was keen to include some in my project so I was quick to add mouseover effects for the above buttons:

![jquery](/Images/Screenshot%202022-09-24%20at%2014.03.11.png)

I then created a second HTML file on which I started to construct my game and imported my assets in CSS.

I managed to animate all the moving assets and had a few wins; my original method of moving assets using stop animate was fairly jerky and stop start:

![stop](/Images/Screenshot%202022-09-24%20at%2014.03.31.png)

As per my personal goals I wanted to try and achieve smooth animation so I tried the below which resolved the issue:

![smooth](/Images/Screenshot%202022-09-24%20at%2014.03.49.png)

I also found both the asteroid and blocks would noticeably accelerate from the left of the page and then decelerate to their resting position on the right. I solved the problem by using the value of "linear" as opposed to my the previous value of "constant":

![asteroid](/Images/Screenshot%202022-09-24%20at%2014.04.06.png)

Although I solved a number of the issues I came across I had a number which I simply struggled to overcome. Despite having managed to animate all the in-game assets I couldn't control them in the manner I wanted:

- When moving the spaceship left and right; if I held down one key long enough the spaceship would move off the screen left or right.
- Both the asteroid and block would move from the left of the screen to the right but again I struggled to control how far they moved and they did so beyond the game window in which I wanted to limit play.
- I could fire the missile with the space bar; it would fire from the current position of the spaceship and would travel vertically up the page, however; if I then continued to move the spaceship left or right the missile would also move left or right. This being a consequence of positioning the missile div within the spaceship div.

I came to realise the majority of issues I faced with the animation were as a result of my original approach. I created a single div in which I included individual divs for each asset:

![div](/Images/Screenshot%202022-09-24%20at%2014.09.22.png

Other than defining the position, height and width of the div in CSS I didn't provide the div with any further properties. As previously stated; I purposefully threw myself in at the deep end and was keen to test my own skills; up until this point I had purposefully not taken to Google or any other online resources but I underestimated the task at hand.

### Step 6:

Having realised I would struggle to have a completed game by the deadline I took to Google to research the best way in which to create a game such as Space Invaders. With Tetris working in a similar vein (objects essentially moving on a grid) I hoped I would still have sufficient time to create a version of my original idea.

I decided to replace my single "gameWindow" div with a "grid" div. I split the grid div into 330 individual divs; each 40px by 40px. Using CSS Flexbox I was able to display this as a 15 x 22 square grid. Taking this approach allowed me to resolve the majority of issues I experienced with my original approach and meant I had a defined game board in which I could contain the asset movement. I could effectively plot the position of each asset in the grid; for example I could plot the starting position of the asteroids by listing a div number:

//Asteroid starting locations

![asteroid](/Images/Screenshot%202022-09-24%20at%2014.11.00.png)

And plot the starting position of the player; again just by listing a numbered div:

![player](/Images/Screenshot%202022-09-24%20at%2014.14.39.png)

However; I knew taking this approach would mean I couldn't fulfil the personal goal I set myself of having smooth animation for each asset. Although disappointing; it meant I could progress with my project.

I could animate each asteroid by drawing and then removing the asteroids from individual squares by adding and removing classes:

![draw](/Images/Screenshot%202022-09-24%20at%2014.17.57.png)


Using this same method (of adding and removing classes) I was particularly happy with how I could 'animate' the interaction of assets colliding. The below covers the event of a missile destroying a asteroid (by occupying the same numbered div):

![collision](/Images/Screenshot%202022-09-24%20at%2014.19.06.png)

After adding the class of "explosion" I could then set a timer for how long the class appeared for before removing it. Doing so rendered the explosion as a brief flash animation. I played around with the setTimeout method and added a second explosion class (with another explosion image) to see if I could better the explosion animation before ultimately deciding to just use the one class:

![timeout](/Images/Screenshot%202022-09-24%20at%2014.19.18.png)

Unfortunately; having effectively restarted my game halfway through the week I didn't have sufficient time to add anything beyond the basic game or fix.

## Challenges:

- To be realistic about my own level of knowledge and know my limits. I really wanted to push myself however seeking no outside help for the first couple of days was in hindsight not the best method of doing so. I should have discussed my ideas with my lecturer on the first day and detailed how I planned to create the game and sought feedback at that point. I expect the quality of my finished project would have been far higher and closer to my original idea.
- I didn't appreciate how difficult it would be to achieve the smooth flowing animation I had originally planned; or the challenges posed by my goal to do so. I should have researched the best method of creating such a game before starting to code; again doing so would have most likely resulted in my finished project being of higher quality.
#

## Wins:


- To have the confidence to effectively restart my project half way through and still finish with a functioning game.
- To throw myself in at the deep end with my original project idea and push myself outside of my comfort zone. I had a lot of unanswered questions as to how I would create some of the functionality but was happy to investigate how to do so under my own initiative.
- I made the game genuinely challenging by fine tuning the number of starting asteroids and the setInterval for both the missiles and asteroids. This changed the rate at which the classes were drawn and removed from the squares effectively changing the speed at which both moved:

![interval](/Images/Screenshot%202022-09-24%20at%2014.23.05.png)

![interval2](/Images/Screenshot%202022-09-24%20at%2014.23.22.png)

- My knowledge of HTML, CSS and JavaScript and how each interacts grew exponentially during the project.
- The sheer amount of enjoyment I got from working on the project; each day was very long but I enjoyed every minute of it.
#

## Key Learnings/Takeaways:


I learnt a number of lessons throughout the project which I will implement in future projects:

- I wanted to prove myself and test what I had learnt so for the first couple of days I relied on my own knowledge and notes before then seeking help or advice from other resources; be it the lecturer or online platforms and forums. In future I will be quick to ask for help and to search out additional tools that may be of help.
- I underestimated the amount of time it would take to complete the project and spent too long trying to work around issues using my own knowledge as opposed to taking to the internet to explore other solutions.
- To focus on the core functionality first; I originally attempted to write both my core functionality (asset animation etc) and planned features (functioning leaderboard etc) at the same time to tackle my project from both ends. In hindsight however this was a mistake and in future I will tackle the core of the project first before focusing on any additional functionality.
#

## Bugs:


There are a couple of bugs; nothing game-breaking, rather things that take away from the overall experience and polish of the game:

- You can continue to move the spaceship left and right after the 'Game Over' message as well as continue to fire. If a fired missile then hits a asteroid the 'Game Over' message disappears and the score reappears.
- The explosion animation (when a asteroid is hit by a missile or a asteroid hits the player) doesn't appear on the deployed game but does when run from a server in VS Code.
- If a fired missile doesn't hit a asteroid the missile carries on moving and does so beyond the grid div and browser window.
#

## Future Improvements:

The below were some of my original ideas which I simply ran out of time to implement or were slightly out of reach considering my level of knowledge at the time:

- To first fix the bugs previously detailed.
- To implement a title screen (as per my wireframe covered in the 'Planning' section) with links to a scoreboard and options.
- A scoreboard (with local storage) that requests a player enters their details upon the successful completion of each game.
- Sound effects with mute buttons or automatic muting after 2 or 3 rounds.
- Credits that roll star wars style at the start of the game for the sound effects, music etc.
- Asteroids that are set randomly (within a limited boundary) at the start of each new round as opposed to appear in the same \<div\> fields I set them too.
- To make the page responsive; on smaller screens pressing the Up arrow to shoot causes the screen to scroll up to the top of the page.
- To incorporate a moving space-station the user has to defend and that can be destroyed upon contact with a asteroid; this would effectively become the player's 'life' and for each block destroyed they would lose a life.

